"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePropertyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_property_dto_1 = require("./create-property.dto");
class UpdatePropertyDto extends (0, swagger_1.PartialType)(create_property_dto_1.CreatePropertyDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePropertyDto = UpdatePropertyDto;
//# sourceMappingURL=update-property.dto.js.map