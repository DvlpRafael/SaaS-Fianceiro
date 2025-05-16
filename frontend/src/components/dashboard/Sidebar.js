import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { FaHome, FaPlusCircle, FaMinusCircle, FaBoxes, FaMoneyBillWave } from 'react-icons/fa';

function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <FaMoneyBillWave className={styles.logoIcon} />
                <span>SaaS Financeiro</span>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/" className={styles.link}><FaHome className={styles.icon} /> Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/adicionar-entrada" className={styles.link}><FaPlusCircle className={styles.icon} /> Adicionar Entrada</Link>
                    </li>
                    <li>
                        <Link to="/adicionar-saida" className={styles.link}><FaMinusCircle className={styles.icon} /> Adicionar Saída</Link>
                    </li>
                    <li>
                        <Link to="/adicionar-estoque" className={styles.link}><FaBoxes className={styles.icon} /> Estoque</Link>
                    </li>
                    <li>
                        <Link to="/estoque" className={styles.link}><FaBoxes className={styles.icon} /> Lista de Estoque</Link>
                    </li>
                    
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;