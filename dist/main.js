"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const setup_swagger_1 = require("./swagger/setup-swagger");
const bodyParser = __importStar(require("body-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(bodyParser.json({ limit: '25mb' }));
    app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
    const config = app.get(config_1.ConfigService);
    const isProduction = config.get('nodeEnv') === 'production';
    if (isProduction) {
        app.set('trust proxy', 1);
    }
    app.setGlobalPrefix('api');
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: isProduction ? undefined : false,
    }));
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: config.get('cors.origin') ?? 'http://localhost:3001',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Range'],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    if (!isProduction) {
        (0, setup_swagger_1.setupSwagger)(app);
    }
    const port = config.get('port') ?? 3000;
    await app.listen(port);
    if (!isProduction) {
        console.log(`Swagger UI: http://localhost:${port}/api/docs`);
    }
    console.log(`Uploads: http://localhost:${port}/uploads`);
}
bootstrap();
//# sourceMappingURL=main.js.map