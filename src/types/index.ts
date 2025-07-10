export interface FinancialData {
    id: string;
    date: Date;
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
  }
  
  export interface CategoryAnalysis {
    category: string;
    totalAmount: number;
    percentage: number;
    transactionCount: number;
  }
  
  export interface MonthlyAnalysis {
    month: string;
    income: number;
    expenses: number;
    balance: number;
  }
  