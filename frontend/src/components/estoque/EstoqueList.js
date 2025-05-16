import React from 'react';
import styles from './EstoqueList.module.css';

function EstoqueList({ estoque }) {
    return (
        <section className={`section ${styles.estoque}`}>
            <h2>Estoque</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantidade</th>
                        <th>Preço de Venda</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map(item => (
                        <tr key={item._id}>
                            <td>{item.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>R$ {item.precoVenda.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default EstoqueList;