import request from 'supertest';
import app from '../../index.js';

describe('API Tests', () => {

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/ruta-protegida');
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Token no proporcionado');
  });

  it('should return 200 for a valid token', async () => {
    const token = 'token_válido'; // Genera un token válido antes de ejecutar el test

    const response = await request(app)
      .get('/ruta-protegida')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(response.body.mensaje).toBe('Acceso permitido');
  });

});