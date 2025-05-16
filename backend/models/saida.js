const mongoose = require('mongoose');

const saidaSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now },
  categoria: { type: String }, // Opcional: categoria da saída (ex: contas a pagar, salários)
  metodoPagamento: { type: String }, // Opcional: forma de pagamento
  observacoes: { type: String } // Opcional: alguma observação adicional
});

module.exports = mongoose.model('Saida', saidaSchema);