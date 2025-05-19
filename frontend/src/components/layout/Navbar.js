import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/home' || location.pathname === '/';

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        if (isHomePage) {
            window.addEventListener('scroll', handleScroll);
        } else {
            setIsScrolled(true); // Navbar com fundo em outras páginas
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHomePage]);
    
    // Determina a classe do navbar com base no scroll e se é a homepage
    const navbarClasses = `${styles.navbar} ${isHomePage && !isScrolled && !isMobileMenuOpen ? styles.transparent : styles.scrolled}`;

    return (
        <nav className={navbarClasses}>
            <div className={styles.navContainer}>
                <Link to="/home" className={styles.navLogo} onClick={closeMobileMenu}>
                
                    <span>FiDash</span>
                </Link>

                <button className={styles.mobileMenuIcon} onClick={toggleMobileMenu} aria-label="Abrir menu">
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul className={isMobileMenuOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
                    <li><NavLink to="/home" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={closeMobileMenu}>Início</NavLink></li>
                    <li><NavLink to="/#vantagens" className={styles.navLink} onClick={(e) => { e.preventDefault(); document.getElementById('vantagens')?.scrollIntoView({ behavior: 'smooth' }); closeMobileMenu(); }}>Vantagens</NavLink></li>
                    <li><NavLink to="/#planos" className={styles.navLink} onClick={(e) => { e.preventDefault(); document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' }); closeMobileMenu(); }}>Planos</NavLink></li>
                    <li><NavLink to="/#sobre" className={styles.navLink} onClick={(e) => { e.preventDefault(); document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' }); closeMobileMenu(); }}>Sobre Nós</NavLink></li>
                    <li><NavLink to="/login" className={({isActive}) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink} onClick={closeMobileMenu}>Login</NavLink></li>
                    <li><Link to="/register" className={`${styles.navLink} ${styles.navButtonRegister}`} onClick={closeMobileMenu}>Cadastro</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;