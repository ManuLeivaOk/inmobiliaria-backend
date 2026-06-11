# Postman

Importar en Postman:

1. Abrir Postman.
2. `Import`.
3. Seleccionar `postman/inmobiliaria-api.postman_collection.json`.
4. Revisar la variable `baseUrl` de la coleccion. Por defecto usa `http://localhost:3000/api`.
5. Para `Auth / Register`, completar la variable `registerApiKey` con el valor de `REGISTER_API_KEY`.
6. Ejecutar `Auth / Login`. La coleccion guarda automaticamente `accessToken`.

Postman guarda la cookie `refresh_token` automaticamente si el dominio coincide con `baseUrl`.

## cURL rapidos

Login:

```bash
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@inmobiliaria.com","password":"Admin123456789!"}'
```

Register:

```bash
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Register-Api-Key: TU_REGISTER_API_KEY" \
  -d '{"firstName":"Juan","lastName":"Perez","email":"juan.perez@inmobiliaria.com","phone":"+5493584000000","password":"ContrasenaSegura123!"}'
```

Perfil:

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TU_ACCESS_TOKEN"
```

Listar propiedades:

```bash
curl "http://localhost:3000/api/properties?page=1&limit=10" \
  -H "Authorization: Bearer TU_ACCESS_TOKEN"
```
