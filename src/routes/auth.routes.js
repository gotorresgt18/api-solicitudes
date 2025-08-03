//#region IMPORTACIONES
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { login } from '../controllers/auth.controller.js'; // Controlador para manejar la Autenticacion
import { loginValidador } from "../validators/auth.validator.js"; // Validaciones para validar los campos de Autenticacion
import { validarCampos } from '../middlewares/validarCampos.js'; // Middleware para validar los campos de la solicitud
//#endregion

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia del router de Express
// Este router se utilizará para definir las rutas de autenticación
const router = express.Router();


//#region Rutas de autenticación
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     description: Verifica las credenciales del usuario y retorna un token si son correctas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario para iniciar sesión.
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Solicitud inválida - Errores de validación
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', loginValidador, validarCampos, login);
//#endregion

export default router;