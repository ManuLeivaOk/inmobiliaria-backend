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
exports.City = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const neighborhood_entity_1 = require("./neighborhood.entity");
const province_entity_1 = require("./province.entity");
let City = class City {
    id;
    provinceId;
    province;
    name;
    neighborhoods;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, provinceId: { required: true, type: () => String }, province: { required: true, type: () => require("./province.entity").Province }, name: { required: true, type: () => String }, neighborhoods: { required: true, type: () => [require("./neighborhood.entity").Neighborhood] } };
    }
};
exports.City = City;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], City.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'province_id', type: 'bigint' }),
    __metadata("design:type", String)
], City.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province, (province) => province.cities, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", province_entity_1.Province)
], City.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], City.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => neighborhood_entity_1.Neighborhood, (neighborhood) => neighborhood.city),
    __metadata("design:type", Array)
], City.prototype, "neighborhoods", void 0);
exports.City = City = __decorate([
    (0, typeorm_1.Entity)({ name: 'cities' })
], City);
//# sourceMappingURL=city.entity.js.map