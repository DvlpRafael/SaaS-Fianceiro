import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditarEstoque.module.css';

function EditarEstoque() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [precoVenda, setPrecoVenda] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemEstoque = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https:/https://backend-gzri.onrender.com/api/estoque/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setNome(data.nome);
                    setQuantidade(data.quantidade);
                    setPrecoVenda(data.precoVenda);
                } else {
                    setError('Erro ao carregar os detalhes do item.');
                }
            } catch (err) {
                setError('Falha ao conectar com o servidor.');
            } finally {
                setLoading(false);
            }
        };

        fetchItemEstoque();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const itemAtualizado = { nome, quantidade: parseInt(quantidade), precoVenda: parseFloat(precoVenda) };

        try {
            const response = await fetch(`https://https://backend-gzri.onrender.com/api/estoque/${id}`, {
                method: 'PUT', // Ou PATCH, dependendo da sua API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemAtualizado),
            });

            if (response.ok) {
                console.log('Item do estoque atualizado com sucesso!');
                navigate('/estoque'); // Redirecionar para a lista de estoque após a edição
            } else {
                console.error('Erro ao atualizar o item do estoque:', response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    if (loading) {
        return <div>Carregando detalhes do item...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Editar Item do Estoque</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome do Item:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="number"
                        id="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                        min="0"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="precoVenda">Preço de Venda:</label>
                    <input
                        type="number"
                        id="precoVenda"
                        value={precoVenda}
                        onChange={(e) => setPrecoVenda(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>
                <button type="submit" className={styles.button}>Salvar Alterações</button>
                <button type="button" onClick={() => navigate('/estoque')} className={styles.cancelButton}>Cancelar</button>
            </form>
        </div>
    );
}

export default EditarEstoque;