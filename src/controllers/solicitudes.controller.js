//#region IMPORTACIONES
import { exportarACsv } from "../utils/exportCsv.js";
import { PrismaClient } from "@prisma/client";
//#endregion 

// Client de Prisma para interactuar con la base de datos.
const prisma = new PrismaClient();

/**
 * Controlador para manejar las solicitudes de la API. 
 * Incluye funciones para crear, actualizar, obtener y eliminar solicitudes,
 * así como para exportar solicitudes a CSV.
 * @module solicitudes.controller
 */

/** * Crea una nueva solicitud en la base de datos.
 * @param {Object} req - El objeto de solicitud que contiene los datos de la nueva solicitud.
 * @param {Object} res - El objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - La solicitud creada o un mensaje de error si la creación falla.
 * @throws {Error} - Si ocurre un error al crear la solicitud.
 * @example
 * // Crear una nueva solicitud
 * POST /solicitudes
 * {
 *   "titulo": "Solicitud de prueba",
 *   "descripcion": "Descripción de la solicitud de prueba",
 *   "categoria": "Soporte",
 *   "estatus": "Pendiente",
 *   "usuarioSolicitante": "nombreUsuario"
 * }
 */
export const crearSolicitud = async (req, res) => {
    // Obtener los datos de la solicitud desde el cuerpo de la solicitud
    const { titulo, descripcion, categoria, estatus, usuarioSolicitante } = req.body;

    try {
        const nuevaSolicitud = await prisma.solicitud.create({
            data: {
                titulo,
                descripcion,
                categoria,
                estatus,
                usuarioSolicitante
            }
        });
        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        console.error("Error al crear la solicitud:", error);
        res.status(400).json({ message: "Datos inválidos", error: error.message });
    }
}

/** * Actualiza una solicitud existente en la base de datos.
 * @param {Object} req - El objeto de solicitud que contiene el ID de la solicitud a actualizar y los nuevos datos.
 * @param {Object} res - El objeto de respuesta para enviar la respuesta al cliente.
 * @returns {Object} - La solicitud actualizada o un mensaje de error si la actualización falla.
 * @throws {Error} - Si ocurre un error al actualizar la solicitud.
 * @example
 * // Actualizar una solicitud existente
 * PUT /solicitudes/1
 * {
 *   "titulo": "Solicitud actualizada",
 *  "descripcion": "Descripción actualizada de la solicitud",
 *  "categoria": "Soporte",
 *  "estatus": "En Proceso",
 * "usuarioSolicitante": "nombreUsuarioActualizado"
 * }
 */
export const actualizarSolicitud = async (req, res) => {
    // Obtener el ID de la solicitud desde los parámetros de la solicitud
    const { id } = req.params;
    const { titulo, descripcion, categoria, estatus, usuarioSolicitante } = req.body;

    try {
        const solicitudActualizada = await prisma.solicitud.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                descripcion,
                categoria,
                estatus,
                usuarioSolicitante
            }
        });
        res.json(solicitudActualizada);
    } catch (error) {
        console.error("Error al actualizar la solicitud:", error);
        res.status(404).json({ message: "No encontrada", error: error.message });
    }
}

/** * Obtiene todas las solicitudes de la base de datos, con la opción de filtrar por categoría y estatus.
 * @param {Object} req - El objeto de solicitud que puede contener filtros para categoría y estatus.
 * @param {Object} res - El objeto de respuesta para enviar la lista de solicitudes al cliente.
 * @returns {Array} - Una lista de solicitudes que coinciden con los filtros aplicados o todas las solicitudes si no se aplican filtros.
 * @throws {Error} - Si ocurre un error al obtener las solicitudes.
 * @example
 * // Obtener todas las solicitudes
 * GET /solicitudes
 * {
 *  "categoria": "Soporte",
 * "estatus": "Pendiente"
 * }
 */
export const obtenerSolicitudes = async (req, res) => {
    try {
        
        // 1. Obtener los filtros de categoría y estatus desde el cuerpo de la solicitud
        const { categoria, estatus } = req.query || {};
        //const { categoria, estatus } = req.body || {};
        const filter = {};
        
        // 2. Construir el filtro para la consulta
        //    Si se proporciona una categoría, la agregamos al filtro.
        if (categoria){
            const categoriasValidas = ['Permiso', 'Compra', 'Soporte'];
            if(!categoriasValidas.includes(categoria))
                return res.status(400).json({ message: `La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}` });

            filter.categoria = categoria; 
        }
        //    Si se proporciona un estatus, lo agregamos al filtro.
        if (estatus) {
            const estatusValidos = ['Pendiente', 'En_Proceso', 'Finalizada'];
            if(!estatusValidos.includes(estatus))
                return res.status(400).json({ message: `El estatus debe ser uno de los siguientes: ${estatusValidos.join(', ')}` });
            filter.estatus = estatus;
        }

        // 3. Realizar la consulta a la base de datos usando Prisma
        //    Usamos findMany para obtener todas las solicitudes que coincidan con los filtros.
        const solicitudes = await prisma.solicitud.findMany({ where: filter });

        // 4. Retornar la lista de solicitudes obtenidas
        //    Si no se encuentran solicitudes, retornamos un mensaje indicando que no se encontraron.
        if (solicitudes.length === 0) {
            return res.status(404).json({ message: "No se encontraron solicitudes" });
        }

        // 5. Si se encuentran solicitudes, las retornamos en la respuesta.
        res.json(solicitudes);

    } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
}

