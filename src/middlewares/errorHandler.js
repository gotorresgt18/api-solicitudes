
/**
 * Middleware para manejar errores en la aplicación Express.
 * Este middleware captura errores que ocurren en las rutas y middlewares,
 * y envía una respuesta adecuada al cliente.
 * @module errorHandler
 * @param {Object} err - El objeto de error que contiene información sobre el error ocurrido.
 * @param {Object} req - El objeto de solicitud que contiene información sobre la solicitud del
 * cliente.
 * @param {Object} res - El objeto de respuesta para enviar la respuesta al cliente.
 * @param {Function} next - La función que se llama para pasar al siguiente middleware o ruta.
 * @returns {void} - Si hay un error, envía una respuesta JSON con el mensaje de error.
 * @throws {Error} - Si ocurre un error, se captura y se envía una respuesta JSON con el mensaje de error.
 * @example
 * // Middleware de manejo de errores
 * app.use(errorHandler);
 * // Este middleware debe ser el último middleware en la cadena de middlewares.
 */
export const errorHandler = (err, req, res, next) => {

    // Log del error para depuración
    console.error("Error:", err);

    //#region Manejo de errores
    // // Verificar si el error es un error de validación
    // // Si es un error de validación, retornamos un error 400 (Bad Request)
    // // con un mensaje descriptivo y los detalles de los errores.
    // if (err.name === 'ValidationError' || err instanceof SyntaxError) {
    //     return res.status(400).json({ message: 'Error de validación', errors: err.errors || [err.message] });
    // }
    // // Verificar si el error es un error de autenticación
    // // Si es un error de autenticación, retornamos un error 401 (Unauthorized) 
    // // con un mensaje descriptivo.
    // if (err.name === 'UnauthorizedError') {
    //     return res.status(401).json({ message: 'No autorizado' });
    // }
    // // Verificar si el error es un error de autorización
    // // Si es un error de autorización, retornamos un error 403 (Forbidden)
    // if (err.name === 'ForbiddenError') {
    //     return res.status(403).json({ message: 'Prohibido' });
    // }
    // // Verificar si el error es un error de tipo NotFound
    // // Si es un error de tipo NotFound, retornamos un error 404 (Not Found)
    // if (err.name === 'NotFoundError') {
    //     return res.status(404).json({ message: 'Recurso no encontrado' });
    // }
    // // Verificar si el error es un error de tipo Conflict
    // // Si es un error de tipo Conflict, retornamos un error 409 (Conflict)
    // if (err.name === 'ConflictError') {
    //     return res.status(409).json({ message: 'Conflicto de datos', details: err.details });
    // }
    // // Verificar si el error es un error de tipo InternalServerError
    // // Si es un error de tipo InternalServerError, retornamos un error 500 (Internal Server Error)
    // if (err.name === 'InternalServerError') {
    //     return res.status(500).json({ message: 'Error interno del servidor', details: err.details });
    // }
    // // Verificar si el error es un error de tipo BadRequest
    // // Si es un error de tipo BadRequest, retornamos un error 400 (Bad Request)
    // if (err.name === 'BadRequestError') {
    //     return res.status(400).json({ message: 'Solicitud incorrecta', details: err.details });
    // }

    // // Verificar si el error es un error de tipo NotImplemented
    // // Si es un error de tipo NotImplemented, retornamos un error 501 (Not Implemented)
    // if (err.name === 'NotImplementedError') {
    //     return res.status(501).json({ message: 'Funcionalidad no implementada', details: err.details });
    // }
    // // Verificar si el error es un error de tipo ServiceUnavailable
    // // Si es un error de tipo ServiceUnavailable, retornamos un error 503 (Service Unavailable)
    // if (err.name === 'ServiceUnavailableError') {
    //     return res.status(503).json({ message: 'Servicio no disponible', details: err.details });
    // }
    // // Verificar si el error es un error de tipo GatewayTimeout
    // // Si es un error de tipo GatewayTimeout, retornamos un error 504 (Gateway Timeout)
    // if (err.name === 'GatewayTimeoutError') {
    //     return res.status(504).json({ message: 'Tiempo de espera agotado', details: err.details });
    // }
    // // Verificar si el error es un error de tipo TooManyRequests
    // // Si es un error de tipo TooManyRequests, retornamos un error 429 (Too Many Requests)
    // if (err.name === 'TooManyRequestsError') {
    //     return res.status(429).json({ message: 'Demasiadas solicitudes', details: err.details });
    // }
    // // Verificar si el error es un error de tipo UnsupportedMediaType
    // // Si es un error de tipo UnsupportedMediaType, retornamos un error 415 (Unsupported Media Type)
    // if (err.name === 'UnsupportedMediaTypeError') {
    //     return res.status(415).json({ message: 'Tipo de medio no soportado', details: err.details });
    // }
    // // Verificar si el error es un error de tipo UnprocessableEntity
    // // Si es un error de tipo UnprocessableEntity, retornamos un error 422 (Unprocessable Entity)
    // if (err.name === 'UnprocessableEntityError') {
    //     return res.status(422).json({ message: 'Entidad no procesable', details: err.details });
    // }
    // // Verificar si el error es un error de tipo MethodNotAllowed
    // // Si es un error de tipo MethodNotAllowed, retornamos un error 405 (Method Not Allowed)
    // if (err.name === 'MethodNotAllowedError') {
    //     return res.status(405).json({ message: 'Método no permitido', details: err.details });
    // }
    // // Verificar si el error es un error de tipo RequestTimeout
    // // Si es un error de tipo RequestTimeout, retornamos un error 408 (Request Timeout)
    // if (err.name === 'RequestTimeoutError') {
    //     return res.status(408).json({ message: 'Tiempo de espera de solicitud agotado', details: err.details });
    // }
    // // Verificar si el error es un error de tipo PayloadTooLarge
    // // Si es un error de tipo PayloadTooLarge, retornamos un error 413 (Payload Too Large)
    // if (err.name === 'PayloadTooLargeError') {
    //     return res.status(413).json({ message: 'Carga útil demasiado grande', details: err.details });
    // }
    // // Verificar si el error es un error de tipo NotAcceptable
    // // Si es un error de tipo NotAcceptable, retornamos un error 406 (Not Acceptable)
    // if (err.name === 'NotAcceptableError') {
    //     return res.status(406).json({ message: 'No aceptable', details: err.details });
    // }
    // // Verificar si el error es un error de tipo Conflict
    // // Si es un error de tipo Conflict, retornamos un error 409 (Conflict)
    // if (err.name === 'ConflictError') {
    //     return res.status(409).json({ message: 'Conflicto de datos', details: err.details });
    // }
    // // Verificar si el error es un error de tipo PreconditionFailed
    // // Si es un error de tipo PreconditionFailed, retornamos un error 412 (Precondition Failed)
    // if (err.name === 'PreconditionFailedError') {
    //     return res.status(412).json({ message: 'Precondición fallida', details: err.details });
    // }
    //#endregion

    // Verificar si el error es un error de validación
    // Si es un error de validación, retornamos un error 400 (Bad Request)
    // con un mensaje descriptivo y los detalles de los errores.
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message, errors: err.errors });
    }

    // Verificar si el error es un error de Prisma
    // Si es un error de Prisma, retornamos un error 500 (Internal Server Error)
    if (err.code === 'P2002') {
        return res.status(409).json({ message: "Conflicto de datos", details: err.meta });
    }

    // Manejo de otros errores
    res.status(500).json({ message: "Error interno del servidor" });
}