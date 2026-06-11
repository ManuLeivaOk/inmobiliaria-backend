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
var DatabaseSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeedService = exports.SEED_GEO = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const amenity_entity_1 = require("../amenities/entities/amenity.entity");
const city_entity_1 = require("../geo/entities/city.entity");
const country_entity_1 = require("../geo/entities/country.entity");
const neighborhood_entity_1 = require("../geo/entities/neighborhood.entity");
const province_entity_1 = require("../geo/entities/province.entity");
const property_entity_1 = require("../properties/entities/property.entity");
const properties_service_1 = require("../properties/properties.service");
const user_entity_1 = require("../users/entities/user.entity");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const users_service_1 = require("../users/users.service");
const seed_data_1 = require("./seed-data");
exports.SEED_GEO = {
    country: 'Argentina',
    province: 'Córdoba',
    city: 'Río Cuarto',
    neighborhoods: ['Barrio Centro', 'Barrio Alberdi', 'Barrio Parque'],
};
const SEED_USERS = {
    admin: {
        firstName: 'Admin',
        lastName: 'Sistema',
        email: 'admin@inmobiliaria.com',
        phone: '+5493584000001',
        password: 'Admin123456789!',
        role: user_role_enum_1.UserRole.ADMIN,
    },
    vendedor: {
        firstName: 'María',
        lastName: 'Vendedora',
        email: 'vendedor@inmobiliaria.com',
        phone: '+5493584123456',
        password: 'Vendedor123456!',
        role: user_role_enum_1.UserRole.VENDEDOR,
    },
};
let DatabaseSeedService = DatabaseSeedService_1 = class DatabaseSeedService {
    config;
    usersService;
    propertiesService;
    countryRepo;
    provinceRepo;
    cityRepo;
    neighborhoodRepo;
    usersRepo;
    propertyRepo;
    amenityRepo;
    logger = new common_1.Logger(DatabaseSeedService_1.name);
    constructor(config, usersService, propertiesService, countryRepo, provinceRepo, cityRepo, neighborhoodRepo, usersRepo, propertyRepo, amenityRepo) {
        this.config = config;
        this.usersService = usersService;
        this.propertiesService = propertiesService;
        this.countryRepo = countryRepo;
        this.provinceRepo = provinceRepo;
        this.cityRepo = cityRepo;
        this.neighborhoodRepo = neighborhoodRepo;
        this.usersRepo = usersRepo;
        this.propertyRepo = propertyRepo;
        this.amenityRepo = amenityRepo;
    }
    async onApplicationBootstrap() {
        const seedEnabled = this.config.get('database.seedOnStartup');
        if (!seedEnabled) {
            return;
        }
        const userCount = await this.usersRepo.count();
        const geoReady = await this.hasSeedGeo();
        const propertyCount = await this.propertyRepo.count();
        const fullySeeded = userCount > 0 && geoReady && propertyCount >= seed_data_1.SEED_PROPERTIES.length;
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
        if (propertyCount < seed_data_1.SEED_PROPERTIES.length) {
            await this.seedProperties();
        }
        this.logger.log('Seed inicial completado.');
        this.logger.log(`Credenciales demo → admin: ${SEED_USERS.admin.email} | vendedor: ${SEED_USERS.vendedor.email}`);
    }
    async hasSeedGeo() {
        const country = await this.countryRepo.findOne({
            where: { name: exports.SEED_GEO.country },
        });
        if (!country)
            return false;
        const province = await this.provinceRepo.findOne({
            where: { name: exports.SEED_GEO.province, countryId: country.id },
        });
        if (!province)
            return false;
        const city = await this.cityRepo.findOne({
            where: { name: exports.SEED_GEO.city, provinceId: province.id },
        });
        if (!city)
            return false;
        const neighborhoodCount = await this.neighborhoodRepo.count({
            where: { cityId: city.id },
        });
        return neighborhoodCount >= exports.SEED_GEO.neighborhoods.length;
    }
    async seedGeo() {
        let country = await this.countryRepo.findOne({
            where: { name: exports.SEED_GEO.country },
        });
        if (!country) {
            country = await this.countryRepo.save(this.countryRepo.create({ name: exports.SEED_GEO.country }));
        }
        let province = await this.provinceRepo.findOne({
            where: { name: exports.SEED_GEO.province, countryId: country.id },
        });
        if (!province) {
            province = await this.provinceRepo.save(this.provinceRepo.create({
                name: exports.SEED_GEO.province,
                countryId: country.id,
            }));
        }
        let city = await this.cityRepo.findOne({
            where: { name: exports.SEED_GEO.city, provinceId: province.id },
        });
        if (!city) {
            city = await this.cityRepo.save(this.cityRepo.create({
                name: exports.SEED_GEO.city,
                provinceId: province.id,
            }));
        }
        for (const name of exports.SEED_GEO.neighborhoods) {
            const exists = await this.neighborhoodRepo.findOne({
                where: { name, cityId: city.id },
            });
            if (!exists) {
                await this.neighborhoodRepo.save(this.neighborhoodRepo.create({ name, cityId: city.id }));
            }
        }
        this.logger.log(`Geografía: ${exports.SEED_GEO.country} → ${exports.SEED_GEO.province} → ${exports.SEED_GEO.city} (+ ${exports.SEED_GEO.neighborhoods.length} barrios)`);
    }
    async seedUsers() {
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
    async seedAmenities() {
        for (const name of seed_data_1.SEED_AMENITIES) {
            const exists = await this.amenityRepo.findOne({ where: { name } });
            if (!exists) {
                await this.amenityRepo.save(this.amenityRepo.create({ name }));
            }
        }
    }
    async seedProperties() {
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
        const neighborhoodByName = new Map(neighborhoods.map((n) => [n.name, n.id]));
        const amenities = await this.amenityRepo.find({ order: { id: 'ASC' } });
        const defaultAmenityIds = amenities
            .slice(0, 3)
            .map((a) => parseInt(a.id, 10));
        let created = 0;
        for (const def of seed_data_1.SEED_PROPERTIES) {
            const exists = await this.propertyRepo.findOne({
                where: { title: def.title },
            });
            if (exists) {
                continue;
            }
            const neighborhoodId = neighborhoodByName.get(def.neighborhoodName);
            if (!neighborhoodId) {
                this.logger.warn(`Barrio no encontrado para seed: ${def.neighborhoodName}`);
                continue;
            }
            await this.propertiesService.create({
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
                assignedSellerId: def.assignedToVendedor && vendedor ? vendedor.id : admin.id,
                images: [
                    {
                        imageUrl: def.imageUrl,
                        isCover: true,
                        position: 0,
                    },
                ],
                amenityIds: defaultAmenityIds.length ? defaultAmenityIds : undefined,
                features: def.features,
            }, {
                id: admin.id,
                email: admin.email,
                role: admin.role,
            });
            created += 1;
        }
        this.logger.log(`Propiedades demo creadas: ${created}`);
    }
    async resolveGeoIds() {
        const country = await this.countryRepo.findOne({
            where: { name: exports.SEED_GEO.country },
        });
        if (!country)
            return null;
        const province = await this.provinceRepo.findOne({
            where: { name: exports.SEED_GEO.province, countryId: country.id },
        });
        if (!province)
            return null;
        const city = await this.cityRepo.findOne({
            where: { name: exports.SEED_GEO.city, provinceId: province.id },
        });
        if (!city)
            return null;
        return {
            countryId: country.id,
            provinceId: province.id,
            cityId: city.id,
        };
    }
};
exports.DatabaseSeedService = DatabaseSeedService;
exports.DatabaseSeedService = DatabaseSeedService = DatabaseSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __param(4, (0, typeorm_1.InjectRepository)(province_entity_1.Province)),
    __param(5, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __param(6, (0, typeorm_1.InjectRepository)(neighborhood_entity_1.Neighborhood)),
    __param(7, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(8, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(9, (0, typeorm_1.InjectRepository)(amenity_entity_1.Amenity)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService,
        properties_service_1.PropertiesService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DatabaseSeedService);
//# sourceMappingURL=database-seed.service.js.map