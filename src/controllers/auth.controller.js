//#region IMPORTACIONES
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
//#endregion

// Client de Prisma para interactuar con la base de datos.
const prisma = new PrismaClient();

/**
 * Controlador para manejar la autenticación de usuarios.
 * Incluye funciones para iniciar sesión y generar un token JWT.
 * @module auth.controller
 */

/** * Inicia sesión y genera un token JWT si las credenciales son correctas.
 * @param {Object} req - El objeto de solicitud que contiene las credenciales del usuario.
 * @param {Object} res - El objeto de respuesta para enviar la respuesta al cliente.    
 * @returns {Object} - Un objeto que contiene el token JWT si las credenciales son correctas.
 * @throws {Error} - Si las credenciales son incorrectas o si ocurre un error al iniciar sesión.
 * @example
 * // Iniciar sesión
 * POST /auth/login
 * {
 *   "username": "admin",
 *   "password": "admin123"
 * }
 */
export const login = async (req, res) => {
    // 1. Extraer las credenciales del cuerpo de la solicitud
    const { username, password } = req.body;

    // 2. Encriptar la contraseña
    //    Esto es necesario para comparar la contraseña proporcionada con la almacenada en la base de datos.
    //    Aquí se utiliza bcrypt para encriptar la contraseña antes de buscar al usuario.
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 2. verificar las credenciales
    //    Buscamos al usuario en la base de datos usando Prisma.
    const usuario = await prisma.usuario.findUnique({
        where: { username } });

    // 3. Verificar si el usuario existe
    //    Si el usuario no existe, retornamos un error 401 (No autorizado).
    if(!usuario){
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    
    // 4. Comparar la contraseña proporcionada con la almacenada en la base de datos
    const coincideContraseña = await bcrypt.compare(password, usuario.password);

    // 5. Verificar coincide la contraseña
    if (coincideContraseña) {

        // 6. Si las contraseñas coinciden, generamos un token JWT
        //    El token contiene el nombre de usuario y tiene una validez de 1 hora 
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    
    // 6. Si las credenciales son incorrectas, retornamos un error 401 (No autorizado)
    //    Esto indica que las credenciales proporcionadas no son válidas.
    return res.status(401).json({ message: 'Credenciales incorrectas' });
}