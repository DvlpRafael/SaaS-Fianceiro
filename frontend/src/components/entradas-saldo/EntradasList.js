import React from 'react';
import styles from './EntradasList.module.css'; // Crie este arquivo

function EntradasList({ entradas }) {
    return (
        // O componente EntradasList já estará dentro de um cardBase no Dashboard
        // Então, este container é para o conteúdo interno da lista de entradas.
        <div className={styles.listContentWrapper}>
            {/* O h2 será fornecido pelo Dashboard.js */}
            {/* <h2>Entradas</h2> */}
            {entradas && entradas.length > 0 ? (
                <div className={styles.tableWrapper}> {/* Para rolagem horizontal da tabela */}
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
                            {entradas.map(entrada => (
                                <tr key={entrada._id}>
                                    <td>{entrada.descricao}</td>
                                    <td className={styles.valorPositivo}>R$ {entrada.valor.toFixed(2).replace('.', ',')}</td>
                                    <td>{new Date(entrada.data).toLocaleDateString()}</td>
                                    <td>{entrada.categoria || 'Sem Categoria'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Nenhuma entrada registrada.</p>
            )}
        </div>
    );
}

export default EntradasList;