import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './ReceitasPorCategoriaChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ReceitasPorCategoriaChart({ entradas }) {
    const categorias = {};
    entradas.forEach(entrada => {
        const categoria = entrada.categoria || 'Sem Categoria';
        categorias[categoria] = (categorias[categoria] || 0) + entrada.valor;
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
                text: 'Receitas por Categoria',
            },
        },
    };

    return (
        <section className={`section ${styles.chartContainer}`}>
            <h2>Gráfico de Receitas por Categoria</h2>
            <Pie data={data} options={options} />
        </section>
    );
}

export default ReceitasPorCategoriaChart;