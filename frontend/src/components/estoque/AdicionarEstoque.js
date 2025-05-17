import React, { useState } from 'react';
import styles from './AdicionarEstoque.module.css';
import { apiUrl } from '../../config'; // Importe a apiUrl

function AdicionarEstoque() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [precoVenda, setPrecoVenda] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const novoItemEstoque = { 
            nome, 
            quantidade: parseInt(quantidade), 
            precoVenda: parseFloat(precoVenda) 
        };

        try {
            // Use a apiUrl importada para construir a URL da requisição
            const response = await fetch(`${apiUrl}/estoque`, { // Linha 16 corrigida
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Considere adicionar o token de autenticação aqui se necessário
                    // 'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify(novoItemEstoque),
            });

            if (response.ok) {
                console.log('Item adicionado ao estoque com sucesso!');
                // Limpar o formulário
                setNome('');
                setQuantidade('');
                setPrecoVenda('');
                // TODO: Atualizar a lista de estoque no Dashboard/página de estoque
            } else {
                const errorData = await response.json();
                console.error('Erro ao adicionar item ao estoque:', response.status, errorData.message);
                // Adicione feedback para o usuário aqui, se desejar
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            // Adicione feedback para o usuário aqui, se desejar
        }
    };

    return (
        <div className={styles.container}>
            <h1>Adicionar Item ao Estoque</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* ... restante do seu formulário ... */}
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
                <button type="submit" className={styles.button}>Adicionar ao Estoque</button>
            </form>
        </div>
    );
}

export default AdicionarEstoque;