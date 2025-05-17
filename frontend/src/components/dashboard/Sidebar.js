import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { 
    FaHome, 
    FaPlusCircle, 
    FaMinusCircle, 
    FaBoxes, 
    FaSignOutAlt, 
    FaMoneyBillWave // FaMoneyBillWave adicionado, FaChartLine removido pois não estava sendo usado
} from 'react-icons/fa';

function Sidebar({ onLogout, isOpen, closeSidebar }) {
    
    const handleLinkClick = () => {
        if (isOpen && window.innerWidth <= 768) {
            closeSidebar();
        }
    };

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.logo}>
                <FaMoneyBillWave className={styles.logoIcon} /> {/* Corrigido para usar o ícone importado */}
                <span>SaaS Financeiro</span>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            onClick={handleLinkClick}
                            end 
                        >
                            <FaHome className={styles.icon} /> <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/adicionar-entrada" 
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            onClick={handleLinkClick}
                        >
                            <FaPlusCircle className={styles.icon} /> <span>Adicionar Entrada</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/adicionar-saida" 
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            onClick={handleLinkClick}
                        >
                            <FaMinusCircle className={styles.icon} /> <span>Adicionar Saída</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/estoque" 
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            onClick={handleLinkClick}
                        >
                            <FaBoxes className={styles.icon} /> <span>Lista de Estoque</span>
                        </NavLink>
                    </li>
                     <li>
                        <NavLink 
                            to="/adicionar-estoque" 
                            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
                            onClick={handleLinkClick}
                        >
                            <FaBoxes className={styles.icon} /> <span>Adicionar Estoque</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.logoutContainer}> {/* Wrapper para o botão de logout */}
                <button 
                    onClick={() => { 
                        if (onLogout) onLogout(); 
                        handleLinkClick(); 
                    }} 
                    className={`${styles.link} ${styles.logoutButton}`}
                >
                    <FaSignOutAlt className={styles.icon} /> <span>Sair</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;