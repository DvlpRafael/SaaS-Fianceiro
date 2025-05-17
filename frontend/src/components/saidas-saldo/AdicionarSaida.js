import React, { useState } from 'react';
import styles from './AdicionarSaida.module.css';
import { apiUrl } from '../../config'; // IMPORTAR apiUrl

function AdicionarSaida() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState('');
    const [categoria, setCategoria] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!descricao || !valor || !data) {
            setErrorMessage('Descrição, valor e data são obrigatórios.');
            return;
        }

        const novaSaida = { 
            descricao, 
            valor: parseFloat(valor), 
            data, 
            categoria: categoria || undefined // Enviar undefined se categoria for vazia
        };
        const token = localStorage.getItem('authToken');

        try {
            const response = await fetch(`${apiUrl}/saidas`, { // USAR apiUrl CORRIGIDA
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Adicionar token de autenticação
                },
                body: JSON.stringify(novaSaida),
            });

            if (response.ok) {
                const saidaAdicionada = await response.json();
                console.log('Saída adicionada com sucesso!', saidaAdicionada);
                setSuccessMessage('Saída adicionada com sucesso!');
                // Limpar o formulário após o sucesso
                setDescricao('');
                setValor('');
                setData('');
                setCategoria('');
                // TODO: Atualizar a lista de saídas no Dashboard ou redirecionar
                // Ex: props.onSaidaAdicionada(saidaAdicionada);
            } else {
                const errorData = await response.json();
                console.error('Erro ao adicionar saída:', response.status, errorData.message);
                setErrorMessage(errorData.message || `Erro ao adicionar saída: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            setErrorMessage('Falha na comunicação com o servidor ao adicionar saída.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Adicionar Saída</h1>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
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
                        min="0.01" // Saídas geralmente têm um valor mínimo
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
                    <label htmlFor="categoria">Categoria (Opcional):</label>
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