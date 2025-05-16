import React from 'react';
import styles from './ResumoFinanceiro.module.css';
import { FaArrowUp, FaArrowDown, FaMoneyBillWave, FaChartLine } from 'react-icons/fa'; // Importar ícones

function ResumoFinanceiro({ entradas, saidas, dre }) {
    const totalEntradas = entradas.reduce((sum, entrada) => sum + entrada.valor, 0);
    const totalSaidas = saidas.reduce((sum, saida) => sum + saida.valor, 0);
    const saldoAtual = totalEntradas - totalSaidas;

    return (
        <section className={styles.resumo}>
            <h2>Resumo Financeiro</h2>
            <div className={styles.metricas}>
                <div className={styles.card}>
                    <div className={styles.icone}>
                        <FaArrowUp className={styles.iconePositivo} />
                    </div>
                    <h3>Total de Entradas</h3>
                    <p className={styles.valorPositivo}>R$ {totalEntradas.toFixed(2)}</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.icone}>
                        <FaArrowDown className={styles.iconeNegativo} />
                    </div>
                    <h3>Total de Saídas</h3>
                    <p className={styles.valorNegativo}>R$ {totalSaidas.toFixed(2)}</p>
                </div>
                <div className={styles.card}>
                    <div className={styles.icone}>
                        <FaMoneyBillWave className={styles.iconeSaldo} />
                    </div>
                    <h3>Saldo Atual</h3>
                    <p className={saldoAtual >= 0 ? styles.valorPositivo : styles.valorNegativo}>
                        R$ {saldoAtual.toFixed(2)}
                    </p>
                </div>
                {dre && (
                    <div className={styles.card}>
                        <div className={styles.icone}>
                            <FaChartLine className={styles.iconeLucro} />
                        </div>
                        <h3>Lucro Líquido</h3>
                        <p className={styles.lucroLiquido}>R$ {dre.lucroLiquido.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ResumoFinanceiro;