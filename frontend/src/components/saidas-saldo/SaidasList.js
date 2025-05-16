import React from 'react';
import styles from './SaidasList.module.css';

function SaidasList({ saidas }) {
    return (
        <section className={`section ${styles.saidas}`}>
            <h2>Saídas</h2>
            <table>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                    {saidas.map(saida => (
                        <tr key={saida._id}>
                            <td>{saida.descricao}</td>
                            <td className={styles.valorNegativo}>R$ {saida.valor.toFixed(2)}</td>
                            <td>{new Date(saida.data).toLocaleDateString()}</td>
                            <td>{saida.categoria || 'Sem Categoria'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default SaidasList;