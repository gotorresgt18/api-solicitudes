import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Client de Prisma para interactuar con la base de datos.
const prisma = new PrismaClient();

async function main() {
    const username = 'admin';
    const password = 'admin123';

    const hashedPassword = await bcrypt.hash(password, 10);

    const existenteUsuario = await prisma.usuario.findUnique({
        where: { username } });

    if (!existenteUsuario) {
        await prisma.usuario.create({
            data: {
                username,
                password: hashedPassword,
                fechaCreacion: new Date()
            }
        });
        console.log(`Usuario ${username} creado con éxito.`);
    }else{
        console.log(`El usuario ${username} ya existe.`)
    }
}

main().catch((e)=> {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
})
