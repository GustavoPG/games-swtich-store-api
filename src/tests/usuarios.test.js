import request from 'supertest';
import app from '../../index.js'; // Asegúrate de exportar tu instancia de Express desde el archivo principal
import pool from '../../database/config.js'; // Importa la configuración de la base de datos para realizar operaciones de limpieza

describe('User Routes', () => {
    let userId;
    let token;

    // Prueba para registrar un nuevo usuario
    test('POST /usuarios/registro debe crear un nuevo usuario y retornar status 201', async () => {
        const response = await request(app)
            .post('/usuarios/registro')
            .send({
                nombre: 'Gustavo',
                apellido: 'Parada',
                email: 'gustavo.parada@example.com',
                contraseña: 'gp2024',
                avatar: 'https://example.com/avatar.jpg'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('nombre', 'Gustavo');
        expect(response.body).toHaveProperty('apellido', 'Parada');
        userId = response.body.id_usuario; // Guarda el ID del usuario para pruebas posteriores
        expect(userId).toBeDefined(); // Verifica que userId no es undefined
    });

    // Prueba para iniciar sesión con el nuevo usuario
    test('POST /usuarios/login debe autenticar al usuario y retornar un token', async () => {
        const response = await request(app)
            .post('/usuarios/login')
            .send({
                email: 'gustavo.parada@example.com',
                contraseña: 'gp2024'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token; // Guarda el token para pruebas posteriores
        expect(token).toBeDefined(); // Verifica que token no es undefined
    });

    // Prueba para obtener el perfil del usuario autenticado
    test('GET /usuarios/perfil debe retornar los datos del usuario autenticado y status 200', async () => {
        const response = await request(app)
            .get('/usuarios/perfil')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('nombre', 'Gustavo');
        expect(response.body).toHaveProperty('apellido', 'Parada');
    });

    // Prueba para actualizar el usuario
    // test('PUT /usuarios/:id debe actualizar el usuario y retornar status 200', async () => {
    //     const response = await request(app)
    //         .put(`/usuarios/${userId}`)
    //         //.set('Authorization', `Bearer ${token}`)
    //         .send({
    //             nombre: 'Gustavo Actualizado',
    //             apellido: 'Parada Actualizado',
    //             email: 'gustavo.actualizado@example.com',
    //             avatar: 'https://example.com/avatar-updated.jpg'
    //         });

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toHaveProperty('nombre', 'Gustavo Actualizado');
    //     expect(response.body).toHaveProperty('apellido', 'Parada Actualizado');
    // });

    // Prueba para eliminar el usuario
    test('DELETE /usuarios/:id debe eliminar el usuario y retornar status 200', async () => {
        const response = await request(app)
            .delete(`/usuarios/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Usuario eliminado correctamente');
    });

    // Prueba para asegurar que el usuario ha sido eliminado
    // test('GET /usuarios/:id después de eliminar debe retornar 404', async () => {
    //     const response = await request(app)
    //         .get(`/usuarios/${userId}`)
    //         .set('Authorization', `Bearer ${token}`);

    //     expect(response.statusCode).toBe(404);
    //     expect(response.body).toHaveProperty('error', 'Usuario no encontrado');
    // });
});
