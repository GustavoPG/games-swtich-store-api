module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',  // Usa Babel para transformar archivos JS
  },
  testEnvironment: 'node',  // Configura el entorno de prueba para Node.js
  moduleFileExtensions: ['js', 'json'],  // Extensiones de archivo que Jest manejará
};