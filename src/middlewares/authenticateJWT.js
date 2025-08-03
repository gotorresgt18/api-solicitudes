//#region IMPORTACIONES
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
//#endregion

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

/** * Middleware para autenticar solicitudes usando JWT.
 * Verifica la validez del token JWT en los headers de la solicitud.
 * Si el token es válido, permite el acceso a las rutas protegidas.
 * @param {Object} req - El objeto de solicitud que contiene los headers de la solicitud.
 * @param {Object} res - El objeto de respuesta para enviar la respuesta al cliente.
 * @param {Function} next - La función que se llama para pasar al siguiente middleware o ruta.
 * @returns {void} - Si el token es válido, llama a next() para continuar con la siguiente función middleware.
 * @throws {Error} - Si el token no es válido o no se proporciona, retorna un error 401 (No autorizado) o 403 (Prohibido).
 * @example
 * // Middleware de autenticación JWT
 * app.use('/ruta-protegida', authenticateJWT, (req, res) => {
 *   res.json({ message: 'Acceso permitido' });
 * });
 */
export const authenticateJWT = (req, res, next) => {

    // 1. Verificar si el header Authorization está presente
    //    El header Authorization debe contener el token JWT en el formato "Bearer <token>"
    //    Si no está presente, retornamos un error 401 (No autorizado).
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // 2. Extraer el token del header Authorization
    //    El formato esperado es "Bearer <token>"
    //    Por lo tanto, separamos el header por espacios y tomamos el segundo elemento que es el token en sí.
    const token = authHeader.split(' ')[1];

    // 3. Verificar si el token está presente
    //    Si el token no está presente, retornamos un error 401 (No autorizado).
    //    Si el token está presente, procedemos a verificar su validez.
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // 4. Verificar el token JWT
    //    Usamos jwt.verify para verificar la validez del token.
    //    Si el token es válido, se decodifica y se agrega al objeto req.user para que esté disponible en las siguientes funciones middleware.
    //    Si el token es inválido, retornamos un error 403 (Prohibido).
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' }); 
        }
        req.user = user;
        next();
    });
};