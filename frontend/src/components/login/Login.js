import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './Login.css';

function Login({ onLogin, isAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = 'https://https://backend-gzri.onrender.com/api'; // Use a mesma apiUrl do App.js

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redireciona para o dashboard se já estiver autenticado
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                onLogin(data.token); // Chama a função onLogin passada pelo App.js
                navigate('/'); // Redireciona para a página principal (Dashboard)
            } else {
                setError(data.message || 'Falha ao fazer login. Verifique suas credenciais.');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Entrar</button>
                <p className="register-link">
                    Não tem uma conta? <Link to="/register">Registre-se</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;