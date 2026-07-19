const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createTask(req, res, next) {
  try {
    const { title } = req.body;
    const task = await prisma.task.create({
      data: { title, userId: req.userId },
    });
    res.status(201).json(task);
  } catch (error) {
    next(error); // en vez de manejarlo aquí, lo delega
  }
}


async function getTasks(req, res) {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
  });
  res.json(tasks);
}

async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const data = {};
    if (req.body.title !== undefined) data.title = req.body.title;
    if (req.body.done !== undefined) data.done = req.body.done;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data,
    });
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
}

async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
}

module.exports = { createTask, getTasks, updateTask, deleteTask };
