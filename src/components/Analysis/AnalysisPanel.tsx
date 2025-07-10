import React from 'react';
import { CategoryAnalysis } from '../../types';

interface AnalysisPanelProps {
  categoryData: CategoryAnalysis[];
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  improvements: Array<{ category: string; suggestion: string }>;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  categoryData,
  totalIncome,
  totalExpenses,
  balance,
  improvements
}) => {
  return (
    <div className="analysis-panel">
      <div className="summary-cards">
        <div className="card income">
          <h4>💰 Total de Receitas</h4>
          <p>R$ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expenses">
          <h4>💸 Total de Gastos</h4>
          <p>R$ {totalExpenses.toFixed(2)}</p>
        </div>
        <div className={`card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
          <h4>⚖️ Saldo</h4>
          <p>R$ {balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="top-categories">
        <h3>🔥 Maiores Gastos por Categoria</h3>
        <div className="category-list">
          {categoryData.slice(0, 5).map((category, index) => (
            <div key={category.category} className="category-item">
              <span className="rank">#{index + 1}</span>
              <span className="category-name">{category.category}</span>
              <span className="amount">R$ {category.totalAmount.toFixed(2)}</span>
              <span className="percentage">{category.percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="improvements">
        <h3>💡 Oportunidades de Melhoria</h3>
        <ul>
          {improvements.map((improvement, index) => (
            <li key={index}>{improvement.suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisPanel;
