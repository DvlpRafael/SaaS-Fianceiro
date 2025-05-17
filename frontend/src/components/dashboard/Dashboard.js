import React from 'react';
import ResumoFinanceiro from '../resumo-financeiro/ResumoFinanceiro';
import EntradasList from '../entradas-saldo/EntradasList';
import SaidasList from '../saidas-saldo/SaidasList';
import ListaEstoque from '../estoque/ListaEstoque';
import DREDisplay from '../dre/DREDisplay';
import EntradasSaidasChart from '../saidas-saldo/EntradasSaidasChart';
import DespesasPorCategoriaChart from '../despesas/DespesasPorCategoriaChart';
import ComparativoEntradasSaidasChart from './ComparativoEntradasSaidasChart';
import styles from './Dashboard.module.css'; // CSS Module específico do Dashboard

function Dashboard({ entradas, saidas, estoque, dre }) {
  return (
    <div className={styles.dashboardContent}>
      <h1>Dashboard</h1>
      
      <div className="resumo-financeiro-container"> {/* Classe global de App.css */}
        <ResumoFinanceiro entradas={entradas} saidas={saidas} dre={dre} />
      </div>
      
      {/* --- SEÇÃO DE GRÁFICOS --- */}
      <div className={styles.sectionTitle}>
        <h2>Visão Geral Gráfica</h2>
      </div>

      {/* Gráfico Comparativo de Largura Total */}
      <div className="chart-container-full-width"> {/* Classe global de App.css */}
        <ComparativoEntradasSaidasChart entradas={entradas} saidas={saidas} />
      </div>
      
      {/* Grid para os gráficos de pizza */}
      <div className={`${styles.gridContainer} ${styles.chartsGrid}`}> {/* Grid para os gráficos de pizza */}
        <EntradasSaidasChart entradas={entradas} saidas={saidas} />
        <DespesasPorCategoriaChart saidas={saidas} />
        {/* Adicione um placeholder ou terceiro gráfico se quiser 3 colunas sempre cheias */}
        {/* <div className={styles.placeholderCard}></div> */}
      </div>

      {/* --- SEÇÃO DE DADOS DETALHADOS --- */}
      <div className={styles.sectionTitle}>
        <h2>Detalhes Financeiros e Estoque</h2>
      </div>

      {/* Grid para DRE, Entradas, Saídas (mesma linha) e Estoque (linha abaixo) */}
      <div className={styles.dataSectionGrid}>
        <div className={`${styles.cardBase} ${styles.dreCard}`}> {/* DRE */}
          <DREDisplay dre={dre} />
        </div>

        <div className={styles.cardBase}> {/* Entradas */}
          <h2>Entradas Recentes</h2>
          <div className={styles.listWrapper}>
            <EntradasList entradas={entradas} />
          </div>
        </div>
        
        <div className={styles.cardBase}> {/* Saídas */}
          <h2>Saídas Recentes</h2>
          <div className={styles.listWrapper}>
            <SaidasList saidas={saidas} />
          </div>
        </div>

        <div className={`${styles.cardBase} ${styles.estoqueCardFullWidth}`}> {/* Lista de Estoque - Abaixo e Largura Total */}
          {/* ListaEstoque já tem seu próprio título e botão "Adicionar" */}
          <ListaEstoque /> 
        </div>
      </div>
    </div>
  );
}

export default Dashboard;