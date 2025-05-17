import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'; // Link adicionado aqui
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
import { apiUrl } from './config';
import { FaBars, FaTimes } from 'react-icons/fa';

// Componente de Rota Protegida
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Salva a rota atual para redirecionar após o login, se desejado
        // sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    const [entradas, setEntradas] = useState([]);
    const [saidas, setSaidas] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [dre, setDre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken')); // Inicializa baseado no token
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const fetchDataWithToken = async (token) => {
        setLoading(true);
        setError(null);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        try {
            const [
                entradasResponse,
                saidasResponse,
                estoqueResponse, // Mantido mesmo que ListaEstoque busque seus dados, para o Dashboard
                dreResponse
            ] = await Promise.all([
                fetch(`${apiUrl}/entradas`, { headers }),
                fetch(`${apiUrl}/saidas`, { headers }),
                fetch(`${apiUrl}/estoque`, { headers }), // Para o Dashboard
                fetch(`${apiUrl}/relatorios/dre`, { headers })
            ]);

            const processResponse = async (response, name) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`Erro ao buscar ${name}:`, response.status, errorText);
                    throw new Error(`${name}: ${response.status} ${response.statusText} - ${errorText}`);
                }
                return response.json();
            };

            const entradasData = await processResponse(entradasResponse, 'Entradas');
            setEntradas(entradasData);

            const saidasData = await processResponse(saidasResponse, 'Saídas');
            setSaidas(saidasData);

            const estoqueData = await processResponse(estoqueResponse, 'Estoque (Dashboard)');
            setEstoque(estoqueData);

            const dreData = await processResponse(dreResponse, 'DRE');
            setDre(dreData);

        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setError(err.message || "Erro ao carregar os dados. Verifique sua conexão ou tente mais tarde.");
            if (err.message.includes("401") || err.message.includes("403") || err.message.toLowerCase().includes('unauthorized')) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (!isAuthenticated) setIsAuthenticated(true); // Sincroniza estado se token existe mas estado é false
            fetchDataWithToken(token);
        } else {
            if (isAuthenticated) setIsAuthenticated(false); // Sincroniza estado se não há token
            setLoading(false);
            setEntradas([]);
            setSaidas([]);
            setEstoque([]);
            setDre(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]); // Agora depende de isAuthenticated

    const handleLogin = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true); 
        // O useEffect acima irá disparar fetchDataWithToken
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setIsMobileSidebarOpen(false);
        setEntradas([]);
        setSaidas([]);
        setEstoque([]);
        setDre(null);
        // O Navigate no Router cuidará do redirecionamento
    };

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    // Mensagem de carregamento enquanto autenticado e buscando dados
    if (loading && isAuthenticated) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando dados...</div>;
    }
    
    // Se houver um erro GERAL e não estiver autenticado (após tentativa de carregar ou estado inicial)
    // A linha 132 estava aqui:
    if (error && !loading && !isAuthenticated) {
         return <div style={{ padding: '20px', textAlign: 'center' }}>Erro ao inicializar: {error} <Link to="/login">Tentar Login</Link></div>;
    }


    return (
        <Router>
            <div className="app-layout">
                {isAuthenticated && (
                    <>
                        <button 
                            className="mobile-menu-button" 
                            onClick={toggleMobileSidebar}
                            aria-label={isMobileSidebarOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={isMobileSidebarOpen}
                        >
                            {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <Sidebar 
                            onLogout={handleLogout} 
                            isOpen={isMobileSidebarOpen}
                            closeSidebar={() => setIsMobileSidebarOpen(false)}
                        />
                    </>
                )}
                <div 
                    className={`main-content ${isAuthenticated ? 'sidebar-present' : 'no-sidebar'}`}
                    style={{ marginLeft: isAuthenticated && window.innerWidth > 768 && !isMobileSidebarOpen ? '250px' : '0' }}
                    onClick={() => { if (isMobileSidebarOpen && window.innerWidth <= 768) setIsMobileSidebarOpen(false);}}
                >
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                isAuthenticated ? (
                                    <Dashboard entradas={entradas} saidas={saidas} estoque={estoque} dre={dre} />
                                ) : (
                                    <Navigate to="/home" replace /> // Redireciona para /home se não autenticado
                                )
                            } 
                        />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} />
                        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
                        
                        <Route path="/adicionar-entrada" element={<ProtectedRoute><AdicionarEntrada /></ProtectedRoute>} />
                        <Route path="/adicionar-saida" element={<ProtectedRoute><AdicionarSaida /></ProtectedRoute>} />
                        <Route path="/adicionar-estoque" element={<ProtectedRoute><AdicionarEstoque /></ProtectedRoute>} />
                        <Route path="/estoque" element={<ProtectedRoute><ListaEstoque /></ProtectedRoute>} />
                        <Route path="/editar-estoque/:id" element={<ProtectedRoute><EditarEstoque /></ProtectedRoute>} />
                        
                        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/home"} replace />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;