import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './EntradasSaidasChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function EntradasSaidasChart({ entradas, saidas }) {
    const totalEntradas = entradas.reduce((sum, entrada) => sum + entrada.valor, 0);
    const totalSaidas = saidas.reduce((sum, saida) => sum + saida.valor, 0);

    const data = {
        labels: ['Entradas', 'Saídas'],
        datasets: [
            {
                label: 'Total',
                data: [totalEntradas, totalSaidas],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
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
                text: 'Total de Entradas vs Saídas',
            },
        },
    };

    return (
        <section className={`section ${styles.chartContainer}`}>
            <h2>Gráfico de Entradas e Saídas</h2>
            <Pie data={data} options={options} />
        </section>
    );
}

export default EntradasSaidasChart;