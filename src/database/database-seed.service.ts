import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from '../amenities/entities/amenity.entity';
import { City } from '../geo/entities/city.entity';
import { Country } from '../geo/entities/country.entity';
import { Neighborhood } from '../geo/entities/neighborhood.entity';
import { Province } from '../geo/entities/province.entity';
import { Property } from '../properties/entities/property.entity';
import { PropertiesService } from '../properties/properties.service';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { UsersService } from '../users/users.service';
import { SEED_AMENITIES, SEED_PROPERTIES } from './seed-data';

export const SEED_GEO = {
  country: 'Argentina',
  province: 'Córdoba',
  city: 'Río Cuarto',
  neighborhoods: ['Barrio Centro', 'Barrio Alberdi', 'Barrio Parque'],
} as const;

const SEED_USERS = {
  admin: {
    firstName: 'Admin',
    lastName: 'Sistema',
    email: 'admin@inmobiliaria.com',
    phone: '+5493584000001',
    password: 'Admin123456789!',
    role: UserRole.ADMIN,
  },
  vendedor: {
    firstName: 'María',
    lastName: 'Vendedora',
    email: 'vendedor@inmobiliaria.com',
    phone: '+5493584123456',
    password: 'Vendedor123456!',
    role: UserRole.VENDEDOR,
  },
} as const;

