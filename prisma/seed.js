//#region IMPORTACIONES
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
//#endregion

// Client de Prisma para interactuar con la base de datos.
const prisma = new PrismaClient();


// Función principal para crear un usuario administrador
// Si el usuario ya existe, no lo crea de nuevo.
async function main() {

    const username = 'admin';
    const password = 'admin123';

    // Encriptar la contraseña antes de guardarla
    // Esto es importante para la seguridad de la contraseña.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar si el usuario ya existe
    const existenteUsuario = await prisma.usuario.findUnique({
        where: { username } });

    // Si el usuario no existe, lo creamos
    // Si ya existe, no hacemos nada.
    if (!existenteUsuario) {

        // Crear el usuario administrador
        // con la contraseña encriptada.
        await prisma.usuario.create({
            data: {
                username,
                password: hashedPassword,
                fechaCreacion: new Date()
            }
        });

        // Mensaje de éxito
        console.log(`Usuario ${username} creado con éxito.`);
    }else{

        // Mensaje si el usuario ya existe
        console.log(`El usuario ${username} ya existe.`)
    }
}

// Ejecutar la función principal
// y manejar errores si ocurren.
main().catch((e)=> {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})
