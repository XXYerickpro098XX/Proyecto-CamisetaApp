const { Schema, model } = require('mongoose');
// Ejemplo de esquema Camiseta (simplificado)
const CamisetaSchema = new Schema({
  creador: String,
  torsoColor: String,
  mangaIzqColor: String,
  mangaDerColor: String,
  cuelloColorder: String,
  cuelloColorizq: String,

  fechaCreacion: { type: Date, default: Date.now },
  votos: [  ],       // (ver siguiente sección)
  calificacion: { type: Number, default: 0 }
});

module.exports = model('Camiseta', CamisetaSchema);