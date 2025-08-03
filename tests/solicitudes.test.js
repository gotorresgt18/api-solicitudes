import request from 'supertest';
import app from '../app.js'; // Ruta a tu archivo principal de Express

describe('Solicitudes API', () => {
  
    // Crear una solicitud
    it('POST /solicitudes debe crear una solicitud', async () => {

        const user = await request(app)
        .post('/login')
        .send({ username: 'admin', pasword:'admin123'})

        expect(user.statusCode).toBe(200);

        const nuevaSolicitud = {
            titulo: 'Servidor dañado',
            descripcion: 'Solicitud de prueba',
            categoria: 'Soporte',
            estatus: 'Pendiente',
            usuarioSolicitante:"Admin"
        };

        const res = await request(app)
        .post('/solicitudes')
        .auth(user.token,{ type: "bearer"})
        .send(nuevaSolicitud);

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.titulo).toBe(nuevaSolicitud.titulo);
    });

    // Obtener la lista de solicitudes
    it('GET /solicitudes debe devolver 200 y un array', async () => {

        const user = await request(app)
        .post('/login')
        .send({ username: 'admin', pasword:'admin123'})

        expect(user.statusCode).toBe(200);


        const res = await request(app)
        .auth(user.token,{ type: "bearer"})
        .get('/solicitudes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    
    // Obtener lista de solicitudes con Filtros
    it('GET /solicitudes?categoria=Soporte&estatus=Finalizada', async () => {

        const user = await request(app)
        .post('/login')
        .send({ username: 'admin', pasword:'admin123'})

        expect(user.statusCode).toBe(200);

        const res = await request(app)
        .auth(user.token,{ type: "bearer"})
        .get('/solicitudes?categoria=Soporte&estatus=Finalizada');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });


    //Crea y Actualiza una solicitud
    it('PUT /solicitudes/:id debe actualizar una solicitud existente', async () => {

        const user = await request(app)
        .post('/login')
        .send({ username: 'admin', pasword:'admin123'})

        expect(user.statusCode).toBe(200);


        const crear = await request(app)
        .auth(user.token,{ type: "bearer"})
        .post('/solicitudes').send({
            titulo: 'Test Actualizar',
            descripcion: 'Actualizar solicitud',
            categoria: 'Soporte',
            estatus: 'Pendiente',
            usuarioSolicitante: 'Jose'
        });

        const id = crear.body.id;

        const res = await request(app)
        .put(`/solicitudes/${id}`)
        .auth(user.token,{ type: "bearer"})
        .send({
            titulo: 'Test Actualizar',
            descripcion: 'Actualizar solicitud',
            categoria: 'Soporte',
            estatus: 'Finalizada',
            usuarioSolicitante: 'Jose'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.estatus).toBe('Finalizada');
    });


    //Crea y Elimina una solicitud
    it('DELETE /solicitudes/:id debe eliminar una solicitud', async () => {

        const user = await request(app)
        .post('/login')
        .send({ username: 'admin', pasword:'admin123'})

        expect(user.statusCode).toBe(200);

        const crear = await request(app)
        .auth(user.token,{ type: "bearer"})
        .post('/solicitudes').send({
            titulo: 'Eliminar solicitud',
            descripcion: 'Se eliminará',
            categoria: 'Compra',
            estatus: 'Pendiente',
            usuarioSolicitante: 'Antonio'
        });

        const id = crear.body.id;

        const res = await request(app)
        .auth(user.token,{ type: "bearer"})
        .delete(`/solicitudes/${id}`);
        expect(res.statusCode).toBe(204);
    });
});