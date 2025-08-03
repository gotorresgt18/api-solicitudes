# 📦 API de Solicitudes - Prueba Técnica

Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express**, **JWT**, **Validator**, **Swagger**, **Prisma** y **SQLite**. Permite administrar solicitudes internas de uno de los departamentos de la empresa con campos como titulo, descripcion, categoría, estatus, entre otros.

---

## 🚀 Tecnologías utilizadas

- **Node.js** y **Express** – Framework backend.
- **Prisma ORM** – Acceso a base de datos.
- **SQLite** – Base de datos local, rápida y sin dependencia de servicios externos.
- **Swagger (swagger-jsdoc + swagger-ui-express)** – Documentación interactiva.
- **Express-validator** – Validación de datos en rutas.
- **Dotenv** – Variables de entorno.

---

## 📌 Justificación técnica

Se eligió **SQLite** en lugar de una solución en la nube como **DynamoDB** para:
- Simplificar la instalación (sin necesidad de servicios externos).
- Facilitar las pruebas y desarrollo local.
- Proporcionar un entorno controlado, rápido y reproducible.

> SQLite es suficiente para esta prueba técnica y puede cambiarse fácilmente a PostgreSQL, MySQL u otro proveedor con Prisma.

---

## 📁 Estructura del proyecto
```bash
├── prisma/
│   ├── dev.db                         # Base de datos una vez creada via comandos
│   ├── schema.prisma                  # Definición del modelo de datos (SQLite)
│   └── seed.js                        # Datos de prueba (si aplica)
├── src/
│   ├── controllers/
│   │   ├── auth.controllers.js        # Metodos para autenticacion usando Prisma (ORM) 
│   │   └── solicitudes.controller.js  # Metodos CRUD para solicitudes usando Prisma (ORM) 
│   ├── middlewares/
│   │   ├── authenticateJWT.js         # Verifica token JWT
│   │   ├── errorHandler.js            # Manejador de errores 
│   │   └── validarCampos.js           # Validacion de campos con express-validator
│   ├── routes/
│   │   ├── auth.routes.js             # Rutas para manejar autenticacion
│   │   └── solicitudes.routes.js      # Rutas para manejar solicitudes
│   ├── utils/
│   │   └── exportCsv.js               # Recurso para exporta datos a CSV
│   └── validators
│       ├── auth.validator.js          # Valida Requeste's a los endpoints de autorizacion con express-validator
│       └── solicitudes.validator.js   # Valida Requeste's a los endpoints de solicitudes con express-validator
├── .env                               # Variables de entorno
├── app.js                             # Configuración principal de Express
├── README.md                          # Este archivo
├── package.json                       # Configuracion y versiones de modulos usados en este proyeto
├── README.md                          # Este archivo
├── server.js                          # Configuración para levantar la API
└── swagger.js                         # Configuración de swagger-jsdoc
```

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/gotorresgt18/api-solicitudes.git
cd api-solicitudes
```

O simplemente descargalo y abrelo con tu editor de codigo favorito.

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar el entorno

Crea un archivo **.env** en la raiz y agrega el siguiente parametro. Cambiar la clave secreta para generar los tokens.

```bash
JWT_SECRET="TU_CLAVE_SECRETA"
```

### 4. Crear base de datos y aplicar migraciones

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Precarga los datos (usuario por defecto):
Ejecuta el seed:

```bash
npm run seed 
```

Esto creará un usuario por defecto:

```bash
username: admin
password: admin123
```
**NOTA:** Estos datos son los de prueba para generar el token.

### 6. Corre el proyecto

```bash
npm run dev
```

El servidor se ejecutará en:
```bash
http://localhost:3000
```

---

## 📚 Documentación Swagger
Al correr el proyecto estará disponible en:
```bash
http://localhost:3000/api-docs
```

Incluye todos los endpoints, parámetros, y permite probar los servicios directamente.

### 🔐 Autenticación

El sistema utiliza JWT para proteger los endpoints de solicitudes.
En Swagger puedes usar el botón "Authorize 🔓" para ingresar el token.
Se requiere el header:

- Authorization: Bearer <tu_token>

El endpoint para obtenerlo es:

- POST /login

```bash
{
  "username": "admin",
  "password": "admin123"
}
```

---

## 📬 Endpoints principales

### Auth

- **POST** /auth/login: Iniciar sesión y obtener JWT.

### Soliciudes

- **GET** /solicitudes - Obtiene un listado de solicitudes (Con filtros opcionales: categoria y estatus).
  - ejemplo:
    ```bash
    /solicitudes?categoria=Soporte&estatus=Pendiente
    ```

- **GET** /solicitudes/:id - Obtiene por ID una solicitud.
  - El ID debe ser numerico y mayor a 0.


- **POST** /solicitudes - Crea una solicitud nueva.
  - ejemplo del objeto:
    ```bash
    {
        "titulo": "Mi PC se traba al abrir la aplicacion de Illustrator",
        "descripcion": "No puedo continuar con mi trabajo ya que depende mucho de poder crear y editar documento en la aplicacion de Illustrator. Ayer se actualizó y fue cuando note que ocurrio esto",
        "categoria": "Soporte",
        "estatus": "Pendiente",
        "usuarioSolicitante": "Jose"
    }
    ```


- **PUT** /solicitudes/:id - Actualiza una solicitud por ID. 
  - El ID debe ser numerico y mayor a 0.
  - Requiere un payload similar al de crear.


- **PUT** /solicitudes/:id - Elimina una solicitud por ID.
  - El ID debe ser numerico y mayor a 0.


- **GET** /solicitudes/exportar/csv - Exporta los datos de las solicitudes a CSV. (Tambien permite filtros opcionales: categoria y estatus).
  - ejemplo:
    ```bash
    /solicitudes?estatus=Finalizada
    ```

---

## ✅ Validaciones
Se usan express-validator para:

- Validar longitud de campos.
- Verificar que id sea numérico y mayor a 0.
- Validar tipos (string, enum, etc).
- Validar categorias y estatus, limitadas un valor la enumeracion correspondiente.


## 🔄 Migrar a otra base de datos
Solo necesitas modificar el archivo .env:
```bach
DATABASE_URL="file:./dev.db"
```

Para PostgreSQL, por ejemplo:

```bach
DATABASE_URL="postgresql://usuario:clave@localhost:5432/mi_db"
```

Luego:
```bach
npx prisma migrate dev --name cambio_db
```

---

## 🧩 Futuras mejoras

- Autenticación completa con registro/login.
- Roles y permisos.
- Paginación y ordenamiento en endpoints.
- Historial o auditoría de cambios.

---

## 📌 Notas Finales

- El sistema está diseñado para ser local, sencillo y portable.
- La estructura del proyecto permite escalar fácilmente a bases de datos como PostgreSQL o MongoDB en el futuro.
- Los filtros categoria y estatus son totalmente opcionales y no generan error si no se envían.
- Las pruebas cubren escenarios básicos de éxito y error.

--- 

## 👨‍💻 Autor
José Antonio Torres Espinoza - Desarrollador Senior Backend
