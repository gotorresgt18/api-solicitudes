//#region IMPORTACIONES
import express from 'express';
import cors from 'cors';
import solicitudesRoutes from './src/routes/solicitudes.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { authenticateJWT } from './src/middlewares/authenticateJWT.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
//import swaggerFile from './swagger-output.json' assert { type: 'json' }; // Importar el archivo generado por swagger-autogen
//#endregion

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger docs en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rutas publicas
app.use('/auth', authRoutes);

// Rutas protegidas con autenticación JWT

app.use('/solicitudes', authenticateJWT, solicitudesRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;