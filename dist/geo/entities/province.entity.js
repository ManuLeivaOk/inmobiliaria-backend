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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Province = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("./city.entity");
const country_entity_1 = require("./country.entity");
let Province = class Province {
    id;
    countryId;
    country;
    name;
    cities;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, countryId: { required: true, type: () => String }, country: { required: true, type: () => require("./country.entity").Country }, name: { required: true, type: () => String }, cities: { required: true, type: () => [require("./city.entity").City] } };
    }
};
exports.Province = Province;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], Province.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'bigint' }),
    __metadata("design:type", String)
], Province.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.provinces, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", country_entity_1.Country)
], Province.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Province.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => city_entity_1.City, (city) => city.province),
    __metadata("design:type", Array)
], Province.prototype, "cities", void 0);
exports.Province = Province = __decorate([
    (0, typeorm_1.Entity)({ name: 'provinces' })
], Province);
//# sourceMappingURL=province.entity.js.map