const { z } = require('zod');

const createTaskSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  done: z.boolean().optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
