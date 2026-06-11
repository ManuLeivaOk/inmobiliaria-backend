"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const configuration_1 = __importDefault(require("./config/configuration"));
const env_validation_1 = require("./config/env.validation");
const database_module_1 = require("./database/database.module");
const database_seed_module_1 = require("./database/database-seed.module");
const auth_module_1 = require("./auth/auth.module");
const amenities_module_1 = require("./amenities/amenities.module");
const geo_module_1 = require("./geo/geo.module");
const properties_module_1 = require("./properties/properties.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const users_module_1 = require("./users/users.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validate: env_validation_1.validateEnv,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'default',
                    ttl: 60_000,
                    limit: 100,
                },
            ]),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
            }),
            database_module_1.DatabaseModule,
            database_seed_module_1.DatabaseSeedModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            amenities_module_1.AmenitiesModule,
            geo_module_1.GeoModule,
            properties_module_1.PropertiesModule,
            uploads_module_1.UploadsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map