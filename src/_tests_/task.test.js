const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Task endpoints', () => {
  const testUser = { email: 'tasks-jest@test.com', password: '123456' };
  let token;

  beforeAll(async () => {
    await request(app).post('/auth/register').send(testUser);
    const res = await request(app).post('/auth/login').send(testUser);
    token = res.body.token;
  });

  afterAll(async () => {
    const user = await prisma.user.findUnique({ where: { email: testUser.email } });
    await prisma.task.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it('debería rechazar crear tarea sin token', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Sin auth' });
    expect(res.status).toBe(401);
  });

  it('debería crear una tarea con token válido', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarea de test' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Tarea de test');
    expect(res.body.done).toBe(false);
  });

  it('debería rechazar título vacío', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });

    expect(res.status).toBe(400);
  });
});
