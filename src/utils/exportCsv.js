//#region IMPORTACIONES
import { Parser } from "json2csv";
//#endregion

/**
 * Lista de campos por defecto para las solicitudes.
 * Estos campos se utilizarán al exportar a CSV si no se especifican otros campos.
 */
const camposSolicitud = ['id', 'titulo', 'descripcion', 'categoria', 'estatus', 'fechaCreacion', 'usuarioSolicitante'];


/**
 * Función para exportar datos de las solicitudes a CSV.
 * @param {Array} data - Array de objetos que se desea exportar a CSV.
 * @param {Array} camposLista - Lista de campos a incluir en el CSV. Si no se especifica, se usarán los campos por defecto.
 * @returns {string} - Cadena de texto en formato CSV. 
 * @throws {Error} - Si ocurre un error durante la conversión a CSV.
 */
export const exportarACsv = (data, camposLista) => {
    try {

        // 1. Si no se especifican campos, se usan los por defecto
        //    NOTA: Las demas validaciones se realizaron en el middleware de validación
        if (!camposLista || camposLista.length === 0) {
            camposLista = camposSolicitud;
        }
        
        // 2. Preparar las opciones para json2csv
        //    - Se utiliza un delimitador personalizado (|) para evitar conflictos con comas en los datos
        //    - Se incluye el encabezado para que los nombres de los campos aparezcan en la primera
        const options = {
            fields: camposLista, // Campos a incluir en el CSV
            delimiter: '|', // Delimitador de campos
            header: true // Incluir encabezados
        };

        // 3. Crear el parser de json2csv con las opciones
        const json2csvParser = new Parser(options);

        // 4. Convertir los datos a CSV
        const csv = json2csvParser.parse(data);
        return csv;

    } catch (err) {

        // 5. Manejar errores de conversión
        //    - Si ocurre un error, se lanza una excepción
        //console.error("Error al exportar a CSV.", err);
        throw new Error("Error al exportar a CSV. " + err.message);
    }
};