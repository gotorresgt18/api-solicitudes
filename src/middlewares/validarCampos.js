//#region IMPORTACIONES
import { validationResult } from 'express-validator';
//#endregion

/** * Middleware para validar los campos de una solicitud.
 * Verifica si hay errores de validación en los campos de la solicitud.
 * Si hay errores, envía una respuesta con el estado 400 y un mensaje de error.
 * Si no hay errores, llama a la siguiente función middleware.
 * @param {Object} req - El objeto de solicitud que contiene los datos de la solicitud.
 * @param {Object} res - El objeto de respuesta para enviar la respuesta al cliente.
 * @param {Function} next - La función que se llama para pasar al siguiente middleware o ruta.
 * @returns {void} - Si no hay errores, llama a next() para continuar con la siguiente función middleware.
 * @throws {Error} - Si hay errores de validación, retorna un error 400 (Bad Request) con un mensaje descriptivo.
 * 
 * **/
export const validarCampos = (req, res, next) => {
    
    // 1. Verificar si hay errores de validación en los campos de la solicitud
    //    Usamos validationResult de express-validator para obtener los errores de validación.
    const errors = validationResult(req);

    // 2. Si hay errores, retornar un error 400 (Bad Request) con un mensaje descriptivo y los detalles de los errores.
    //    Si no hay errores, continuar con la siguiente función middleware.
    //    Los errores se envían como un array de objetos con el mensaje de error y el campo que falló la validación.
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Errores de validación', errors: errors.array() });
    }
    
    // 3. Si no hay errores, llamar a next() para continuar con la siguiente función middleware.
    //    Esto permite que la solicitud continúe su flujo normal.
    next();
}