const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');
const validate = require('../middlewares/validate.middleware');
const { createTaskSchema, updateTaskSchema } = require('../schemas/task.schema');

router.use(authenticate); // protege TODAS las rutas de abajo

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);


module.exports = router;





