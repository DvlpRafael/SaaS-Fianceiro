import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleDashboardClick = () => {
        navigate('/'); // Navega para a rota principal (onde o Dashboard está)
    };

    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Gerencie suas Finanças com Inteligência</h1>
                    <p className="subtitle">Controle total do seu fluxo de caixa, conciliação bancária eficiente e relatórios poderosos ao seu alcance.</p>
                    <div className="hero-buttons">
                        <Link to="/register" className="primary-button hero-button">Cadastre-se Grátis</Link>
                        <Link to="/planos" className="secondary-button hero-button">Ver Planos</Link>
                        {!isAuthenticated && (
                            <Link to="/login" className="tertiary-button hero-button">Já tenho conta? Login</Link>
                        )}
                        {isAuthenticated && (
                            <button onClick={handleDashboardClick} className="dashboard-button hero-button">Ir para o Dashboard</button>
                        )}
                    </div>
                </div>
            </header>

            <section className="features-section">
                <h2>Recursos Poderosos para o seu Negócio</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Conciliação Bancária</h3>
                        <p>Mantenha suas contas bancárias sempre atualizadas e sem erros.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Fluxo de Caixa</h3>
                        <p>Visualize suas entradas e saídas de forma clara e tome decisões financeiras assertivas.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Demonstrativo de Resultados (DRE)</h3>
                        <p>Analise a performance financeira do seu negócio com relatórios DRE detalhados.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Gráficos e Relatórios</h3>
                        <p>Transforme dados em insights visuais e relatórios personalizáveis.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Suporte Dedicado</h3>
                        <p>Conte com nossa equipe de suporte para te ajudar em cada etapa.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Gerenciamento de Estoque</h3>
                        <p>Controle seu estoque de forma eficiente, evitando perdas e otimizando seus recursos.</p>
                    </div>
                </div>
            </section>

            <section className="plans-section">
                <h2>Nossos Planos Mensais</h2>
                <p className="plans-intro">Escolha o plano que melhor se adapta às suas necessidades e comece a gerenciar suas finanças hoje mesmo.</p>
                <div className="plans-grid">
                    <div className="plan-card">
                        <h3>Básico</h3>
                        <p className="price">R$ XX/mês</p>
                        <ul>
                            <li>Fluxo de Caixa</li>
                            <li>Relatórios Simples</li>
                            <li>Suporte Básico</li>
                        </ul>
                        <Link to="/register" className="plan-button">Começar</Link>
                    </div>
                    <div className="plan-card popular">
                        <h3>Padrão</h3>
                        <p className="price">R$ YY/mês</p>
                        <ul>
                            <li>Todos os recursos do Básico</li>
                            <li>Conciliação Bancária</li>
                            <li>DRE</li>
                            <li>Suporte Prioritário</li>
                        </ul>
                        <Link to="/register" className="plan-button">Começar</Link>
                    </div>
                    <div className="plan-card">
                        <h3>Premium</h3>
                        <p className="price">R$ ZZ/mês</p>
                        <ul>
                            <li>Todos os recursos do Padrão</li>
                            <li>Gráficos Avançados</li>
                            <li>Gerenciamento de Estoque</li>
                            <li>Suporte VIP</li>
                        </ul>
                        <Link to="/register" className="plan-button">Começar</Link>
                    </div>
                </div>
            </section>

            <footer className="home-footer">
                <p>&copy; {new Date().getFullYear()} Seu SaaS Financeiro. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default HomePage;