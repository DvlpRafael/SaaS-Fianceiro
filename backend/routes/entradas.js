const express = require('express');
const router = express.Router();
const Entrada = require('../models/entrada'); // Importe o modelo de Entrada

// Rota POST para criar uma nova entrada
router.post('/entradas', async (req, res) => {
  try {
    const novaEntrada = new Entrada(req.body);
    const entradaSalva = await novaEntrada.save();
    res.status(201).json(entradaSalva); // Retorna a entrada salva com status 201 (Created)
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna erro com status 400 (Bad Request)
  }
});

router.get('/entradas', async (req, res) => {
  try {
    const todasEntradas = await Entrada.find();
    res.status(200).json(todasEntradas); // Retorna todas as entradas com status 200 (OK)
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna erro do servidor com status 500
  }
});

router.put('/entradas/:id', async (req, res) => {
  try {
    const entradaAtualizada = await Entrada.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o documento atualizado
    );
    if (!entradaAtualizada) {
      return res.status(404).json({ message: 'Entrada não encontrada.' });
    }
    res.status(200).json(entradaAtualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota DELETE para excluir uma entrada pelo ID
router.delete('/entradas/:id', async (req, res) => {
  try {
    const entradaExcluida = await Entrada.findByIdAndDelete(req.params.id);
    if (!entradaExcluida) {
      return res.status(404).json({ message: 'Entrada não encontrada.' });
    }
    res.status(200).json({ message: 'Entrada excluída com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir a entrada.' });
  }
});

module.exports = router;