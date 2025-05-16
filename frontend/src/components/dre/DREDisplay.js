import React from 'react';
import styles from './DREDisplay.module.css';

function DREDisplay({ dre }) {
    if (!dre) {
        return <p>Carregando DRE...</p>;
    }

    return (
        <section className={`section ${styles.dre}`}>
            <h2>Demonstração do Resultado do Exercício (DRE)</h2>
            <p className={styles.periodo}><strong>Período:</strong> {dre.periodo}</p>
            <table className={styles.dreTable}>
                <tbody>
                    <tr>
                        <th>Receita Bruta</th>
                        <td className={styles.valorPositivo}>R$ {dre.receitaBruta.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Custo dos Serviços Prestados</th>
                        <td className={styles.valorNegativo}>R$ {dre.custoDosServicosPrestados.toFixed(2)}</td>
                    </tr>
                    <tr className={styles.linhaDestaque}>
                        <th>Lucro Bruto</th>
                        <td>R$ {dre.lucroBruto.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Despesas Operacionais</th>
                        <td className={styles.valorNegativo}>R$ {dre.despesasOperacionais.toFixed(2)}</td>
                    </tr>
                    <tr className={styles.linhaDestaque}>
                        <th>LAIR (Lucro Antes do IR)</th>
                        <td>R$ {dre.lair.toFixed(2)}</td>
                    </tr>
                    <tr className={styles.linhaDestaque}>
                        <th>Lucro Líquido</th>
                        <td className={styles.lucroLiquido}>R$ {dre.lucroLiquido.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            {dre.detalhesPorCategoria && (
                <div className={styles.detalhesCategoria}>
                    <h3>Detalhes por Categoria</h3>
                    <div className={styles.categorias}>
                        <div>
                            <h4>Receitas</h4>
                            <ul>
                                {Object.entries(dre.detalhesPorCategoria.receitas).map(([categoria, valor]) => (
                                    <li key={categoria}>
                                        <span>{categoria}:</span> <span className={styles.valorPositivo}>R$ {valor.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4>Custos e Despesas</h4>
                            <ul>
                                {Object.entries(dre.detalhesPorCategoria.custos).map(([categoria, valor]) => (
                                    <li key={categoria}>
                                        <span>{categoria}:</span> <span className={styles.valorNegativo}>R$ {valor.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default DREDisplay;