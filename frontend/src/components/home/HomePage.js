import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import Navbar from '../layout/Navbar';
import heroBanner from '../../assets/img/fidash-hero-banner.jpg'; // Certifique-se que este caminho está correto
import { FaShieldAlt, FaChartLine, FaFileInvoiceDollar, FaCogs, FaHeadset, FaBoxes, FaStar, FaUserCircle } from 'react-icons/fa';

function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const handleDashboardClick = () => {
        navigate('/');
    };

    useEffect(() => {
        // Seleciona todos os elementos que queremos animar
        const elementsToAnimate = document.querySelectorAll(
            `.${styles.heroTitle}, .${styles.heroSubtitle}, .${styles.heroButtons}, .${styles.sectionTitle}, .${styles.sectionSubtitle}, .${styles.featureCard}, .${styles.planCard}, .${styles.testimonialCard}`
        );

        if (elementsToAnimate.length === 0) {
            console.warn("HomePage: Nenhum elemento encontrado para animar com IntersectionObserver.");
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                    // Opcional: parar de observar depois que o elemento se torna visível
                    // Isso pode melhorar um pouco a performance em páginas muito longas.
                    // observer.unobserve(entry.target);
                } else {
                    // Opcional: Remover a classe se quiser que a animação ocorra toda vez que o elemento
                    // sair e entrar novamente na viewport. Para a maioria dos casos, não é necessário.
                    // entry.target.classList.remove(styles.visible);
                }
            });
        }, {
            threshold: 0.1, // Começa a animação quando 10% do elemento está visível
            // rootMargin: "0px 0px -50px 0px" // Descomente e ajuste se quiser que a animação comece um pouco ANTES do elemento estar totalmente visível
        });

        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });

        // Cleanup: parar de observar os elementos quando o componente desmontar
        return () => {
            elementsToAnimate.forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []); // Array de dependências vazio garante que o useEffect rode apenas uma vez (montagem e desmontagem)

    const features = [
        { icon: <FaShieldAlt />, title: "Conciliação Bancária", description: "Mantenha suas contas sempre atualizadas e livres de erros com nossa conciliação automática." },
        { icon: <FaChartLine />, title: "Fluxo de Caixa Inteligente", description: "Visualize entradas e saídas de forma clara e tome decisões financeiras assertivas para o futuro." },
        { icon: <FaFileInvoiceDollar />, title: "DRE Descomplicado", description: "Analise a performance do seu negócio com Demonstrativos de Resultados detalhados e fáceis de entender." },
        { icon: <FaCogs />, title: "Relatórios Personalizáveis", description: "Transforme dados brutos em insights visuais e relatórios customizados para suas necessidades." },
        { icon: <FaBoxes />, title: "Gerenciamento de Estoque", description: "Controle seu estoque de forma eficiente, evitando perdas e otimizando seus recursos valiosos." },
        { icon: <FaHeadset />, title: "Suporte Dedicado", description: "Conte com nossa equipe de especialistas para te auxiliar em cada etapa da sua jornada financeira." },
    ];

    const testimonials = [
        {
            quote: "O FiDash transformou a maneira como gerenciamos as finanças da nossa startup. A clareza dos relatórios e a facilidade da conciliação bancária são incríveis!",
            name: "Ana Silva",
            title: "CEO, InovaTech Soluções",
            stars: 5,
            avatar: <FaUserCircle />
        },
        {
            quote: "Finalmente encontramos uma plataforma que entende as necessidades de um pequeno negócio. O fluxo de caixa inteligente nos deu uma nova perspectiva.",
            name: "Marcos Andrade",
            title: "Dono, Café Saboroso",
            stars: 5,
            avatar: <FaUserCircle />
        },
        {
            quote: "O suporte é ágil e o DRE ficou muito mais simples de acompanhar. Recomendo o FiDash para quem busca organização e controle financeiro eficiente.",
            name: "Juliana Costa",
            title: "Gerente Financeira, Art Criativa",
            stars: 4,
            avatar: <FaUserCircle />
        }
    ];

    return (
        <div className={styles.homePage}>
            <Navbar />
            <header
                className={styles.heroSection}
                style={{ backgroundImage: `url(${heroBanner})` }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    {/* Elementos do Hero agora são animados pelo IntersectionObserver */}
                    <h1 className={styles.heroTitle}>
                        FiDash: Transforme a Gestão Financeira do Seu Negócio.
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Inteligência e clareza para suas decisões financeiras. Controle seu fluxo de caixa, concilie suas contas e visualize o futuro da sua empresa com relatórios DRE poderosos. Tudo em um só lugar.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link to="/register" className={`${styles.heroButton} ${styles.primaryButton}`}>Crie sua Conta Grátis</Link>
                        <a href="#planos" className={`${styles.heroButton} ${styles.secondaryButton}`} onClick={(e) => { e.preventDefault(); document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' });}}>
                            Conheça os Planos
                        </a>
                        {isAuthenticated && (
                            <button onClick={handleDashboardClick} className={`${styles.heroButton} ${styles.dashboardButton}`}>Ir para o Dashboard</button>
                        )}
                    </div>
                </div>
            </header>

            <section id="vantagens" className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>Vantagens que Impulsionam seu Sucesso</h2>
                <p className={styles.sectionSubtitle}>Descubra como o FiDash pode simplificar sua rotina financeira e potencializar seus resultados.</p>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div className={styles.featureCard} key={index}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="depoimentos" className={styles.testimonialsSection}>
                <h2 className={styles.sectionTitle}>A Confiança que Gera Resultados</h2>
                <p className={styles.sectionSubtitle}>Veja o que nossos clientes estão dizendo sobre o FiDash.</p>
                <div className={styles.testimonialsGrid}>
                    {testimonials.map((testimonial, index) => (
                        <div className={styles.testimonialCard} key={index}>
                            <div className={styles.testimonialStars}>
                                {Array(testimonial.stars).fill(0).map((_, i) => (
                                    <FaStar key={`filled-${index}-${i}`} className={styles.starFilled} />
                                ))}
                                {Array(5 - testimonial.stars).fill(0).map((_, i) => (
                                    <FaStar key={`empty-${index}-${i}`} className={styles.starEmpty} />
                                ))}
                            </div>
                            <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
                            <div className={styles.testimonialAuthor}>
                                <span className={styles.testimonialAvatar}>{testimonial.avatar}</span>
                                <div>
                                    <span className={styles.authorName}>{testimonial.name}</span>
                                    <span className={styles.authorTitle}>{testimonial.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="planos" className={styles.plansSection}>
                <h2 className={styles.sectionTitle}>Nossos Planos</h2>
                <p className={styles.sectionSubtitle}>Escolha o plano FiDash que melhor se adapta às necessidades e ao tamanho do seu negócio.</p>
                <div className={styles.plansGrid}>
                     <div className={styles.planCard}>
                        <h3>Básico</h3>
                        <p className={styles.price}>R$ 39<span className={styles.priceDecimal}>,99</span><span className={styles.pricePeriod}>/mês</span></p>
                        <ul>
                            <li>Controle de Fluxo de Caixa</li>
                            <li>Relatórios Financeiros Simples</li>
                            <li>Conciliação Bancária Manual</li>
                            <li>Suporte via Chat</li>
                        </ul>
                        <Link to="/register" className={styles.planButton}>Começar Agora</Link>
                    </div>
                    <div className={`${styles.planCard} ${styles.popularPlan}`}>
                        <span className={styles.popularBadge}>Mais Popular</span>
                        <h3>Padrão</h3>
                        <p className={styles.price}>R$ 44<span className={styles.priceDecimal}>,99</span><span className={styles.pricePeriod}>/mês</span></p>
                        <ul>
                            <li>Todos os recursos do Plano Básico</li>
                            <li>Conciliação Bancária Automática</li>
                            <li>Demonstrativo de Resultados (DRE)</li>
                            <li>Gráficos e Dashboards Avançados</li>
                            <li>Suporte Prioritário</li>
                        </ul>
                        <Link to="/register" className={`${styles.planButton} ${styles.popularButton}`}>Experimente Grátis</Link>
                    </div>
                    <div className={styles.planCard}>
                        <h3>Premium</h3>
                        <p className={styles.price}>R$ 59<span className={styles.priceDecimal}>,99</span><span className={styles.pricePeriod}>/mês</span></p>
                        <ul>
                            <li>Todos os recursos do Plano Padrão</li>
                            <li>Gerenciamento de Estoque Integrado</li>
                            <li>Múltiplos Usuários</li>
                            <li>Consultoria Financeira Inicial</li>
                            <li>Suporte VIP 24/7</li>
                        </ul>
                        <Link to="/register" className={styles.planButton}>Contratar Premium</Link>
                    </div>
                </div>
            </section>
            
            <section id="sobre" className={styles.aboutSection}>
                 <h2 className={styles.sectionTitle}>Sobre o FiDash</h2>
                 <p className={styles.sectionSubtitle}>Nossa missão é simplificar a gestão financeira para pequenas e médias empresas, fornecendo ferramentas inteligentes e intuitivas para que você possa focar no crescimento do seu negócio.</p>
            </section>

            <footer className={styles.homeFooter}>
                <p>&copy; {new Date().getFullYear()} FiDash. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default HomePage;