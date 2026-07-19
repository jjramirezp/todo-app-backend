const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Auth endpoints', () => {
  const testUser = { email: 'jest@test.com', password: '123456' };

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it('debería registrar un usuario nuevo', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.email).toBe(testUser.email);
    expect(res.body.password).toBeUndefined();
  });

  it('no debería permitir emails duplicados', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(res.status).toBe(409);
  });

  it('debería hacer login y devolver un token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send(testUser);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('debería rechazar login con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'incorrecta' });

    expect(res.status).toBe(401);
  });
});
