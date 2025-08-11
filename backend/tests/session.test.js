const request = require('supertest');
const app = require('../server'); // asegúrate que sea la ruta correcta a tu server.js

describe('🧪 API de sesiones - LoLProCoaching', () => {
  let tokenValido = '';
  let userId = '';

  // 🔐 Login antes de los tests para obtener token real
  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@gmail.com',
        password: '123456'
      });

    tokenValido = res.body.token;
    userId = res.body.user._id;
  });

  // ❌ GET sin token debe fallar
  it('❌ GET /api/sessions sin token debe fallar con 401', async () => {
    const res = await request(app).get('/api/sessions');
    expect(res.statusCode).toBe(401);
  });

  // ✅ POST con token válido debe crear una sesión
  it('✅ POST /api/sessions con token válido debe crear sesión', async () => {
    const res = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${tokenValido}`)
      .send({
        title: 'Sesión de prueba Jest',
        description: 'Test unitario',
        date: '2025-08-01',
        time: '10:00',
        duration: 90
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.request).toBeDefined();
    expect(res.body.request.title).toBe('Sesión de prueba Jest');
    expect(res.body.request.userId).toBeDefined();
  });

  // ❌ POST con token falso debe fallar
  it('❌ POST /api/sessions con token inválido debe fallar', async () => {
    const res = await request(app)
      .post('/api/sessions')
      .set('Authorization', 'Bearer token-falso')
      .send({
        title: 'Sesión inválida',
        description: 'Token incorrecto',
        date: '2025-08-01',
        time: '10:00',
        duration: 90
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe('Token inválido'); // 👈 asegúrate que coincide con tu authMiddleware
  });
});