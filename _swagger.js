// // swagger.js
// import swaggerAutogen from 'swagger-autogen';

// const doc = {
//   info: {
//     title: 'API REST de Solicitudes - Prueba Técnica (NodeJS + Express + SQLite + Prisma + JWT) ',
//     description: 'Documentación de la API que gestiona solicitudes de permiso, soporte y compra.',
//     version: '1.0.0',
//   },
//   host: 'localhost:3000',
//   basePath: '/',
//   schemes: ['http'],
//   consumes: ['application/json'],
//   produces: ['application/json'],
//   tags: [
//     {
//       name: 'Auth',
//       description: 'Endpoints para autenticación',
//     },
//     {
//       name: 'Solicitudes',
//       description: 'Operaciones relacionadas con solicitudes',
//     },
//   ],
//   definitions: {
//     Solicitud: {
//       titulo: 'Falla de impresora',
//       descripcion: 'La impresora no funciona desde ayer',
//       categoria: 'Soporte',
//       estatus: 'Pendiente',
//       usuarioSolicitante: 'Antonio',
//     },
//     Login: {
//       username: 'admin',
//       password: 'admin123',
//     },
//     Token: {
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzU0MTY1NDgwLCJleHAiOjE3NTQxNjkwODB9.f-BtiLKOHuaCpATAFbFWdMr1Z0PQYFdqdcUcA4LcnmU',
//     },
//   },
// };

// const outputFile = './swagger-output.json';
// const endpointsFiles = ['./app.js'];

// swaggerAutogen()(outputFile, endpointsFiles, doc);