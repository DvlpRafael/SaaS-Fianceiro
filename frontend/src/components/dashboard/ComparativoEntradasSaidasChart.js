import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ComparativoEntradasSaidasChart({ entradas, saidas }) {
  const entradasPorData = {};
  entradas.forEach(entrada => {
    const data = new Date(entrada.data).toLocaleDateString();
    entradasPorData[data] = (entradasPorData[data] || 0) + entrada.valor;
  });

  const saidasPorData = {};
  saidas.forEach(saida => {
    const data = new Date(saida.data).toLocaleDateString();
    saidasPorData[data] = (saidasPorData[data] || 0) + saida.valor;
  });

  const labels = [...new Set([...Object.keys(entradasPorData), ...Object.keys(saidasPorData)])].sort();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Entradas',
        data: labels.map(data => entradasPorData[data] || 0),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        tension: 0.3,
      },
      {
        label: 'Saídas',
        data: labels.map(data => saidasPorData[data] || 0),
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite controlar a altura
    plugins: {
      title: {
        display: true,
        text: 'Comparativo de Entradas e Saídas ao Longo do Tempo',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor (R$)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Data',
        },
      },
    },
  };

  return (
    <div className="chart-container full-width">
      <h2>Comparativo Entradas vs Saídas</h2>
      <div style={{ height: '400px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default ComparativoEntradasSaidasChart;
