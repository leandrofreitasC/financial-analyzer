import { useMemo } from 'react';
import { FinancialData, CategoryAnalysis, MonthlyAnalysis } from '../types';

export const useFinancialAnalysis = (data: FinancialData[]) => {
  const analysis = useMemo(() => {
    if (!data.length) return null;

    // Análise por categoria (apenas gastos)
    const expensesByCategory = data
      .filter(item => item.type === 'expense')
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
      }, {} as Record<string, number>);

    const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

    const categoryAnalysis: CategoryAnalysis[] = Object.entries(expensesByCategory)
      .map(([category, amount]) => ({
        category,
        totalAmount: amount,
        percentage: (amount / totalExpenses) * 100,
        transactionCount: data.filter(item => item.category === category && item.type === 'expense').length
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);

    // Análise mensal
    const monthlyData = data.reduce((acc, item) => {
      const month = item.date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = { income: 0, expenses: 0 };
      }
      
      if (item.type === 'income') {
        acc[month].income += item.amount;
      } else {
        acc[month].expenses += item.amount;
      }
      
      return acc;
    }, {} as Record<string, { income: number; expenses: number }>);

    const monthlyAnalysis: MonthlyAnalysis[] = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        balance: data.income - data.expenses
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Identificar oportunidades de melhoria
    const improvements = categoryAnalysis
      .filter(cat => cat.percentage > 10) // Categorias que representam mais de 10%
      .slice(0, 3) // Top 3 categorias
      .map(cat => ({
        category: cat.category,
        suggestion: `Considere reduzir gastos em ${cat.category} (${cat.percentage.toFixed(1)}% do total)`
      }));

    return {
      categoryAnalysis,
      monthlyAnalysis,
      improvements,
      totalIncome: data.filter(item => item.type === 'income').reduce((sum, item) => sum + item.amount, 0),
      totalExpenses,
      balance: data.reduce((sum, item) => sum + (item.type === 'income' ? item.amount : -item.amount), 0)
    };
  }, [data]);

  return analysis;
};
