// reportMiddleware.js

export const reportTransaction = (req, res, next) => {
  console.log(`Ruta: ${req.method} ${req.url} - Hora: ${new Date().toISOString()}`);
  next();
};