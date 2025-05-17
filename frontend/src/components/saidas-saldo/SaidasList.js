// frontend/src/components/saidas-saldo/SaidasList.js
import React from 'react';
import styles from './SaidasList.module.css';

function SaidasList({ saidas }) {
    return (
        <div className={styles.listContentWrapper}> {/* Wrapper para conteúdo da lista */}
            {/* <h2>Saídas Recentes</h2>  O título é colocado no Dashboard.js */}
            {saidas && saidas.length > 0 ? (
                <div className={styles.tableWrapper}> {/* Wrapper para a tabela, controla rolagem */}
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
                                    <td className={styles.valorNegativo}>R$ {saida.valor.toFixed(2).replace('.',',')}</td>
                                    <td>{new Date(saida.data).toLocaleDateString()}</td>
                                    <td>{saida.categoria || 'Sem Categoria'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nenhuma saída registrada.</p>
            )}
        </div>
    );
}

export default SaidasList;