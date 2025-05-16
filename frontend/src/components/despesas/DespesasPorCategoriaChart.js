import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './DespesasPorCategoriaChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function DespesasPorCategoriaChart({ saidas }) {
    const categorias = {};
    saidas.forEach(saida => {
        const categoria = saida.categoria || 'Sem Categoria';
        categorias[categoria] = (categorias[categoria] || 0) + saida.valor;
    });

    const labels = Object.keys(categorias);
    const dataValues = Object.values(categorias);
    const backgroundColors = labels.map((_, index) => `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`);
    const borderColors = backgroundColors.map(color => color.replace('0.6', '1'));

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Total por Categoria',
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Despesas por Categoria',
            },
        },
    };

    return (
        <section className={`section ${styles.chartContainer}`}>
            <h2>Gráfico de Despesas por Categoria</h2>
            <Pie data={data} options={options} />
        </section>
    );
}

export default DespesasPorCategoriaChart;