@Injectable()
export class DatabaseSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseSeedService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
    private readonly propertiesService: PropertiesService,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    @InjectRepository(Neighborhood)
    private readonly neighborhoodRepo: Repository<Neighborhood>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
    @InjectRepository(Amenity)
    private readonly amenityRepo: Repository<Amenity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const seedEnabled = this.config.get<boolean>('database.seedOnStartup');
    if (!seedEnabled) {
      return;
    }

    const userCount = await this.usersRepo.count();
    const geoReady = await this.hasSeedGeo();
    const propertyCount = await this.propertyRepo.count();

    const fullySeeded =
      userCount > 0 && geoReady && propertyCount >= SEED_PROPERTIES.length;

    if (fullySeeded) {
      return;
    }

    this.logger.log('Ejecutando seed inicial…');

    if (!geoReady) {
      await this.seedGeo();
    }

    if (userCount === 0) {
      await this.seedUsers();
    }

    await this.seedAmenities();

    if (propertyCount < SEED_PROPERTIES.length) {
      await this.seedProperties();
    }

    this.logger.log('Seed inicial completado.');
    this.logger.log(
      `Credenciales demo → admin: ${SEED_USERS.admin.email} | vendedor: ${SEED_USERS.vendedor.email}`,
    );
  }

  private async hasSeedGeo(): Promise<boolean> {
    const country = await this.countryRepo.findOne({
      where: { name: SEED_GEO.country },
    });
    if (!country) return false;

    const province = await this.provinceRepo.findOne({
      where: { name: SEED_GEO.province, countryId: country.id },
    });
    if (!province) return false;

    const city = await this.cityRepo.findOne({
      where: { name: SEED_GEO.city, provinceId: province.id },
    });
    if (!city) return false;

    const neighborhoodCount = await this.neighborhoodRepo.count({
      where: { cityId: city.id },
    });

    return neighborhoodCount >= SEED_GEO.neighborhoods.length;
  }

  private async seedGeo(): Promise<void> {
    let country = await this.countryRepo.findOne({
      where: { name: SEED_GEO.country },
    });

    if (!country) {
      country = await this.countryRepo.save(
        this.countryRepo.create({ name: SEED_GEO.country }),
      );
    }

    let province = await this.provinceRepo.findOne({
      where: { name: SEED_GEO.province, countryId: country.id },
    });

    if (!province) {
      province = await this.provinceRepo.save(
        this.provinceRepo.create({
          name: SEED_GEO.province,
          countryId: country.id,
        }),
      );
    }

    let city = await this.cityRepo.findOne({
      where: { name: SEED_GEO.city, provinceId: province.id },
    });

    if (!city) {
      city = await this.cityRepo.save(
        this.cityRepo.create({
          name: SEED_GEO.city,
          provinceId: province.id,
        }),
      );
    }

    for (const name of SEED_GEO.neighborhoods) {
      const exists = await this.neighborhoodRepo.findOne({
        where: { name, cityId: city.id },
      });
      if (!exists) {
        await this.neighborhoodRepo.save(
          this.neighborhoodRepo.create({ name, cityId: city.id }),
        );
      }
    }

    this.logger.log(
      `Geografía: ${SEED_GEO.country} → ${SEED_GEO.province} → ${SEED_GEO.city} (+ ${SEED_GEO.neighborhoods.length} barrios)`,
    );
  }

  private async seedUsers(): Promise<void> {
    for (const user of Object.values(SEED_USERS)) {
      const existing = await this.usersRepo.findOne({
        where: { email: user.email },
      });
      if (existing) {
        continue;
      }

      const created = await this.usersService.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
      });

      created.isVerified = true;
      await this.usersRepo.save(created);
    }
  }

  private async seedAmenities(): Promise<void> {
    for (const name of SEED_AMENITIES) {
      const exists = await this.amenityRepo.findOne({ where: { name } });
      if (!exists) {
        await this.amenityRepo.save(this.amenityRepo.create({ name }));
      }
    }
  }

  private async seedProperties(): Promise<void> {
    const admin = await this.usersRepo.findOne({
      where: { email: SEED_USERS.admin.email },
    });
    const vendedor = await this.usersRepo.findOne({
      where: { email: SEED_USERS.vendedor.email },
    });

    if (!admin) {
      this.logger.warn('Seed propiedades omitido: no existe usuario admin.');
      return;
    }

    const geoIds = await this.resolveGeoIds();
    if (!geoIds) {
      this.logger.warn('Seed propiedades omitido: geografía incompleta.');
      return;
    }

    const neighborhoods = await this.neighborhoodRepo.find({
      where: { cityId: geoIds.cityId },
    });
    const neighborhoodByName = new Map(
      neighborhoods.map((n) => [n.name, n.id]),
    );

    const amenities = await this.amenityRepo.find({ order: { id: 'ASC' } });
    const defaultAmenityIds = amenities
      .slice(0, 3)
      .map((a) => parseInt(a.id, 10));

    let created = 0;

    for (const def of SEED_PROPERTIES) {
      const exists = await this.propertyRepo.findOne({
        where: { title: def.title },
      });
      if (exists) {
        continue;
      }

      const neighborhoodId = neighborhoodByName.get(def.neighborhoodName);
      if (!neighborhoodId) {
        this.logger.warn(
          `Barrio no encontrado para seed: ${def.neighborhoodName}`,
        );
        continue;
      }

      await this.propertiesService.create(
        {
          title: def.title,
          description: def.description,
          operationType: def.operationType,
          propertyType: def.propertyType,
          price: def.price,
          currency: def.currency,
          status: def.status,
          address: def.address,

          suitableForMortgageCredit: def.suitableForMortgageCredit,

          availableServices: def.availableServices,

          weHaveTheKey: def.weHaveTheKey,

          contact: def.contact,

          publicationLink: def.publicationLink,

          countryId: parseInt(geoIds.countryId, 10),
          provinceId: parseInt(geoIds.provinceId, 10),
          cityId: parseInt(geoIds.cityId, 10),
          neighborhoodId: parseInt(neighborhoodId, 10),

          latitude: def.latitude,
          longitude: def.longitude,

          rooms: def.rooms,
          bedrooms: def.bedrooms,
          bathrooms: def.bathrooms,

          garage: def.garage,

          coveredArea: def.coveredArea,
          totalArea: def.totalArea,

          propertyAge: def.propertyAge,
          floorNumber: def.floorNumber,

          assignedSellerId:
            def.assignedToVendedor && vendedor ? vendedor.id : admin.id,

          images: [
            {
              imageUrl: def.imageUrl,
              isCover: true,
              position: 0,
            },
          ],

          amenityIds: defaultAmenityIds.length ? defaultAmenityIds : undefined,

          features: def.features,
        },
        {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      );

      created += 1;
    }

    this.logger.log(`Propiedades demo creadas: ${created}`);
  }

  private async resolveGeoIds(): Promise<{
    countryId: string;
    provinceId: string;
    cityId: string;
  } | null> {
    const country = await this.countryRepo.findOne({
      where: { name: SEED_GEO.country },
    });
    if (!country) return null;

    const province = await this.provinceRepo.findOne({
      where: { name: SEED_GEO.province, countryId: country.id },
    });
    if (!province) return null;

    const city = await this.cityRepo.findOne({
      where: { name: SEED_GEO.city, provinceId: province.id },
    });
    if (!city) return null;

    return {
      countryId: country.id,
      provinceId: province.id,
      cityId: city.id,
    };
  }
}
