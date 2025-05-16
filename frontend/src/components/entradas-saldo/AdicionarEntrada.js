import React, { useState } from 'react';
import styles from './AdicionarEntrada.module.css';

function AdicionarEntrada() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const novaEntrada = { descricao, valor: parseFloat(valor), data, categoria };

        try {
            const response = await fetch('http://localhost:5000/api/entradas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaEntrada),
            });

            if (response.ok) {
                console.log('Entrada adicionada com sucesso!');
                // Limpar o formulário após o sucesso
                setDescricao('');
                setValor('');
                setData('');
                setCategoria('');
                // TODO: Atualizar a lista de entradas no Dashboard
            } else {
                console.error('Erro ao adicionar entrada:', response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Adicionar Entrada</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="descricao">Descrição:</label>
                    <input
                        type="text"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="valor">Valor:</label>
                    <input
                        type="number"
                        id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="data">Data:</label>
                    <input
                        type="date"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="categoria">Categoria:</label>
                    <input
                        type="text"
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Salvar Entrada</button>
            </form>
        </div>
    );
}

export default AdicionarEntrada;