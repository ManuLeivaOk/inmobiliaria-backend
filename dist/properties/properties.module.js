"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const uploads_module_1 = require("../modules/uploads/uploads.module");
const amenity_entity_1 = require("../amenities/entities/amenity.entity");
const user_entity_1 = require("../users/entities/user.entity");
const property_amenity_entity_1 = require("./entities/property-amenity.entity");
const property_feature_entity_1 = require("./entities/property-feature.entity");
const property_image_entity_1 = require("./entities/property-image.entity");
const property_entity_1 = require("./entities/property.entity");
const properties_controller_1 = require("./properties.controller");
const properties_service_1 = require("./properties.service");
let PropertiesModule = class PropertiesModule {
};
exports.PropertiesModule = PropertiesModule;
exports.PropertiesModule = PropertiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            uploads_module_1.UploadsModule,
            typeorm_1.TypeOrmModule.forFeature([
                property_entity_1.Property,
                property_image_entity_1.PropertyImage,
                property_amenity_entity_1.PropertyAmenity,
                property_feature_entity_1.PropertyFeature,
                amenity_entity_1.Amenity,
                user_entity_1.User,
            ]),
        ],
        controllers: [properties_controller_1.PropertiesController],
        providers: [properties_service_1.PropertiesService],
        exports: [properties_service_1.PropertiesService],
    })
], PropertiesModule);
//# sourceMappingURL=properties.module.js.map