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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const argon2 = __importStar(require("argon2"));
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const user_role_enum_1 = require("./enums/user-role.enum");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    usersRepo;
    config;
    constructor(usersRepo, config) {
        this.usersRepo = usersRepo;
        this.config = config;
    }
    async findActiveById(id) {
        return this.usersRepo.findOne({
            where: { id, isActive: true, deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async findByEmailWithPassword(email) {
        return this.usersRepo.findOne({
            where: { email: email.toLowerCase(), deletedAt: (0, typeorm_2.IsNull)() },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                passwordHash: true,
                role: true,
                isActive: true,
                isVerified: true,
                lastLoginAt: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
            },
        });
    }
    async create(input) {
        const email = input.email.toLowerCase().trim();
        const existing = await this.usersRepo.findOne({
            where: { email },
            withDeleted: true,
        });
        if (existing) {
            throw new common_1.ConflictException('El email ya está registrado');
        }
        const passwordHash = await this.hashPassword(input.password);
        const user = this.usersRepo.create({
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
            email,
            phone: input.phone?.trim() ?? null,
            passwordHash,
            role: input.role ?? user_role_enum_1.UserRole.VENDEDOR,
            isActive: true,
            isVerified: false,
        });
        return this.usersRepo.save(user);
    }
    async verifyPassword(user, plainPassword) {
        return argon2.verify(user.passwordHash, this.applyPepper(plainPassword));
    }
    async updateLastLogin(userId) {
        await this.usersRepo.update(userId, { lastLoginAt: new Date() });
    }
    async getProfile(userId) {
        const user = await this.usersRepo.findOne({
            where: { id: userId, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return user;
    }
    async hashPassword(password) {
        return argon2.hash(this.applyPepper(password), {
            type: argon2.argon2id,
            memoryCost: 65536,
            timeCost: 3,
            parallelism: 4,
        });
    }
    applyPepper(password) {
        const pepper = this.config.get('auth.bcryptPepper') ?? '';
        return `${password}${pepper}`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map