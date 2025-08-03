//#region IMPORTACIONES
import {body, param} from 'express-validator';
//#endregion

//#region CATALOGOS DEFAULT
const categoriasValidas = ['Permiso', 'Compra', 'Soporte'];
const estatusValidos = ['Pendiente', 'En_Proceso', 'Finalizada'];
const camposSolicitud = ['id', 'titulo', 'descripcion', 'categoria', 'estatus', 'fechaCreacion', 'usuarioSolicitante'];
//#endregion

//#region VALIDACIONES AL MODELO EN CADA ENPOINT

// Validaciones al modelo para crear una Solicitud
export const crearSolicitudValidador = [
    body('titulo')
                .notEmpty().withMessage('El título es obligatorio')
                .isString().withMessage('El título debe ser una cadena de texto')
                .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),

    body('descripcion')
                .notEmpty().withMessage('La descripción es obligatoria')
                .isString().withMessage('La descripción debe ser una cadena de texto')
                .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),

    body('categoria')
                .notEmpty().withMessage('La categoría es obligatoria')
                .isIn(categoriasValidas).withMessage(`La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}`),

    body('estatus')
                .notEmpty().withMessage('El estatus es obligatorio')
                .isIn(estatusValidos).withMessage(`El estatus debe ser uno de los siguientes: ${estatusValidos.join(', ')}`),

    body('usuarioSolicitante')
                .notEmpty().withMessage('El usuario solicitante es obligatorio')
                .isString().withMessage('El usuario solicitante debe ser una cadena de texto')
                .isLength({ min: 3 }).withMessage('El usuario solicitante debe tener al menos 3 caracteres')
];

// Validaciones al parametro y modelo para actualizar una Solicitud
export const actualizarSolicitudValidador = [
    param('id')
                .isInt().withMessage('El ID de la solicitud debe ser un número entero'),

    body('titulo')
                .notEmpty().withMessage('El título es obligatorio')
                .isString().withMessage('El título debe ser una cadena de texto')
                .isLength({ min: 3 }).withMessage('El título debe tener al menos 3 caracteres'),

    body('descripcion')
                .notEmpty().withMessage('La descripción es obligatoria')
                .isString().withMessage('La descripción debe ser una cadena de texto')
                .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),

    body('categoria')
                .notEmpty().withMessage('La categoría es obligatoria')
                .isIn(categoriasValidas).withMessage(`La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}`),

    body('estatus')
                .notEmpty().withMessage('El estatus es obligatorio')
                .isIn(estatusValidos).withMessage(`El estatus debe ser uno de los siguientes: ${estatusValidos.join(', ')}`),

    body('usuarioSolicitante').optional()
                .notEmpty().withMessage('El usuario solicitante es obligatorio')
                .isString().withMessage('El usuario solicitante debe ser una cadena de texto')
                .isLength({ min: 3 }).withMessage('El usuario solicitante debe tener al menos 3 caracteres')
];

// Validaciones al obtener todas las solicitudes
export const obtenerSolicitudesValidador = [
    body('categoria')
                .optional()
                .isIn(categoriasValidas).withMessage(`La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}`),

    body('estatus')
                .optional()
                .isIn(estatusValidos).withMessage(`El estatus debe ser uno de los siguientes: ${estatusValidos.join(', ')}`)
];

// Validaciones al obtener una solicitud por ID
export const obtenerSolicitudValidador = [
    param('id')
                .isInt({ min: 1 }).withMessage('El ID de la solicitud debe ser un número entero y mayor a 0')
];

// Validaciones al eliminar una solicitud
export const eliminarSolicitudValidador = [
    param('id')
                .isInt({ min: 1 }).withMessage('El ID de la solicitud debe ser un número entero')
];

// Validaciones al exportar solicitudes a CSV
export const exportarCSVSolicitudesValidador = [
    body('categoria')
                .optional()
                .isIn(categoriasValidas).withMessage(`La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}`),

    body('estatus')
                .optional()
                .isIn(estatusValidos).withMessage(`El estatus debe ser uno de los siguientes: ${estatusValidos.join(', ')}`),

    body('camposLista')
                .optional()
                .isArray().withMessage('Los camposLista deben ser un array')
                .custom(camposLista => {
                    if (camposLista.length === 0) return true; // Si no se especifican campos, se usan los por defecto
                    const camposInvalidos = camposLista.filter(campo => !camposSolicitud.includes(campo));
                    if (camposInvalidos.length > 0) {
                        throw new Error(`Los siguientes campos no son válidos: ${camposInvalidos.join(', ')}`);
                    }
                    return true;
                })
];

//#endregion