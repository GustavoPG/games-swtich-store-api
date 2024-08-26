import request from 'supertest';
import app from '../../index.js'; // Asegúrate de exportar tu instancia de Express desde el archivo principal

describe('Category Routes', () => {
    let categoryId;

    // Prueba para crear una nueva categoría
    test('POST /categorias debe crear una nueva categoría y retornar status 201', async () => {
        const response = await request(app)
            .post('/categorias')
            .send({ nombre: 'Nueva Categoría' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('nombre', 'Nueva Categoría');
        categoryId = response.body.id_categoria; // Guarda el ID de la categoría para pruebas posteriores
        expect(categoryId).toBeDefined(); // Verifica que categoryId no es undefined
    });

    // Prueba para obtener todas las categorías
    test('GET /categorias debe retornar un array de categorías y status 200', async () => {
        const response = await request(app).get('/categorias');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Prueba para obtener una categoría por ID
    test('GET /categorias/:id debe retornar los datos de la categoría y status 200', async () => {
        const response = await request(app)
            .get(`/categorias/${categoryId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('nombre', 'Nueva Categoría');
    });

    // Prueba para actualizar una categoría
    test('PUT /categorias/:id debe actualizar la categoría y retornar status 200', async () => {
        const response = await request(app)
            .put(`/categorias/${categoryId}`)
            .send({ nombre: 'Categoría Actualizada' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('nombre', 'Categoría Actualizada');
    });

    // Prueba para eliminar una categoría
    test('DELETE /categorias/:id debe eliminar la categoría y retornar status 200', async () => {
        const response = await request(app)
            .delete(`/categorias/${categoryId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Categoría eliminada correctamente');
    });

    // Prueba para asegurar que la categoría ha sido eliminada
    test('GET /categorias/:id después de eliminar debe retornar 404', async () => {
        const response = await request(app)
            .get(`/categorias/${categoryId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Categoría no encontrada');
    });
});
