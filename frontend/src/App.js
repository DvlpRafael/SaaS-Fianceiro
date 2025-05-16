import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/dashboard/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import AdicionarEntrada from './components/entradas-saldo/AdicionarEntrada';
import AdicionarSaida from './components/saidas-saldo/AdicionarSaida';
import AdicionarEstoque from './components/estoque/AdicionarEstoque';
import ListaEstoque from './components/estoque/ListaEstoque';
import EditarEstoque from './components/estoque/EditarEstoque';
import HomePage from './components/home/HomePage';
import Login from './components/login/Login';
import Register from './components/login/Register';

function App() {
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [dre, setDre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const apiUrl = 'http://localhost:5000/api'; // URL da API para os dados

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
            fetchDataWithToken(token);
        } else {
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, []);

    const fetchDataWithToken = async (token) => {
        setLoading(true);
        setError(null);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        try {
            const entradasResponse = await fetch(`${apiUrl}/entradas`, { headers });
            const entradasData = await entradasResponse.json();
            setEntradas(entradasData);

            const saidasResponse = await fetch(`${apiUrl}/saidas`, { headers });
            const saidasData = await saidasResponse.json();
            setSaidas(saidasData);

            const estoqueResponse = await fetch(`${apiUrl}/estoque`, { headers });
            const estoqueData = await estoqueResponse.json();
            setEstoque(estoqueData);

            const dreResponse = await fetch(`${apiUrl}/relatorios/dre`, { headers });
            const dreData = await dreResponse.json();
            setDre(dreData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        fetchDataWithToken(token);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Carregando dados...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error}</div>;
    }

    return (
        <Router>
            <div className="app-layout">
                {isAuthenticated && <Sidebar onLogout={handleLogout} />}
                <div className="main-content" style={{ marginLeft: isAuthenticated ? '250px' : '0' }}>
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Dashboard entradas={entradas} saidas={saidas} estoque={estoque} dre={dre} /> : <HomePage />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
                        <Route path="/register" element={<Register isAuthenticated={isAuthenticated} />} />
                        {isAuthenticated && (
                            <>
                                <Route path="/adicionar-entrada" element={<AdicionarEntrada />} />
                                <Route path="/adicionar-saida" element={<AdicionarSaida />} />
                                <Route path="/adicionar-estoque" element={<AdicionarEstoque />} />
                                <Route path="/estoque" element={<ListaEstoque estoque={estoque} />} />
                                <Route path="/editar-estoque/:id" element={<EditarEstoque />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;