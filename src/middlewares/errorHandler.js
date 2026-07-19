function errorHandler(err, req, res, next) {
 if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }

  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Ese registro ya existe' });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;
