import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import styles from './EntradasSaidasChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function EntradasSaidasChart({ entradas, saidas }) {
    const totalEntradas = entradas.reduce((sum, entrada) => sum + entrada.valor, 0);
    const totalSaidas = saidas.reduce((sum, saida) => sum + saida.valor, 0);

    const data = {
        labels: ['Entradas', 'Saídas'],
        datasets: [
            {
                label: 'Total',
                data: [totalEntradas, totalSaidas],
                backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
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
                text: 'Total de Entradas vs Saídas', // Este título será do Chart.js
                padding: {
                    top: 5, // Menos padding se o h2 for removido
                    bottom: 15 // Mais padding inferior para a legenda
                },
                font: {
                    size: 14,
                    weight: '500' // Peso normal para o título do gráfico
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
        // A classe .chartContainer é do CSS Module, o App.css pode estilizar .chart-container globalmente
        <section className={`${styles.chartContainer} chart-container`}> 
            {/* O h2 aqui pode ser removido se o título do Chart.js for suficiente */}
            {/* <h2>Gráfico de Entradas e Saídas</h2> */}
            <div className={styles.canvasWrapper}>
                <Pie data={data} options={options} />
            </div>
        </section>
    );
}

export default EntradasSaidasChart;