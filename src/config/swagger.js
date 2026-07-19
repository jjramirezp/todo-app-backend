const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tareas',
      version: '1.0.0',
      description: 'API REST para gestión de tareas con autenticación',
    },
   servers: [
  { url: 'https://todo-app-backend-production-0126.up.railway.app', description: 'Producción' },
  { url: 'http://localhost:3000', description: 'Desarrollo' },
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/docs/*.yaml'],
};

module.exports = swaggerJsdoc(options);


