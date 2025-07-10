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

const FinancialCharts: React.FC<FinancialChartsProps> = ({ categoryData, monthlyData }) => {
  return (
    <div className="charts-container">
      <div className="chart-section">
        <h3>📈 Gastos por Categoria</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
              outerRadius={120}
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
      </div>

      <div className="chart-section">
        <h3>📊 Evolução Mensal</h3>
        <ResponsiveContainer width="100%" height={400}>
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
