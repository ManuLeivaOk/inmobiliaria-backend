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
exports.Neighborhood = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("./city.entity");
let Neighborhood = class Neighborhood {
    id;
    cityId;
    city;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, cityId: { required: true, type: () => String }, city: { required: true, type: () => require("./city.entity").City }, name: { required: true, type: () => String } };
    }
};
exports.Neighborhood = Neighborhood;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], Neighborhood.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'bigint' }),
    __metadata("design:type", String)
], Neighborhood.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, (city) => city.neighborhoods, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id' }),
    __metadata("design:type", city_entity_1.City)
], Neighborhood.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Neighborhood.prototype, "name", void 0);
exports.Neighborhood = Neighborhood = __decorate([
    (0, typeorm_1.Entity)({ name: 'neighborhoods' })
], Neighborhood);
//# sourceMappingURL=neighborhood.entity.js.map