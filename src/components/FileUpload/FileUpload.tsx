import React, { useCallback } from 'react';
import readXlsxFile from 'read-excel-file';
import Papa from 'papaparse';
import { v4 as uuidv4 } from 'uuid';
import { FinancialData } from '../../types';

interface FileUploadProps {
  onDataLoaded: (data: FinancialData[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const processExcelFile = async (file: File): Promise<FinancialData[]> => {
    const rows = await readXlsxFile(file);
    return rows.slice(1).map((row: any[]) => ({
      id: uuidv4(),
      date: new Date(row[0]),
      description: row[1]?.toString() || '',
      category: row[2]?.toString() || 'Outros',
      amount: Math.abs(Number(row[3]) || 0),
      type: Number(row[3]) >= 0 ? 'income' : 'expense'
    }));
  };

  const processCSVFile = (file: File): Promise<FinancialData[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const data: FinancialData[] = results.data.map((row: any) => ({
              id: uuidv4(),
              date: new Date(row.Data),
              description: row.Descrição?.toString() || '',
              category: row.Categoria?.toString() || 'Outros',
              amount: Math.abs(Number(row.Valor) || 0),
              type: Number(row.Valor) >= 0 ? 'income' : 'expense'
            }));
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      let data: FinancialData[];
      
      if (file.name.toLowerCase().endsWith('.csv')) {
        data = await processCSVFile(file);
      } else {
        data = await processExcelFile(file);
      }

      onDataLoaded(data);
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      alert('Erro ao processar o arquivo. Verifique se o formato está correto.');
    }
  }, [onDataLoaded]);

  const handleDownloadExample = () => {
    const link = document.createElement('a');
    link.href = '/exemplo-financeiro.csv';
    link.download = 'exemplo-financeiro.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="file-upload">
      <h2>📊 Análise Financeira</h2>
      <div className="upload-area">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          id="file-input"
        />
        <label htmlFor="file-input" className="upload-button">
          Selecionar Arquivo Excel/CSV
        </label>
        <div className="format-info">
          <div className="format-header">
            <h4>📋 Formato Esperado</h4>
            <p><strong>Colunas:</strong> Data | Descrição | Categoria | Valor</p>
          </div>
          <div className="format-table-wrapper">
            <table className="format-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-15</td>
                  <td>Salário Janeiro</td>
                  <td>Receitas</td>
                  <td>5000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button 
            onClick={handleDownloadExample}
            className="download-example-button"
            type="button"
          >
            📥 Baixar Arquivo de Exemplo (CSV)
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
