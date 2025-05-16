const mongoose = require('mongoose');

const entradaSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  categoria: { type: String }, // Opcional: categoria da entrada (ex: vendas, serviços)
  metodoPagamento: { type: String }, // Opcional: forma de pagamento (ex: dinheiro, cartão)
  observacoes: { type: String } // Opcional: alguma observação adicional
});

module.exports = mongoose.model('Entrada', entradaSchema);