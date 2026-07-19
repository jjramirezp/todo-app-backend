const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const errorHandler = require('./middlewares/errorHandler');


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de tareas funcionando' });
});

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorHandler);

module.exports = app;


