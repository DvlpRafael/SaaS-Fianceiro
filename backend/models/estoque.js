const mongoose = require('mongoose');

const estoqueSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true }, // Nome do item (único)
  quantidade: { type: Number, required: true, default: 0 },
  precoCusto: { type: Number, required: true, default: 0 },
  precoVenda: { type: Number, required: true, default: 0 },
  dataCadastro: { type: Date, default: Date.now },
  descricao: { type: String }, // Opcional: descrição detalhada do item
  unidadeMedida: { type: String } // Opcional: unidade (ex: kg, unidade, litro)
});

module.exports = mongoose.model('Estoque', estoqueSchema);