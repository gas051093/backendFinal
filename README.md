# Backend Ecommerce – Proyecto Final

Este proyecto implementa un servidor backend para un ecommerce, desarrollado bajo una arquitectura basada en capas, con autenticación por JWT, manejo de roles, repositorios, DAO, DTOs y sistema completo de recuperación de contraseña por email.

## Características principales

### Arquitectura por capas
- **Controllers:** manejan las peticiones HTTP y devuelven respuestas al cliente.
- **Services:** contienen la lógica de negocio.
- **Repositories:** interfase entre Services y DAOs.
- **DAO (Data Access Object):** acceso directo a la base de datos.
- **Models:** esquemas Mongoose.
- **DTOs:** filtran y exponen solo la información necesaria.
- **Middlewares:** autenticación, roles, validaciones y permisos.
- **Templates:** plantillas HTML para envío de correos.
- **Utils:** funciones auxiliares.

## Tecnologías utilizadas
- Node.js + Express  
- MongoDB + Mongoose  
- Passport (Local & JWT strategies)  
- Nodemailer  
- bcrypt  
- crypto
- Mongoose paginate v2  

## Autenticación y Autorización
- JWT para autenticación.  
- Estrategias Passport: *register*, *login*, *jwt*.  
- Middleware `role()` para control de permisos.  
- Roles:
  - **Admin:** CRUD de productos y administración de usuarios.
  - **User:** gestión de carrito y recuperación de contraseña.

## Sistema de recuperación de contraseña
- Envío de correo desde `/api/users/forgot`.
- Token seguro (crypto) y hasheado (SHA-256).
- Validez de una hora.
- `/api/users/reset`: validación, verificación y actualización de contraseña.
- Prevención de reutilización de tokens o contraseñas anteriores.

## Rutas principales

### Usuarios
```
POST /api/users/register
POST /api/users/login
GET  /api/users/current
POST /api/users/forgot
POST /api/users/reset
POST /api/users/update    
GET  /api/users/reset         
```

### Productos (solo admin)
```
POST   /api/products
GET    /api/products
GET    /api/products/:pid
PUT    /api/products/:pid
DELETE /api/products/:pid
```

### Carrito
```
GET    /api/carts
GET    /api/carts/all         (solo admin)
POST   /api/carts/:cid/product/:pid
DELETE /api/carts/:cid/product/:pid
```

### Tickets
```
POST   /api/tickets
GET    /api/tickets/:tid
```

## Configuración

Crear un archivo `.env` desde `.env.sample`

```


## Instalación

```
npm install
npm run test
```

## Estado del proyecto

Creado by Gaston Magrassi ``` coderhouse 2025 ``` Backend II