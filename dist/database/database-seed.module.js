"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const amenity_entity_1 = require("../amenities/entities/amenity.entity");
const city_entity_1 = require("../geo/entities/city.entity");
const country_entity_1 = require("../geo/entities/country.entity");
const neighborhood_entity_1 = require("../geo/entities/neighborhood.entity");
const province_entity_1 = require("../geo/entities/province.entity");
const property_entity_1 = require("../properties/entities/property.entity");
const properties_module_1 = require("../properties/properties.module");
const user_entity_1 = require("../users/entities/user.entity");
const users_module_1 = require("../users/users.module");
const database_seed_service_1 = require("./database-seed.service");
let DatabaseSeedModule = class DatabaseSeedModule {
};
exports.DatabaseSeedModule = DatabaseSeedModule;
exports.DatabaseSeedModule = DatabaseSeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            properties_module_1.PropertiesModule,
            typeorm_1.TypeOrmModule.forFeature([
                country_entity_1.Country,
                province_entity_1.Province,
                city_entity_1.City,
                neighborhood_entity_1.Neighborhood,
                user_entity_1.User,
                property_entity_1.Property,
                amenity_entity_1.Amenity,
            ]),
        ],
        providers: [database_seed_service_1.DatabaseSeedService],
    })
], DatabaseSeedModule);
//# sourceMappingURL=database-seed.module.js.map