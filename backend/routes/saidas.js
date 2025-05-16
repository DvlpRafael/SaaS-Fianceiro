const express = require('express');
const router = express.Router();
const Saida = require('../models/saida'); // Importe o modelo de Saida (singular!)

// Rota POST para criar uma nova saída
router.post('/saidas', async (req, res) => {
  try {
    const novaSaida = new Saida(req.body);
    const saidaSalva = await novaSaida.save();
    res.status(201).json(saidaSalva); // Retorna a saída salva com status 201 (Created)
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna erro com status 400 (Bad Request)
  }
});

router.get('/saidas', async (req, res) => {
  try {
    const todasSaidas = await Saida.find();
    res.status(200).json(todasSaidas); // Retorna todas as saídas com status 200 (OK)
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna erro do servidor com status 500
  }
});

// Rota PUT para atualizar uma saída pelo ID
router.put('/saidas/:id', async (req, res) => {
  try {
    const saidaAtualizada = await Saida.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!saidaAtualizada) {
      return res.status(404).json({ message: 'Saída não encontrada.' });
    }
    res.status(200).json(saidaAtualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota DELETE para excluir uma saída pelo ID
router.delete('/saidas/:id', async (req, res) => {
  try {
    const saidaExcluida = await Saida.findByIdAndDelete(req.params.id);
    if (!saidaExcluida) {
      return res.status(404).json({ message: 'Saída não encontrada.' });
    }
    res.status(200).json({ message: 'Saída excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir a saída.' });
  }
});

module.exports = router;