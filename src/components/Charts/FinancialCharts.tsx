import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CategoryAnalysis, MonthlyAnalysis } from '../../types';

interface FinancialChartsProps {
  categoryData: CategoryAnalysis[];
  monthlyData: MonthlyAnalysis[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

const useResponsiveOuterRadius = () => {
  const [radius, setRadius] = React.useState(120);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setRadius(70);
      } else if (window.innerWidth < 900) {
        setRadius(90);
      } else {
        setRadius(120);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return radius;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const CustomLegend: React.FC<{ data: CategoryAnalysis[] }> = ({ data }) => (
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    gap: 10
  }}>
    {data.map((cat, idx) => (
      <div key={cat.category} style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
        <span style={{
          display: 'inline-block',
          width: 14,
          height: 14,
          borderRadius: 3,
          background: COLORS[idx % COLORS.length],
          marginRight: 6
        }} />
        <span style={{ color: '#222', fontWeight: 500 }}>{cat.category}:</span>
        <span style={{ color: '#666', marginLeft: 3 }}>{cat.percentage.toFixed(1)}%</span>
      </div>
    ))}
  </div>
);

const FinancialCharts: React.FC<FinancialChartsProps> = ({ categoryData, monthlyData }) => {
  const outerRadius = useResponsiveOuterRadius();
  const isMobile = useIsMobile();
  return (
    <div className="charts-container">
      <div className="chart-section">
        <h3>📈 Gastos por Categoria</h3>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={!isMobile}
              label={isMobile ? undefined : ({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="totalAmount"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']} />
          </PieChart>
        </ResponsiveContainer>
        {isMobile && <CustomLegend data={categoryData} />}
      </div>

      <div className="chart-section">
        <h3>📊 Evolução Mensal</h3>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill="#4ECDC4" name="Receitas" />
            <Bar dataKey="expenses" fill="#FF6B6B" name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialCharts;
