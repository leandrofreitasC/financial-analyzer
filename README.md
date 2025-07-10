# 📊 Analisador Financeiro

Uma aplicação web moderna para análise de dados financeiros pessoais, desenvolvida em React com TypeScript.

## 🚀 Funcionalidades

- **Upload de Arquivos**: Suporte para arquivos Excel (.xlsx, .xls) e CSV
- **Análise Automática**: Processamento automático de transações financeiras
- **Dashboard Interativo**: Visualização de receitas, despesas e saldo
- **Categorização**: Análise de gastos por categoria
- **Gráficos Dinâmicos**: Visualizações interativas dos dados financeiros
- **Arquivo de Exemplo**: Download de template para facilitar o uso

## 📋 Formato de Arquivo Esperado

A aplicação espera arquivos com as seguintes colunas:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| **Data** | Data da transação (YYYY-MM-DD) | 2024-01-15 |
| **Descrição** | Nome da transação | Salário Janeiro |
| **Categoria** | Categoria da transação | Receitas, Alimentação |
| **Valor** | Valor (positivo = receita, negativo = despesa) | 5000.00 ou -350.50 |

## 🛠️ Como Usar

1. **Baixe o arquivo de exemplo**: Clique no botão "📥 Baixar Arquivo de Exemplo (CSV)"
2. **Prepare seus dados**: Use o template como base para organizar suas transações
3. **Faça upload**: Selecione seu arquivo Excel ou CSV
4. **Analise**: Visualize os insights automáticos sobre suas finanças

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd financial-analyzer

# Instale as dependências
npm install --legacy-peer-deps
```

### Execução
```bash
# Inicie o servidor de desenvolvimento
npm start

# Acesse http://localhost:3000 no seu navegador
```

## 📦 Tecnologias Utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Recharts** - Biblioteca de gráficos
- **read-excel-file** - Processamento de arquivos Excel
- **PapaParse** - Processamento de arquivos CSV
- **UUID** - Geração de IDs únicos

## 🎨 Características da Interface

- **Design Responsivo**: Funciona em desktop e mobile
- **Interface Intuitiva**: Fácil de usar para qualquer usuário
- **Feedback Visual**: Indicadores claros de receitas e despesas
- **Cores Significativas**: Verde para receitas, vermelho para despesas

## 📊 Análises Disponíveis

- **Resumo Financeiro**: Total de receitas, despesas e saldo
- **Top Categorias**: Principais categorias de gastos
- **Gráficos Temporais**: Evolução financeira ao longo do tempo
- **Distribuição por Categoria**: Visualização em pizza dos gastos

## 🔧 Scripts Disponíveis

- `npm start` - Executa a aplicação em modo desenvolvimento
- `npm test` - Executa os testes
- `npm run build` - Gera build de produção
- `npm run eject` - Ejetar configurações (irreversível)

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
