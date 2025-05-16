import React from 'react';
import ResumoFinanceiro from '../resumo-financeiro/ResumoFinanceiro';
import EntradasList from '../entradas-saldo/EntradasList';
import SaidasList from '../saidas-saldo/SaidasList';
import EstoqueList from '../estoque/EstoqueList';
import DREDisplay from '../dre/DREDisplay';
import EntradasSaidasChart from '../saidas-saldo/EntradasSaidasChart';
import DespesasPorCategoriaChart from '../despesas/DespesasPorCategoriaChart';
import ComparativoEntradasSaidasChart from './ComparativoEntradasSaidasChart'; // Importe o novo gráfico

function Dashboard({ entradas, saidas, estoque, dre }) {
  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>
      <ResumoFinanceiro entradas={entradas} saidas={saidas} dre={dre} />
      <div className="container">
        <ComparativoEntradasSaidasChart entradas={entradas} saidas={saidas} /> {/* Adicione o novo gráfico aqui */}
        <EntradasSaidasChart entradas={entradas} saidas={saidas} />
        <DespesasPorCategoriaChart saidas={saidas} />
        <EntradasList entradas={entradas} />
        <SaidasList saidas={saidas} />
        <EstoqueList estoque={estoque} />
        <div className="section">
          <DREDisplay dre={dre} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;