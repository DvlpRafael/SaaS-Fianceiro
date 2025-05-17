import React, { useState, useEffect } from 'react';
import styles from './ListaEstoque.module.css';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../config';

function ListaEstoque() {
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Token é gerenciado no App.js e as rotas são protegidas.
    // Se precisar do token aqui para alguma lógica específica, pode buscar do localStorage.
    const token = localStorage.getItem('authToken'); 

    const fetchEstoque = async () => {
        if (!token) {
            setLoading(false);
            setEstoque([]);
            setError("Autenticação necessária para visualizar o estoque.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const headers = { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const response = await fetch(`${apiUrl}/estoque`, { headers });
            if (response.ok) {
                const data = await response.json();
                setEstoque(data);
            } else {
                const errorText = await response.text();
                setError(`Erro ao carregar o estoque: ${response.status} - ${errorText}`);
                console.error('Erro ao carregar estoque:', response.status, errorText);
            }
        } catch (err) {
            setError('Falha na conexão ao carregar estoque.');
            console.error('Falha na conexão ao carregar estoque:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstoque();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]); // Adicionar token como dependência para refetch se mudar (embora App.js controle mais isso)

    const handleDeleteItem = async (id) => {
        if (!token) {
            alert("Autenticação necessária para remover itens.");
            return;
        }
        if (window.confirm('Tem certeza que deseja remover este item?')) {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await fetch(`${apiUrl}/estoque/${id}`, {
                    method: 'DELETE',
                    headers,
                });
                if (response.ok) {
                    console.log('Item removido com sucesso!');
                    fetchEstoque(); 
                } else {
                    const errorText = await response.text();
                    console.error('Erro ao remover o item:', response.status, errorText); 
                    alert(`Erro ao remover o item: ${response.status} - ${errorText || 'Tente novamente.'}`);
                }
            } catch (err) {
                console.error('Erro ao enviar solicitação de exclusão:', err);
                alert('Erro ao enviar solicitação de exclusão.');
            }
        }
    };

    if (loading) return <div className={styles.loadingMessage}>Carregando estoque...</div>; // Adicionar classe para estilizar
    if (error) return <div className={styles.errorMessage}>Erro: {error}</div>; // Adicionar classe

    return (
        // .container é o flex container principal deste componente
        // O padding externo vem do .cardBase no Dashboard.module.css
        <div className={styles.container}> 
            <div className={styles.headerContainer}>
                <h1>Lista de Estoque</h1>
                <Link to="/adicionar-estoque" className={styles.addButton}>
                    Adicionar Novo Item
                </Link>
            </div>
            
            {estoque.length === 0 ? (
                <p className={styles.noItemsMessage}>Nenhum item no estoque.</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th>Preço de Venda</th>
                                <th className={styles.actionsCell}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estoque.map(item => (
                                <tr key={item._id}>
                                    <td>{item.nome}</td>
                                    <td>{item.quantidade}</td>
                                    <td>R$ {item.precoVenda ? item.precoVenda.toFixed(2).replace('.', ',') : '0,00'}</td>
                                    <td className={styles.actionsCell}>
                                        <Link to={`/editar-estoque/${item._id}`} className={styles.editButton}>Editar</Link>
                                        <button onClick={() => handleDeleteItem(item._id)} className={styles.deleteButton}>Remover</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListaEstoque;