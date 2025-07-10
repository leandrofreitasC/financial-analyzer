import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import FinancialCharts from './components/Charts/FinancialCharts';
import AnalysisPanel from './components/Analysis/AnalysisPanel';
import { useFinancialAnalysis } from './hooks/useFinancialAnalysis';
import { FinancialData } from './types';
import './App.css';

const App: React.FC = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const analysis = useFinancialAnalysis(financialData);

  const handleDataLoaded = (data: FinancialData[]) => {
    setFinancialData(data);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>💰 Analisador Financeiro</h1>
        <p>Faça upload do seu arquivo Excel ou CSV e descubra onde está gastando mais</p>
      </header>

      <main className="app-main">
        <FileUpload onDataLoaded={handleDataLoaded} />

        {analysis && (
          <>
            <AnalysisPanel
              categoryData={analysis.categoryAnalysis}
              totalIncome={analysis.totalIncome}
              totalExpenses={analysis.totalExpenses}
              balance={analysis.balance}
              improvements={analysis.improvements}
            />
            <FinancialCharts
              categoryData={analysis.categoryAnalysis}
              monthlyData={analysis.monthlyAnalysis}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
