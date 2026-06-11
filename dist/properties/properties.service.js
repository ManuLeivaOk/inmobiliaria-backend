"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pagination_dto_1 = require("../common/dto/pagination.dto");
const amenity_entity_1 = require("../amenities/entities/amenity.entity");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const user_entity_1 = require("../users/entities/user.entity");
const property_enums_1 = require("./enums/property.enums");
const property_amenity_entity_1 = require("./entities/property-amenity.entity");
const property_feature_entity_1 = require("./entities/property-feature.entity");
const property_image_entity_1 = require("./entities/property-image.entity");
const property_entity_1 = require("./entities/property.entity");
const uploads_service_1 = require("../modules/uploads/services/uploads.service");
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
};
let PropertiesService = class PropertiesService {
    propertyRepo;
    amenityRepo;
    userRepo;
    dataSource;
    uploadsService;
    constructor(propertyRepo, amenityRepo, userRepo, dataSource, uploadsService) {
        this.propertyRepo = propertyRepo;
        this.amenityRepo = amenityRepo;
        this.userRepo = userRepo;
        this.dataSource = dataSource;
        this.uploadsService = uploadsService;
    }
    async create(dto, user) {
        await this.validateAmenities(dto.amenityIds);
        await this.validateAssignedSeller(dto.assignedSellerId, user);
        const assignedSellerId = this.resolveAssignedSellerId(dto, user);
        const status = dto.status ?? property_enums_1.PropertyStatus.BORRADOR;
        return this.dataSource.transaction(async (manager) => {
            const property = manager.create(property_entity_1.Property, {
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
            const full = await manager.findOneOrFail(property_entity_1.Property, {
                where: { id: saved.id },
                relations: PROPERTY_RELATIONS,
            });
            return this.toResponse(full);
        });
    }
    async findAll(query, user) {
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
        return (0, pagination_dto_1.buildPaginatedResult)(items.map((item) => this.toResponse(item)), total, page, limit);
    }
    async findOne(id, user) {
        const property = await this.getPropertyOrFail(id);
        this.assertCanRead(property, user);
        return this.toResponse(property);
    }
    async update(id, dto, user) {
        const existing = await this.getPropertyOrFail(id);
        this.assertCanModify(existing, user);
        if (dto.amenityIds) {
            await this.validateAmenities(dto.amenityIds);
        }
        if (dto.assignedSellerId !== undefined) {
            await this.validateAssignedSeller(dto.assignedSellerId, user);
        }
        return this.dataSource.transaction(async (manager) => {
            const property = await manager.findOneOrFail(property_entity_1.Property, {
                where: { id },
                relations: PROPERTY_RELATIONS,
            });
            if (dto.title !== undefined)
                property.title = dto.title.trim();
            if (dto.description !== undefined) {
                property.description = dto.description?.trim() ?? null;
            }
            if (dto.operationType !== undefined)
                property.operationType = dto.operationType;
            if (dto.propertyType !== undefined)
                property.propertyType = dto.propertyType;
            if (dto.price !== undefined)
                property.price = dto.price.toFixed(2);
            if (dto.currency !== undefined)
                property.currency = dto.currency;
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
            if (dto.rooms !== undefined)
                property.rooms = dto.rooms ?? null;
            if (dto.bedrooms !== undefined)
                property.bedrooms = dto.bedrooms ?? null;
            if (dto.bathrooms !== undefined)
                property.bathrooms = dto.bathrooms ?? null;
            if (dto.garage !== undefined)
                property.garage = dto.garage;
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
                    user.role === user_role_enum_1.UserRole.ADMIN ? dto.assignedSellerId : user.id;
            }
            if (dto.status !== undefined) {
                this.assertStatusTransitionAllowed(existing.status, dto.status, user);
                property.status = dto.status;
                property.publishedAt = this.resolvePublishedAt(dto.status, property.publishedAt);
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
                const urlsToDelete = previousUrls.filter((url) => !nextUrls.includes(url));
                await manager.delete(property_image_entity_1.PropertyImage, { propertyId: id });
                if (dto.images.length) {
                    await this.syncImages(manager, id, dto.images);
                }
                await this.uploadsService.deletePropertyImages(urlsToDelete);
            }
            if (dto.amenityIds !== undefined) {
                await manager.delete(property_amenity_entity_1.PropertyAmenity, { propertyId: id });
                if (dto.amenityIds.length) {
                    await this.syncAmenities(manager, id, dto.amenityIds);
                }
            }
            if (dto.features !== undefined) {
                await manager.delete(property_feature_entity_1.PropertyFeature, { propertyId: id });
                if (dto.features.length) {
                    await this.syncFeatures(manager, id, dto.features);
                }
            }
            const full = await manager.findOneOrFail(property_entity_1.Property, {
                where: { id },
                relations: PROPERTY_RELATIONS,
            });
            return this.toResponse(full);
        });
    }
    async remove(id, user) {
        const property = await this.getPropertyOrFail(id);
        this.assertCanModify(property, user);
        const imageUrls = (property.images ?? []).map((img) => img.imageUrl);
        await this.propertyRepo.softDelete(id);
        await this.uploadsService.deletePropertyImages(imageUrls);
    }
    async getPropertyOrFail(id) {
        const property = await this.propertyRepo.findOne({
            where: { id, deletedAt: (0, typeorm_2.IsNull)() },
            relations: PROPERTY_RELATIONS,
        });
        if (!property) {
            throw new common_1.NotFoundException('Propiedad no encontrada');
        }
        return property;
    }
    applyRoleScope(qb, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN) {
            return;
        }
        qb.andWhere(`(property.status = :publishedStatus
        OR property.createdById = :userId
        OR property.assignedSellerId = :userId)`, {
            publishedStatus: property_enums_1.PropertyStatus.PUBLICADA,
            userId: user.id,
        });
    }
    applyFilters(qb, query) {
        if (query.search) {
            qb.andWhere(`(property.title ILIKE :search OR property.description ILIKE :search OR property.address ILIKE :search)`, { search: `%${query.search}%` });
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
    assertCanRead(property, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN)
            return;
        const isOwner = property.createdById === user.id || property.assignedSellerId === user.id;
        if (property.status === property_enums_1.PropertyStatus.PUBLICADA || isOwner) {
            return;
        }
        throw new common_1.ForbiddenException('No tenés acceso a esta propiedad');
    }
    assertCanModify(property, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN)
            return;
        const isOwner = property.createdById === user.id || property.assignedSellerId === user.id;
        if (!isOwner) {
            throw new common_1.ForbiddenException('No podés modificar esta propiedad');
        }
    }
    assertStatusTransitionAllowed(current, next, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN)
            return;
        const sellerAllowed = [
            property_enums_1.PropertyStatus.BORRADOR,
            property_enums_1.PropertyStatus.PUBLICADA,
            property_enums_1.PropertyStatus.INACTIVA,
        ];
        if (!sellerAllowed.includes(next)) {
            throw new common_1.ForbiddenException(`Los vendedores no pueden cambiar el estado a ${next}`);
        }
        if (current === property_enums_1.PropertyStatus.VENDIDA ||
            current === property_enums_1.PropertyStatus.ALQUILADA) {
            throw new common_1.BadRequestException('No se puede modificar el estado de una propiedad cerrada');
        }
    }
    resolveAssignedSellerId(dto, user) {
        if (user.role === user_role_enum_1.UserRole.ADMIN) {
            return dto.assignedSellerId ?? user.id;
        }
        return user.id;
    }
    async validateAssignedSeller(assignedSellerId, user) {
        if (!assignedSellerId)
            return;
        if (user.role !== user_role_enum_1.UserRole.ADMIN && assignedSellerId !== user.id) {
            throw new common_1.ForbiddenException('Solo un administrador puede asignar otro vendedor');
        }
        const seller = await this.userRepo.findOne({
            where: { id: assignedSellerId, deletedAt: (0, typeorm_2.IsNull)(), isActive: true },
        });
        if (!seller) {
            throw new common_1.BadRequestException('Vendedor asignado no válido');
        }
    }
    async validateAmenities(amenityIds) {
        if (!amenityIds?.length)
            return;
        const found = await this.amenityRepo.findBy({
            id: (0, typeorm_2.In)(amenityIds.map(String)),
        });
        if (found.length !== amenityIds.length) {
            throw new common_1.BadRequestException('Uno o más amenities no existen');
        }
    }
    resolvePublishedAt(status, current) {
        if (status === property_enums_1.PropertyStatus.PUBLICADA) {
            return current ?? new Date();
        }
        if (status === property_enums_1.PropertyStatus.BORRADOR ||
            status === property_enums_1.PropertyStatus.INACTIVA) {
            return null;
        }
        return current;
    }
    async syncImages(manager, propertyId, images) {
        const normalized = this.normalizeImages(images);
        const entities = normalized.map((img) => manager.create(property_image_entity_1.PropertyImage, {
            propertyId,
            imageUrl: img.imageUrl,
            position: img.position ?? 0,
            isCover: img.isCover ?? false,
        }));
        await manager.save(entities);
    }
    normalizeImages(images) {
        const sorted = [...images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
        const coverIndex = sorted.findIndex((img) => img.isCover);
        const coverPos = coverIndex >= 0 ? coverIndex : 0;
        return sorted.map((img, index) => ({
            ...img,
            position: img.position ?? index,
            isCover: index === coverPos,
        }));
    }
    async syncAmenities(manager, propertyId, amenityIds) {
        const uniqueIds = [...new Set(amenityIds)];
        const entities = uniqueIds.map((amenityId) => manager.create(property_amenity_entity_1.PropertyAmenity, {
            propertyId,
            amenityId: amenityId.toString(),
        }));
        await manager.save(entities);
    }
    async syncFeatures(manager, propertyId, features) {
        const entities = features.map((feature) => manager.create(property_feature_entity_1.PropertyFeature, {
            propertyId,
            featureKey: feature.featureKey.trim(),
            featureValue: feature.featureValue.trim(),
        }));
        await manager.save(entities);
    }
    toNumeric(value) {
        if (value === null || value === undefined)
            return null;
        return Number(value);
    }
    toUserSummary(user) {
        if (!user)
            return null;
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }
    toGeoSummary(entity) {
        if (!entity)
            return null;
        return { id: entity.id, name: entity.name };
    }
    toResponse(property) {
        const images = [...(property.images ?? [])].sort((a, b) => a.position - b.position);
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
            createdBy: this.toUserSummary(property.createdBy),
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
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, typeorm_1.InjectRepository)(amenity_entity_1.Amenity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource,
        uploads_service_1.UploadsService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map