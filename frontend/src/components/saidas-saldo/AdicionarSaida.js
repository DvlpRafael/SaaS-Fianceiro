import React, { useState } from 'react';
import styles from './AdicionarSaida.module.css';

function AdicionarSaida() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const novaSaida = { descricao, valor: parseFloat(valor), data, categoria };

        try {
            const response = await fetch('https://https://backend-gzri.onrender.com/api/saidas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaSaida),
            });

            if (response.ok) {
                console.log('Saída adicionada com sucesso!');
                // Limpar o formulário após o sucesso
                setDescricao('');
                setValor('');
                setData('');
                setCategoria('');
                // TODO: Atualizar a lista de saídas no Dashboard
            } else {
                console.error('Erro ao adicionar saída:', response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Adicionar Saída</h1>
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
                <button type="submit" className={styles.button}>Salvar Saída</button>
            </form>
        </div>
    );
}

export default AdicionarSaida;