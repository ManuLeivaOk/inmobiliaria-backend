import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, IsNull, Repository } from 'typeorm';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import {
  buildPaginatedResult,
  PaginatedResult,
} from '../common/dto/pagination.dto';
import { Amenity } from '../amenities/entities/amenity.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { User } from '../users/entities/user.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { PropertyResponseDto } from './dto/property-response.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyStatus } from './enums/property.enums';
import { PropertyAmenity } from './entities/property-amenity.entity';
import { PropertyFeature } from './entities/property-feature.entity';
import { PropertyImage } from './entities/property-image.entity';
import { Property } from './entities/property.entity';
import {
  PropertyFeatureInputDto,
  PropertyImageInputDto,
} from './dto/property-nested.dto';
import { UploadsService } from '../modules/uploads/services/uploads.service';

const PROPERTY_RELATIONS = {
  country: true,
  province: true,
  city: true,
  neighborhood: true,
  assignedSeller: true,
  createdBy: true,
  images: true,
  propertyAmenities: { amenity: true },
  features: true,
} as const;

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
    @InjectRepository(Amenity)
    private readonly amenityRepo: Repository<Amenity>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly uploadsService: UploadsService,
  ) {}

  async create(
    dto: CreatePropertyDto,
    user: AuthenticatedUser,
  ): Promise<PropertyResponseDto> {
    await this.validateAmenities(dto.amenityIds);
    await this.validateAssignedSeller(dto.assignedSellerId, user);

    const assignedSellerId = this.resolveAssignedSellerId(dto, user);
    const status = dto.status ?? PropertyStatus.BORRADOR;

    return this.dataSource.transaction(async (manager) => {
      const property = manager.create(Property, {
        title: dto.title.trim(),
        description: dto.description?.trim() ?? null,
        operationType: dto.operationType,
        propertyType: dto.propertyType,
        price: dto.price.toFixed(2),
        currency: dto.currency,
        address: dto.address?.trim() ?? null,
        countryId: dto.countryId?.toString() ?? null,
        provinceId: dto.provinceId?.toString() ?? null,
        cityId: dto.cityId?.toString() ?? null,
        neighborhoodId: dto.neighborhoodId?.toString() ?? null,
        latitude: dto.latitude?.toString() ?? null,
        longitude: dto.longitude?.toString() ?? null,
        rooms: dto.rooms ?? null,
        bedrooms: dto.bedrooms ?? null,
        bathrooms: dto.bathrooms ?? null,
        garage: dto.garage ?? false,
        coveredArea: dto.coveredArea?.toFixed(2) ?? null,
        totalArea: dto.totalArea?.toFixed(2) ?? null,
        propertyAge: dto.propertyAge ?? null,
        floorNumber: dto.floorNumber ?? null,
        status,
        publishedAt: this.resolvePublishedAt(status, null),
        assignedSellerId,
        createdById: user.id,
        suitableForMortgageCredit: dto.suitableForMortgageCredit ?? false,
        availableServices: dto.availableServices ?? [],
        weHaveTheKey: dto.weHaveTheKey ?? false,
        contact: dto.contact?.trim() ?? null,
        publicationLink: dto.publicationLink?.trim() ?? null,
      });

      const saved = await manager.save(property);

      if (dto.images?.length) {
        await this.syncImages(manager, saved.id, dto.images);
      }
      if (dto.amenityIds?.length) {
        await this.syncAmenities(manager, saved.id, dto.amenityIds);
      }
      if (dto.features?.length) {
        await this.syncFeatures(manager, saved.id, dto.features);
      }

      const full = await manager.findOneOrFail(Property, {
        where: { id: saved.id },
        relations: PROPERTY_RELATIONS,
      });

      return this.toResponse(full);
    });
  }

  async findAll(
    query: QueryPropertyDto,
    user: AuthenticatedUser,
  ): Promise<PaginatedResult<PropertyResponseDto>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const qb = this.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.country', 'country')
      .leftJoinAndSelect('property.province', 'province')
      .leftJoinAndSelect('property.city', 'city')
      .leftJoinAndSelect('property.neighborhood', 'neighborhood')
      .leftJoinAndSelect('property.assignedSeller', 'assignedSeller')
      .leftJoinAndSelect('property.createdBy', 'createdBy')
      .leftJoinAndSelect('property.images', 'images')
      .leftJoinAndSelect('property.propertyAmenities', 'propertyAmenities')
      .leftJoinAndSelect('propertyAmenities.amenity', 'amenity')
      .leftJoinAndSelect('property.features', 'features')
      .where('property.deletedAt IS NULL');

    this.applyRoleScope(qb, user);
    this.applyFilters(qb, query);

    qb.orderBy('property.createdAt', 'DESC').skip(skip).take(limit);

    const [items, total] = await qb.getManyAndCount();

    return buildPaginatedResult(
      items.map((item) => this.toResponse(item)),
      total,
      page,
      limit,
    );
  }

  async findOne(
    id: string,
    user: AuthenticatedUser,
  ): Promise<PropertyResponseDto> {
    const property = await this.getPropertyOrFail(id);
    this.assertCanRead(property, user);
    return this.toResponse(property);
  }

  async update(
    id: string,
    dto: UpdatePropertyDto,
    user: AuthenticatedUser,
  ): Promise<PropertyResponseDto> {
    const existing = await this.getPropertyOrFail(id);
    this.assertCanModify(existing, user);

    if (dto.amenityIds) {
      await this.validateAmenities(dto.amenityIds);
    }
    if (dto.assignedSellerId !== undefined) {
      await this.validateAssignedSeller(dto.assignedSellerId, user);
    }

    return this.dataSource.transaction(async (manager) => {
      const property = await manager.findOneOrFail(Property, {
        where: { id },
        relations: PROPERTY_RELATIONS,
      });

      if (dto.title !== undefined) property.title = dto.title.trim();
      if (dto.description !== undefined) {
        property.description = dto.description?.trim() ?? null;
      }
      if (dto.operationType !== undefined)
        property.operationType = dto.operationType;
      if (dto.propertyType !== undefined)
        property.propertyType = dto.propertyType;
      if (dto.price !== undefined) property.price = dto.price.toFixed(2);
      if (dto.currency !== undefined) property.currency = dto.currency;
      if (dto.address !== undefined)
        property.address = dto.address?.trim() ?? null;
      if (dto.countryId !== undefined) {
        property.countryId = dto.countryId?.toString() ?? null;
      }
      if (dto.provinceId !== undefined) {
        property.provinceId = dto.provinceId?.toString() ?? null;
      }
      if (dto.cityId !== undefined)
        property.cityId = dto.cityId?.toString() ?? null;
      if (dto.neighborhoodId !== undefined) {
        property.neighborhoodId = dto.neighborhoodId?.toString() ?? null;
      }
      if (dto.latitude !== undefined) {
        property.latitude = dto.latitude?.toString() ?? null;
      }
      if (dto.longitude !== undefined) {
        property.longitude = dto.longitude?.toString() ?? null;
      }
      if (dto.rooms !== undefined) property.rooms = dto.rooms ?? null;
      if (dto.bedrooms !== undefined) property.bedrooms = dto.bedrooms ?? null;
      if (dto.bathrooms !== undefined)
        property.bathrooms = dto.bathrooms ?? null;
      if (dto.garage !== undefined) property.garage = dto.garage;
      if (dto.coveredArea !== undefined) {
        property.coveredArea = dto.coveredArea?.toFixed(2) ?? null;
      }
      if (dto.totalArea !== undefined) {
        property.totalArea = dto.totalArea?.toFixed(2) ?? null;
      }
      if (dto.propertyAge !== undefined) {
        property.propertyAge = dto.propertyAge ?? null;
      }
      if (dto.floorNumber !== undefined) {
        property.floorNumber = dto.floorNumber ?? null;
      }

      if (dto.assignedSellerId !== undefined) {
        property.assignedSellerId =
          user.role === UserRole.ADMIN ? dto.assignedSellerId : user.id;
      }

      if (dto.status !== undefined) {
        this.assertStatusTransitionAllowed(existing.status, dto.status, user);
        property.status = dto.status;
        property.publishedAt = this.resolvePublishedAt(
          dto.status,
          property.publishedAt,
        );
      }

      if (dto.suitableForMortgageCredit !== undefined) {
        property.suitableForMortgageCredit = dto.suitableForMortgageCredit;
      }

      if (dto.availableServices !== undefined) {
        property.availableServices = dto.availableServices;
      }

      if (dto.weHaveTheKey !== undefined) {
        property.weHaveTheKey = dto.weHaveTheKey;
      }

      if (dto.contact !== undefined) {
        property.contact = dto.contact?.trim() ?? null;
      }

      if (dto.publicationLink !== undefined) {
        property.publicationLink = dto.publicationLink?.trim() ?? null;
      }

      await manager.save(property);

      if (dto.images !== undefined) {
        const previousUrls = (property.images ?? []).map((img) => img.imageUrl);
        const nextUrls = dto.images.map((img) => img.imageUrl);
        const urlsToDelete = previousUrls.filter(
          (url) => !nextUrls.includes(url),
        );

        await manager.delete(PropertyImage, { propertyId: id });
        if (dto.images.length) {
          await this.syncImages(manager, id, dto.images);
        }

        await this.uploadsService.deletePropertyImages(urlsToDelete);
      }
      if (dto.amenityIds !== undefined) {
        await manager.delete(PropertyAmenity, { propertyId: id });
        if (dto.amenityIds.length) {
          await this.syncAmenities(manager, id, dto.amenityIds);
        }
      }
      if (dto.features !== undefined) {
        await manager.delete(PropertyFeature, { propertyId: id });
        if (dto.features.length) {
          await this.syncFeatures(manager, id, dto.features);
        }
      }

      const full = await manager.findOneOrFail(Property, {
        where: { id },
        relations: PROPERTY_RELATIONS,
      });

      return this.toResponse(full);
    });
  }

  async remove(id: string, user: AuthenticatedUser): Promise<void> {
    const property = await this.getPropertyOrFail(id);
    this.assertCanModify(property, user);

    const imageUrls = (property.images ?? []).map((img) => img.imageUrl);

    await this.propertyRepo.softDelete(id);
    await this.uploadsService.deletePropertyImages(imageUrls);
  }

  private async getPropertyOrFail(id: string): Promise<Property> {
    const property = await this.propertyRepo.findOne({
      where: { id, deletedAt: IsNull() },
      relations: PROPERTY_RELATIONS,
    });

    if (!property) {
      throw new NotFoundException('Propiedad no encontrada');
    }

    return property;
  }

  private applyRoleScope(
    qb: ReturnType<Repository<Property>['createQueryBuilder']>,
    user: AuthenticatedUser,
  ): void {
    if (user.role === UserRole.ADMIN) {
      return;
    }

    qb.andWhere(
      `(property.status = :publishedStatus
        OR property.createdById = :userId
        OR property.assignedSellerId = :userId)`,
      {
        publishedStatus: PropertyStatus.PUBLICADA,
        userId: user.id,
      },
    );
  }

  private applyFilters(
    qb: ReturnType<Repository<Property>['createQueryBuilder']>,
    query: QueryPropertyDto,
  ): void {
    if (query.search) {
      qb.andWhere(
        `(property.title ILIKE :search OR property.description ILIKE :search OR property.address ILIKE :search)`,
        { search: `%${query.search}%` },
      );
    }
    if (query.status) {
      qb.andWhere('property.status = :status', { status: query.status });
    }
    if (query.operationType) {
      qb.andWhere('property.operationType = :operationType', {
        operationType: query.operationType,
      });
    }
    if (query.propertyType) {
      qb.andWhere('property.propertyType = :propertyType', {
        propertyType: query.propertyType,
      });
    }
    if (query.currency) {
      qb.andWhere('property.currency = :currency', {
        currency: query.currency,
      });
    }
    if (query.cityId) {
      qb.andWhere('property.cityId = :cityId', {
        cityId: query.cityId.toString(),
      });
    }
    if (query.neighborhoodId) {
      qb.andWhere('property.neighborhoodId = :neighborhoodId', {
        neighborhoodId: query.neighborhoodId.toString(),
      });
    }
    if (query.minPrice !== undefined) {
      qb.andWhere('property.price >= :minPrice', {
        minPrice: query.minPrice.toFixed(2),
      });
    }
    if (query.maxPrice !== undefined) {
      qb.andWhere('property.price <= :maxPrice', {
        maxPrice: query.maxPrice.toFixed(2),
      });
    }
    if (query.assignedSellerId) {
      qb.andWhere('property.assignedSellerId = :assignedSellerId', {
        assignedSellerId: query.assignedSellerId,
      });
    }
    if (query.createdById) {
      qb.andWhere('property.createdById = :createdById', {
        createdById: query.createdById,
      });
    }
  }

  private assertCanRead(property: Property, user: AuthenticatedUser): void {
    if (user.role === UserRole.ADMIN) return;

    const isOwner =
      property.createdById === user.id || property.assignedSellerId === user.id;

    if (property.status === PropertyStatus.PUBLICADA || isOwner) {
      return;
    }

    throw new ForbiddenException('No tenés acceso a esta propiedad');
  }

  private assertCanModify(property: Property, user: AuthenticatedUser): void {
    if (user.role === UserRole.ADMIN) return;

    const isOwner =
      property.createdById === user.id || property.assignedSellerId === user.id;

    if (!isOwner) {
      throw new ForbiddenException('No podés modificar esta propiedad');
    }
  }

  private assertStatusTransitionAllowed(
    current: PropertyStatus,
    next: PropertyStatus,
    user: AuthenticatedUser,
  ): void {
    if (user.role === UserRole.ADMIN) return;

    const sellerAllowed = [
      PropertyStatus.BORRADOR,
      PropertyStatus.PUBLICADA,
      PropertyStatus.INACTIVA,
    ];

    if (!sellerAllowed.includes(next)) {
      throw new ForbiddenException(
        `Los vendedores no pueden cambiar el estado a ${next}`,
      );
    }

    if (
      current === PropertyStatus.VENDIDA ||
      current === PropertyStatus.ALQUILADA
    ) {
      throw new BadRequestException(
        'No se puede modificar el estado de una propiedad cerrada',
      );
    }
  }

  private resolveAssignedSellerId(
    dto: CreatePropertyDto,
    user: AuthenticatedUser,
  ): string | null {
    if (user.role === UserRole.ADMIN) {
      return dto.assignedSellerId ?? user.id;
    }
    return user.id;
  }

  private async validateAssignedSeller(
    assignedSellerId: string | null | undefined,
    user: AuthenticatedUser,
  ): Promise<void> {
    if (!assignedSellerId) return;

    if (user.role !== UserRole.ADMIN && assignedSellerId !== user.id) {
      throw new ForbiddenException(
        'Solo un administrador puede asignar otro vendedor',
      );
    }

    const seller = await this.userRepo.findOne({
      where: { id: assignedSellerId, deletedAt: IsNull(), isActive: true },
    });

    if (!seller) {
      throw new BadRequestException('Vendedor asignado no válido');
    }
  }

  private async validateAmenities(amenityIds?: number[]): Promise<void> {
    if (!amenityIds?.length) return;

    const found = await this.amenityRepo.findBy({
      id: In(amenityIds.map(String)),
    });

    if (found.length !== amenityIds.length) {
      throw new BadRequestException('Uno o más amenities no existen');
    }
  }

  private resolvePublishedAt(
    status: PropertyStatus,
    current: Date | null,
  ): Date | null {
    if (status === PropertyStatus.PUBLICADA) {
      return current ?? new Date();
    }
    if (
      status === PropertyStatus.BORRADOR ||
      status === PropertyStatus.INACTIVA
    ) {
      return null;
    }
    return current;
  }

  private async syncImages(
    manager: typeof this.dataSource.manager,
    propertyId: string,
    images: PropertyImageInputDto[],
  ): Promise<void> {
    const normalized = this.normalizeImages(images);
    const entities = normalized.map((img) =>
      manager.create(PropertyImage, {
        propertyId,
        imageUrl: img.imageUrl,
        position: img.position ?? 0,
        isCover: img.isCover ?? false,
      }),
    );
    await manager.save(entities);
  }

  private normalizeImages(
    images: PropertyImageInputDto[],
  ): PropertyImageInputDto[] {
    const sorted = [...images].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0),
    );
    const coverIndex = sorted.findIndex((img) => img.isCover);
    const coverPos = coverIndex >= 0 ? coverIndex : 0;

    return sorted.map((img, index) => ({
      ...img,
      position: img.position ?? index,
      isCover: index === coverPos,
    }));
  }

  private async syncAmenities(
    manager: typeof this.dataSource.manager,
    propertyId: string,
    amenityIds: number[],
  ): Promise<void> {
    const uniqueIds = [...new Set(amenityIds)];
    const entities = uniqueIds.map((amenityId) =>
      manager.create(PropertyAmenity, {
        propertyId,
        amenityId: amenityId.toString(),
      }),
    );
    await manager.save(entities);
  }

  private async syncFeatures(
    manager: typeof this.dataSource.manager,
    propertyId: string,
    features: PropertyFeatureInputDto[],
  ): Promise<void> {
    const entities = features.map((feature) =>
      manager.create(PropertyFeature, {
        propertyId,
        featureKey: feature.featureKey.trim(),
        featureValue: feature.featureValue.trim(),
      }),
    );
    await manager.save(entities);
  }

  private toNumeric(value: string | null | undefined): number | null {
    if (value === null || value === undefined) return null;
    return Number(value);
  }

  private toUserSummary(user: User | null | undefined) {
    if (!user) return null;
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  private toGeoSummary(
    entity: { id: string; name: string } | null | undefined,
  ) {
    if (!entity) return null;
    return { id: entity.id, name: entity.name };
  }

  toResponse(property: Property): PropertyResponseDto {
    const images = [...(property.images ?? [])].sort(
      (a, b) => a.position - b.position,
    );

    return {
      id: property.id,
      title: property.title,
      description: property.description,
      operationType: property.operationType,
      propertyType: property.propertyType,
      price: Number(property.price),
      currency: property.currency,
      address: property.address,
      suitableForMortgageCredit: property.suitableForMortgageCredit,
      availableServices: property.availableServices ?? [],
      weHaveTheKey: property.weHaveTheKey,
      contact: property.contact,
      publicationLink: property.publicationLink,
      country: this.toGeoSummary(property.country),
      province: this.toGeoSummary(property.province),
      city: this.toGeoSummary(property.city),
      neighborhood: this.toGeoSummary(property.neighborhood),
      latitude: this.toNumeric(property.latitude),
      longitude: this.toNumeric(property.longitude),
      rooms: property.rooms,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      garage: property.garage,
      coveredArea: this.toNumeric(property.coveredArea),
      totalArea: this.toNumeric(property.totalArea),
      propertyAge: property.propertyAge,
      floorNumber: property.floorNumber,
      status: property.status,
      publishedAt: property.publishedAt,
      assignedSeller: this.toUserSummary(property.assignedSeller),
      createdBy: this.toUserSummary(property.createdBy)!,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      images: images.map((img) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        position: img.position,
        isCover: img.isCover,
        createdAt: img.createdAt,
      })),
      amenities: (property.propertyAmenities ?? []).map((pa) => ({
        id: pa.amenity.id,
        name: pa.amenity.name,
      })),
      features: (property.features ?? []).map((f) => ({
        id: f.id,
        featureKey: f.featureKey,
        featureValue: f.featureValue,
      })),
    };
  }
}
