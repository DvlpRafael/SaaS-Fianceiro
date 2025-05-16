const express = require('express');
const router = express.Router();
const Entrada = require('../models/entrada');
const Saida = require('../models/saida');


// Rota GET para gerar o Relatório DRE
router.get('/dre', async (req, res) => {
  try {
    // Aqui vamos implementar a lógica para buscar e calcular o DRE
    const dre = await calcularDRE(); // Função a ser implementada
    res.status(200).json(dre);
  } catch (err) {
    console.error('Erro ao gerar DRE:', err);
    res.status(500).json({ message: 'Erro ao gerar o relatório DRE.' });
  }
});

// Função placeholder para calcular o DRE (será implementada no próximo passo)
      async function calcularDRE(dataInicio, dataFim) {
      try {
        const filtros = {};
        if (dataInicio && dataFim) {
          filtros.data = {
            $gte: new Date(dataInicio),
            $lte: new Date(dataFim),
          };
        } else if (dataInicio) {
          filtros.data = { $gte: new Date(dataInicio) };
        } else if (dataFim) {
          filtros.data = { $lte: new Date(dataFim) };
        }

        const entradas = await Entrada.find(filtros);
        const saidas = await Saida.find(filtros);

        let receitaBruta = 0;
        entradas.forEach(entrada => {
          receitaBruta += entrada.valor;
        });

        let custoDosServicosPrestados = 0;
        let despesasOperacionais = 0;

      saidas.forEach(saida => {
      if (saida.categoria && saida.categoria.startsWith('Custos')) {
        custoDosServicosPrestados += saida.valor;
      } else {
        despesasOperacionais += saida.valor;
      }
    });

        const lucroBruto = receitaBruta - custoDosServicosPrestados;
        const lair = lucroBruto - despesasOperacionais;
        const lucroLiquido = lair; // Por enquanto, ignoramos impostos

        return {
          periodo: dataInicio && dataFim ? `${dataInicio} - ${dataFim}` : (dataInicio ? `A partir de ${dataInicio}` : (dataFim ? `Até ${dataFim}` : 'Período Completo')),
          receitaBruta,
          custoDosServicosPrestados,
          lucroBruto,
          despesasOperacionais,
          lair,
          lucroLiquido,
          detalhes: {
            entradas: entradas.map(e => ({ descricao: e.descricao, valor: e.valor, data: e.data, categoria: e.categoria })),
            saidas: saidas.map(s => ({ descricao: s.descricao, valor: s.valor, data: s.data, categoria: s.categoria })),
          },
        };
      } catch (err) {
        console.error('Erro ao calcular DRE estruturado:', err);
        throw new Error('Erro ao gerar o relatório DRE estruturado.');
      }
    }
    // Rota GET para gerar o Relatório DRE com filtro de período (opcional)
router.get('/dre', async (req, res) => {
  try {
    const { dataInicio, dataFim } = req.query;
    const dre = await calcularDRE(dataInicio, dataFim); // Passa os parâmetros para a função
    res.status(200).json(dre);
  } catch (err) {
    console.error('Erro ao gerar DRE:', err);
    res.status(500).json({ message: 'Erro ao gerar o relatório DRE.' });
  }
});

module.exports = router;