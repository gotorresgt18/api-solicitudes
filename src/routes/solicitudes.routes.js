//#region IMPORTACIONES
import express from 'express';
import { 
    obtenerSolicitudes, 
    obtenerSolicitud, 
    crearSolicitud, 
    actualizarSolicitud, 
    eliminarSolicitud 
} from '../controllers/solicitudes.controller.js'; // Controladores para manejar las solicitudes
import { exportSolicitudesToCsv } from '../controllers/solicitudes.controller.js'; // Exportar solicitudes a CSV
import { 
    crearSolicitudValidador, 
    actualizarSolicitudValidador, 
    obtenerSolicitudValidador, 
    obtenerSolicitudesValidador, 
    eliminarSolicitudValidador, 
    exportarCSVSolicitudesValidador 
} from "../validators/solicitudes.validator.js"; // Validaciones para las solicitudes
import { validarCampos } from '../middlewares/validarCampos.js'; // Middleware para validar los campos de la solicitud
//#endregion

const router = express.Router();

//#region Rutas para manejar las solicitudes

/**
 * @swagger
 * /solicitudes:
 *   post:
 *     tags: [Solicitudes]
 *     summary: Crear una nueva solicitud
 *     description: Crea una nueva solicitud con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - categoria
 *               - estatus
 *               - usuarioSolicitante
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Laptop lenta"
 *               descripcion:
 *                 type: string
 *                 example: "Solicito revisar la laptop que está muy lenta"
 *               categoria:
 *                 type: string
 *                 example: "Soporte"
 *               estatus:
 *                 type: string
 *                 example: "Pendiente"
 *               usuarioSolicitante:
 *                 type: string
 *                 example: "Antonio"
 *     responses:
 *       201:
 *         description: Solicitud creada correctamente
 *       400:
 *         description: Datos inválidos - Errores de validación
 *       401:
 *         description: No autorizado - Token de autenticación inválido o ausente
 */
router.post('/', crearSolicitudValidador, validarCampos, crearSolicitud); // Crear una nueva solicitud
/**
 * @swagger
 * /solicitudes/{id}:
 *   put:
 *     tags: [Solicitudes]
 *     summary: Actualizar una solicitud existente
 *     description: Actualiza los datos de una solicitud existente con el ID especificado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: ID de la solicitud
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Laptop lenta"
 *               descripcion:
 *                 type: string
 *                 example: "Solicito revisar la laptop que está muy lenta"
 *               categoria:
 *                 type: string
 *                 example: "Soporte"
 *               estatus:
 *                 type: string
 *                 example: "En_Proceso"
 *               usuarioSolicitante:
 *                 type: string
 *                 example: "Antonio"
 *     responses:
 *       200:
 *         description: Solicitud actualizada correctamente
 *       400:
 *         description: Datos inválidos - Errores de validación
 *       401:
 *         description: No autorizado - Token de autenticación inválido o ausente
 *       404:
 *         description: Solicitud no encontrada
 */
router.put('/:id', actualizarSolicitudValidador, validarCampos, actualizarSolicitud); // Actualizar una solicitud por ID
/**
 * @swagger
 * /solicitudes:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Obtener todas las solicitudes
 *     description: Recupera una lista de todas las solicitudes existentes en el sistema.
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrar solicitudes por categoría (opcional)
 *       - in: query
 *         name: estatus
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrar solicitudes por estatus (opcional)
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida correctamente
 *       400:
 *         description: Datos inválidos - Errores de validación
 *       401:
 *         description: No autorizado - Token de autenticación inválido o ausente
 *       404:
 *         description: No se encontraron solicitudes
 *       500:
 *         description: Error del servidor al obtener las solicitudes
 */
router.get('/', obtenerSolicitudesValidador, validarCampos, obtenerSolicitudes); // Obtener todas las solicitudes
/**
 * @swagger
 * /solicitudes/{id}:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Obtener una solicitud por ID
 *     description: Devuelve la solicitud correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud encontrada
 *       404:
 *         description: Solicitud no encontrada
 */
router.get('/:id', obtenerSolicitudValidador, validarCampos, obtenerSolicitud); // Obtener una solicitud por ID
/**
 * @swagger
 * /solicitudes/{id}:
 *   delete:
 *     tags: [Solicitudes]
 *     summary: Eliminar una solicitud
 *     description: Elimina la solicitud correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la solicitud
 *     responses:
 *       200:
 *         description: Solicitud eliminada correctamente
 *       404:
 *         description: Solicitud no encontrada
 */
router.delete('/:id', eliminarSolicitudValidador, validarCampos, eliminarSolicitud); // Eliminar una solicitud por ID
/**
 * @swagger
 * /solicitudes/export/csv:
 *   get:
 *     tags: [Solicitudes]
 *     summary: Exportar solicitudes a CSV
 *     description: Genera un archivo CSV con todas las solicitudes existentes.
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrar solicitudes por categoría (opcional)
 *         example: "Soporte"
 *       - in: query
 *         name: estatus
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtrar solicitudes por estatus (opcional)
 *         example: "Pendiente"
 *       - in: query
 *         name: camposLista
 *         schema:
 *           type: string
 *         required: false
 *         description: especificar los parametros a exportar (opcional)
 *         example: "id,titulo, categoria, estatus"
 *     responses:
 *       200:
 *         description: Archivo CSV generado exitosamente
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       400: 
 *        description: Datos inválidos - Errores de validación
 *       401:
 *         description: No autorizado - Token de autenticación inválido o ausente
 *       404:
 *         description: No se encontraron solicitudes
 *       500:
 *         description: Error del servidor
 */
router.get('/export/csv', exportarCSVSolicitudesValidador, validarCampos, exportSolicitudesToCsv); // Exportar solicitudes a CSV
//#endregion

export default router;