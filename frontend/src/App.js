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

function App() {
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [dre, setDre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = 'https://backend-gzri.onrender.com/api';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const entradasResponse = await fetch(`${apiUrl}/entradas`);
            const entradasData = await entradasResponse.json();
            setEntradas(entradasData);

            const saidasResponse = await fetch(`${apiUrl}/saidas`);
            const saidasData = await saidasResponse.json();
            setSaidas(saidasData);

            const estoqueResponse = await fetch(`${apiUrl}/estoque`);
            const estoqueData = await estoqueResponse.json();
            setEstoque(estoqueData);

            const dreResponse = await fetch(`${apiUrl}/relatorios/dre`);
            const dreData = await dreResponse.json();
            setDre(dreData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard entradas={entradas} saidas={saidas} estoque={estoque} dre={dre} />} />
                        <Route path="/adicionar-entrada" element={<AdicionarEntrada />} />
                        <Route path="/adicionar-saida" element={<AdicionarSaida />} />
                        <Route path="/adicionar-estoque" element={<AdicionarEstoque />} />
                        <Route path="/estoque" element={<ListaEstoque estoque={estoque} />} />
                        <Route path="/editar-estoque/:id" element={<EditarEstoque />} />
                        {/* Outras rotas aqui */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;