import React from 'react';
import styles from './EntradasList.module.css';

function EntradasList({ entradas }) {
    return (
        <section className={`section ${styles.entradas}`}>
            <h2>Entradas</h2>
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
                            <td className={styles.valorPositivo}>R$ {entrada.valor.toFixed(2)}</td>
                            <td>{new Date(entrada.data).toLocaleDateString()}</td>
                            <td>{entrada.categoria || 'Sem Categoria'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default EntradasList;