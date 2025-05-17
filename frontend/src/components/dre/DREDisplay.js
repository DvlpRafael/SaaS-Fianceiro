import React from 'react';
import styles from './DREDisplay.module.css';

function DREDisplay({ dre }) {
    if (!dre) {
        // Adicionar uma mensagem ou componente de carregamento mais robusto se desejar
        return <div className={styles.loadingContainer}><p className={styles.loading}>Carregando DRE...</p></div>;
    }

    const formatCurrency = (value) => {
        if (typeof value !== 'number') {
            return 'R$ 0,00'; // Ou algum placeholder
        }
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    };

    return (
        // A classe .dre é o contêiner principal do conteúdo do DRE
        <section className={styles.dre}> 
            <p className={styles.periodo}><strong>Período:</strong> {dre.periodo || 'N/A'}</p>
            
            <div className={styles.dreTableWrapper}>
                <table className={styles.dreTable}>
                    <tbody>
                        <tr>
                            <th>Receita Bruta</th>
                            <td className={styles.valorPositivo}>{formatCurrency(dre.receitaBruta)}</td>
                        </tr>
                        <tr>
                            <th>Custo dos Serviços Prestados</th>
                            <td className={styles.valorNegativo}>{formatCurrency(dre.custoDosServicosPrestados)}</td>
                        </tr>
                        <tr className={styles.linhaDestaque}>
                            <th>Lucro Bruto</th>
                            <td>{formatCurrency(dre.lucroBruto)}</td>
                        </tr>
                        <tr>
                            <th>Despesas Operacionais</th>
                            <td className={styles.valorNegativo}>{formatCurrency(dre.despesasOperacionais)}</td>
                        </tr>
                        <tr className={styles.linhaDestaque}>
                            <th>LAIR (Lucro Antes do IR)</th>
                            <td>{formatCurrency(dre.lair)}</td>
                        </tr>
                        <tr className={styles.linhaDestaque}>
                            <th>Lucro Líquido</th>
                            <td className={styles.lucroLiquido}>{formatCurrency(dre.lucroLiquido)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {dre.detalhesPorCategoria && (
                <div className={styles.detalhesCategoria}>
                    <h3>Detalhes por Categoria</h3>
                    <div className={styles.categorias}>
                        <div>
                            <h4>Receitas</h4>
                            <ul>
                                {Object.entries(dre.detalhesPorCategoria.receitas || {}).map(([categoria, valor]) => (
                                    <li key={categoria}>
                                        <span>{categoria}:</span> <span className={styles.valorPositivo}>{formatCurrency(valor)}</span>
                                    </li>
                                ))}
                                {Object.keys(dre.detalhesPorCategoria.receitas || {}).length === 0 && <li>Nenhuma receita detalhada.</li>}
                            </ul>
                        </div>
                        <div>
                            <h4>Custos e Despesas</h4>
                            <ul>
                                {Object.entries(dre.detalhesPorCategoria.custos || {}).map(([categoria, valor]) => (
                                    <li key={categoria}>
                                        <span>{categoria}:</span> <span className={styles.valorNegativo}>{formatCurrency(valor)}</span>
                                    </li>
                                ))}
                                {Object.keys(dre.detalhesPorCategoria.custos || {}).length === 0 && <li>Nenhum custo/despesa detalhado.</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default DREDisplay;