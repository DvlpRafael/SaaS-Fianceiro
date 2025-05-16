import React, { useState, useEffect } from 'react';
import styles from './ListaEstoque.module.css';
import { Link } from 'react-router-dom';

function ListaEstoque() {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEstoque = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://backend-gzri.onrender.com/api/estoque');
            if (response.ok) {
                const data = await response.json();
                setEstoque(data);
            } else {
                setError('Erro ao carregar o estoque.');
            }
        } catch (err) {
            setError('Falha ao conectar com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstoque();
    }, []);

    const handleDeleteItem = async (id) => {
        if (window.confirm('Tem certeza que deseja remover este item?')) {
            try {
                const response = await fetch(`https://backend-gzri.onrender.com/api/estoque/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Item removido com sucesso!');
                    // Atualizar a lista de estoque após a remoção
                    fetchEstoque();
                } else {
                    console.error('Erro ao remover o item:', response.status);
                }
            } catch (error) {
                console.error('Erro ao enviar solicitação de exclusão:', error);
            }
        }
    };

    if (loading) {
        return <div>Carregando estoque...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Lista de Estoque</h1>
            {estoque.length === 0 ? (
                <p>Nenhum item no estoque.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço de Venda</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoque.map(item => (
                            <tr key={item._id}>
                                <td>{item.nome}</td>
                                <td>{item.quantidade}</td>
                                <td>R$ {item.precoVenda.toFixed(2)}</td>
                                <td>
                                    <Link to={`/editar-estoque/${item._id}`} className={styles.editButton}>Editar</Link>
                                    <button onClick={() => handleDeleteItem(item._id)} className={styles.deleteButton}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListaEstoque;