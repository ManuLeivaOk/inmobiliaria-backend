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
exports.GeoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const city_entity_1 = require("./entities/city.entity");
const country_entity_1 = require("./entities/country.entity");
const neighborhood_entity_1 = require("./entities/neighborhood.entity");
const province_entity_1 = require("./entities/province.entity");
let GeoService = class GeoService {
    countryRepo;
    provinceRepo;
    cityRepo;
    neighborhoodRepo;
    constructor(countryRepo, provinceRepo, cityRepo, neighborhoodRepo) {
        this.countryRepo = countryRepo;
        this.provinceRepo = provinceRepo;
        this.cityRepo = cityRepo;
        this.neighborhoodRepo = neighborhoodRepo;
    }
    findCountries() {
        return this.countryRepo.find({ order: { name: 'ASC' } });
    }
    findProvinces(countryId) {
        return this.provinceRepo.find({
            where: countryId ? { countryId } : {},
            order: { name: 'ASC' },
        });
    }
    findCities(provinceId) {
        return this.cityRepo.find({
            where: provinceId ? { provinceId } : {},
            order: { name: 'ASC' },
        });
    }
    findNeighborhoods(cityId) {
        return this.neighborhoodRepo.find({
            where: cityId ? { cityId } : {},
            order: { name: 'ASC' },
        });
    }
};
exports.GeoService = GeoService;
exports.GeoService = GeoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.Country)),
    __param(1, (0, typeorm_1.InjectRepository)(province_entity_1.Province)),
    __param(2, (0, typeorm_1.InjectRepository)(city_entity_1.City)),
    __param(3, (0, typeorm_1.InjectRepository)(neighborhood_entity_1.Neighborhood)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], GeoService);
//# sourceMappingURL=geo.service.js.map