/** * Obtiene una solicitud específica por su ID.
 * @param {Object} req - El objeto de solicitud que contiene el ID de la solicitud a obtener.
 * @param {Object} res - El objeto de respuesta para enviar la solicitud al cliente.
 * @returns {Object} - La solicitud encontrada o un mensaje de error si no se encuentra.
 * @throws {Error} - Si ocurre un error al obtener la solicitud.
 * @example
 * // Obtener una solicitud por ID
 * GET /solicitudes/1
 */
export const obtenerSolicitud = async (req, res) => {

    // Obtener el ID de la solicitud desde los parámetros de la solicitud    
    const { id } = req.params;
    try {

        const solicitud = await prisma.solicitud.findUnique({
            where: { id: parseInt(id) }
        });

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }
        res.json(solicitud);

    } catch (error) {
        console.error("Error al obtener la solicitud:", error);
        res.status(500).json({ message: "Error al obtener la solicitud" });
    }
}

/** * Elimina una solicitud por su ID.
 * @param {Object} req - El objeto de solicitud que contiene el ID de la solicitud a eliminar.
 * @param {Object} res - El objeto de respuesta para enviar la confirmación de eliminación al cliente.
 * @returns {Object} - Un mensaje de confirmación de eliminación o un mensaje de error si la eliminación falla.
 * @throws {Error} - Si ocurre un error al eliminar la solicitud.
 * @example
 * // Eliminar una solicitud por ID
 * DELETE /solicitudes/1
 */
export const eliminarSolicitud = async (req, res) => {
    // Obtener el ID de la solicitud desde los parámetros de la solicitud
    const { id } = req.params;

    try {
        await prisma.solicitud.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: 'Solicitud eliminada' }); 
    } catch (error) {
        console.error("Error al eliminar la solicitud:", error);
        res.status(404).json({ message: "Solicitud no encontrada" });
        //res.status(500).json({ message: "Error al eliminar la solicitud" });
    }
}

/** * Exporta las solicitudes a un archivo CSV.
 * @param {Object} req - El objeto de solicitud que puede contener filtros para categoría y estatus, así como los campos a exportar.
 * @param {Object} res - El objeto de respuesta para enviar el archivo CSV al cliente.
 * @returns {Object} - El archivo CSV generado o un mensaje de error si la exportación falla.
 * @throws {Error} - Si ocurre un error al exportar las solicitudes a CSV.
 * @example
 * // Exportar solicitudes a CSV
 * GET /solicitudes/export/csv
 * {
 *  "categoria": "Soporte",
 * "estatus": "Pendiente",
 * "fields": "id,titulo,descripcion,categoria,estatus,usuarioSolicitante"
 * }
 * */
export const exportSolicitudesToCsv = async (req, res) => {
    try {

        // 1. Obtener los filtros de categoría y estatus desde el cuerpo de la solicitud
        const { categoria, estatus, camposLista } = req.query || {};
        //const { categoria, estatus } = req.body || {};
        const filter = {};
        
        // 2. Construir el filtro para la consulta
        //    Si se proporciona una categoría, la agregamos al filtro.
        if (categoria){
            const categoriasValidas = ['Permiso', 'Compra', 'Soporte'];
            if(!categoriasValidas.includes(categoria))
                return res.status(400).json({ message: `La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}` });

            filter.categoria = categoria; 
        }
        //    Si se proporciona un estatus, lo agregamos al filtro.
        if (estatus) {
            const estatusValidos = ['Pendiente', 'En_Proceso', 'Finalizada'];
            if(!estatusValidos.includes(estatus))
                return res.status(400).json({ message: `El estatus debe ser uno de los siguientes: ${estatusValidos.join(', ')}` });
            filter.estatus = estatus;
        }

        // 3. Realizar la consulta a la base de datos usando Prisma
        //    Usamos findMany para obtener todas las solicitudes que coincidan con los filtros.
        const solicitudes = await prisma.solicitud.findMany({ where: filter });

        // 4. 
        var camposListaArray = [];
        if(camposLista){
            camposListaArray = camposLista.split(',').map(field => field.trim());
            console.log("Campos para exportar:", camposListaArray);
        }
        
        try {
            // Exportar a CSV
            const csv = exportarACsv(solicitudes, camposListaArray);
            
            // Configurar los headers para la descarga del archivo CSV
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=solicitudes.csv');
            
            res.send(csv);
            
        } catch (error) {
            console.error(error);
            res.status(501).json({ message: error.message });
        }
    } catch (error) {
        console.error("Error al exportar las solicitudes a CSV:", error);
        res.status(500).json({ message: "Error al exportar las solicitudes a CSV" });
    }
}