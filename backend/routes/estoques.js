const express = require('express');
const router = express.Router();
const Estoque = require('../models/estoque'); // Importe o modelo de Estoque

// Rota POST para adicionar um novo item ao estoque
router.post('/estoque', async (req, res) => {
    try {
        const novoItem = new Estoque(req.body);
        const itemSalvo = await novoItem.save();
        res.status(201).json(itemSalvo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota GET para listar todos os itens do estoque
router.get('/estoque', async (req, res) => {
    try {
        const todosItens = await Estoque.find();
        res.status(200).json(todosItens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota GET para buscar um item de estoque pelo ID
router.get('/estoque/:id', async (req, res) => {
    try {
        const itemEstoque = await Estoque.findById(req.params.id);
        if (!itemEstoque) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json(itemEstoque);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar o item' });
    }
});

// Rota PUT para atualizar um item de estoque pelo ID
router.put('/estoque/:id', async (req, res) => {
    try {
        const itemAtualizado = await Estoque.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Retorna o documento modificado e executa as validações do schema
        );
        if (!itemAtualizado) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json(itemAtualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Rota DELETE para remover um item de estoque pelo ID
router.delete('/estoque/:id', async (req, res) => {
    try {
        const itemRemovido = await Estoque.findByIdAndDelete(req.params.id);
        if (!itemRemovido) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json({ message: 'Item removido com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao remover o item' });
    }
});

module.exports = router;