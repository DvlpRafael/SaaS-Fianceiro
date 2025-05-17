import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import styles from './DespesasPorCategoriaChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function DespesasPorCategoriaChart({ saidas }) {
    const categorias = {};
    saidas.forEach(saida => {
        const categoria = saida.categoria || 'Sem Categoria';
        categorias[categoria] = (categorias[categoria] || 0) + saida.valor;
    });

    const labels = Object.keys(categorias);
    const dataValues = Object.values(categorias);

    const backgroundColorsBase = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(199, 199, 199, 0.7)',
        'rgba(83, 102, 255, 0.7)',
        'rgba(102, 255, 83, 0.7)',
        'rgba(255, 83, 102, 0.7)',
    ];
    const borderColorsBase = backgroundColorsBase.map(color => color.replace('0.7', '1'));

    const backgroundColors = labels.map((_, index) => backgroundColorsBase[index % backgroundColorsBase.length]);
    const borderColors = labels.map((_, index) => borderColorsBase[index % borderColorsBase.length]);


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
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                 labels: {
                    padding: 20,
                    boxWidth: 12,
                    font: {
                        size: 11
                    }
                }
            },
            title: {
                display: true,
                text: 'Despesas por Categoria', // Título do Chart.js
                 padding: {
                    top: 5,
                    bottom: 15
                },
                font: {
                    size: 14,
                    weight: '500'
                }
            },
            tooltip: {
                padding: 10,
                titleFont: {
                    size: 13
                },
                bodyFont: {
                    size: 12
                }
            }
        },
    };

    return (
        <section className={`${styles.chartContainer} chart-container`}>
            {/* O h2 aqui pode ser removido */}
            {/* <h2>Gráfico de Despesas por Categoria</h2> */}
            <div className={styles.canvasWrapper}>
                <Pie data={data} options={options} />
            </div>
        </section>
    );
}

export default DespesasPorCategoriaChart;