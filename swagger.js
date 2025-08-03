import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
    info: {
       title: 'API REST de Solicitudes - Prueba Técnica (NodeJS + Express + SQLite + Prisma + JWT) ',
        description: 'Documentación de la API que gestiona solicitudes de permiso, soporte y compra.',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desarrollo'
        }
    ],
     components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schema:{
            Auth: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string',
                        example: 'admin'
                    },
                    password: {
                        type: 'string',
                        example: 'admin123'
                    }
                }
            },
            Solicitudes: {
                type: 'object',
                properties: {
                    titulo: {
                        type: 'string',
                        example: 'Falla de impresora'
                    },
                    descripcion: {
                        type: 'string',
                        example: 'La impresora no funciona desde ayer'
                    },
                    categoria: {
                        type: 'string',
                        example: 'Soporte'
                    },
                    estatus: {
                        type: 'string',
                        example: 'Pendiente'
                    },
                    usuarioSolicitante: {
                        type: 'string',
                        example: 'Antonio'
                    }
                }
            },
        }
    },
    security: [
        {
            bearerAuth: [],
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'] // Ruta a los archivos donde se encuentran las anotaciones de Swagger
};

export default swaggerJsDoc(options);
