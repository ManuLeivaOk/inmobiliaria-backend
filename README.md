# API Inmobiliaria — Autenticación y autorización

Backend **NestJS 11** con PostgreSQL, JWT de acceso corto, refresh tokens opacos con rotación y detección de reutilización.

## Requisitos

- Node.js >= 20
- PostgreSQL 16+ (o Docker)

## Inicio rápido

```bash
# Base de datos
docker compose up -d

# Variables de entorno
cp .env.example .env
# Editar JWT_ACCESS_SECRET y JWT_REFRESH_SECRET (mín. 32 caracteres, distintos)
# Editar REGISTER_API_KEY (mín. 32 caracteres) para habilitar altas de usuarios
# CORS_ORIGIN=http://localhost:3001 (frontend Next.js)

npm install
npm run start:dev
```

API base: `http://localhost:3000/api`

## Seed automático (DB vacía)

Al levantar el backend, si no hay usuarios ni países, se insertan datos demo:

| Tipo | Valor |
|------|-------|
| **Admin** | `admin@inmobiliaria.com` / `Admin123456789!` |
| **Vendedor** | `vendedor@inmobiliaria.com` / `Vendedor123456!` |
| **País** | Argentina |
| **Provincia** | Córdoba |
| **Ciudad** | Río Cuarto |
| **Barrios** | Barrio Centro, Barrio Alberdi, Barrio Parque |
| **Propiedades demo** | 3 (casa en venta, depto en alquiler, local en borrador) |

Desactivar: `DB_SEED=false` en `.env`

## Propiedades (ABM)

Ver Swagger: **Propiedades**, **Amenities**, **Geografía**.

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/properties` | Listado paginado con filtros |
| GET | `/properties/:id` | Detalle completo |
| POST | `/properties` | Alta |
| PATCH | `/properties/:id` | Modificación |
| DELETE | `/properties/:id` | Soft delete |
| GET | `/amenities` | Catálogo |
| GET | `/geo/countries` | Países (y provincias/ciudades/barrios) |

**ADMIN** ve y edita todo. **VENDEDOR** ve publicadas + propias/asignadas.

SQL: `sql/properties.sql` (seed de Argentina + amenities).

## Frontend

El cliente Next.js está en `../frontend` (puerto **3001**). Usa un proxy `/api` → este backend para que las cookies de refresh funcionen en el mismo origen.

## Swagger (OpenAPI)

Con el servidor en marcha, abrí la documentación interactiva:

**http://localhost:3000/api/docs**

- **Authorize → access-token**: pegá el `accessToken` del login/register.
- **Authorize → refresh_token**: para probar `/auth/refresh` desde Swagger (o usá el navegador tras login, que setea la cookie sola).
- JSON OpenAPI: `http://localhost:3000/api/docs-json`

## Endpoints de autenticación

| Método | Ruta | Público | Descripción |
|--------|------|---------|-------------|
| POST | `/auth/register` | Sí | Alta (rol `VENDEDOR` por defecto) |
| POST | `/auth/login` | Sí | Login |
| POST | `/auth/refresh` | Sí | Renueva access + refresh (cookie) |
| POST | `/auth/logout` | No | Revoca refresh actual |
| POST | `/auth/logout-all` | No | Cierra todas las sesiones del usuario |
| GET | `/auth/me` | No | Perfil del usuario autenticado |
| GET | `/auth/admin/ping` | No | Solo rol `ADMIN` |

## Modelo de tokens

1. **Access token (JWT)**: se envía en `Authorization: Bearer <token>`. Vida corta (por defecto 15 min).
2. **Refresh token (opaco)**: se guarda en cookie `httpOnly`, `SameSite=strict`, path `/api/auth`. No va en `localStorage`.

El refresh se almacena en BD solo como **hash SHA-256**. En cada `/auth/refresh` se rota: el token anterior se revoca y se emite uno nuevo (misma `family_id`).

Si se reutiliza un refresh ya revocado, se revoca toda la familia de tokens (protección ante robo de sesión).

## Frontend

```javascript
// Login / refresh: incluir cookies
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

// Rutas protegidas
fetch('http://localhost:3000/api/auth/me', {
  headers: { Authorization: `Bearer ${accessToken}` },
});
```

## Roles

- El **primer usuario** registrado recibe automáticamente rol `ADMIN` (bootstrap).
- `POST /auth/register` requiere el header privado `X-Register-Api-Key`.
- `ADMIN`: puede crear usuarios `ADMIN` (registro autenticado con Bearer).
- `VENDEDOR`: rol por defecto en registros posteriores.

Usar el decorador `@Roles(UserRole.ADMIN)` en controladores que requieran permisos.

## Producción

- `DB_SYNCHRONIZE=false` y aplicar `sql/schema.sql` con migraciones.
- `COOKIE_SECURE=true`, `NODE_ENV=production`.
- Secretos JWT fuertes y distintos; opcional `PASSWORD_PEPPER`.
- HTTPS detrás de proxy con `trust proxy` si aplica.
