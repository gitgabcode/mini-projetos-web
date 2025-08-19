# 🏆 Calculadora PPA - Programa de Premiação dos Almoxarifados

## 📋 Sobre o Projeto

Sistema desenvolvido durante estágio em suprimentos para automatizar e otimizar o **Programa de Premiação dos Almoxarifados (PPA)** do Grupo CSC. A aplicação facilita o controle de indicadores, cálculos automáticos e geração de relatórios para avaliação trimestral dos almoxarifados.

## 🎯 Funcionalidades

### 📊 **Sistema de Avaliação por Setores**
- **Compras (25%)**: Controle de compras de contrato e requisições
- **Estoque (25%)**: Gestão de estoque parado, ajustes de saldo e quebras
- **Apontamentos (40%)**: Controle de notas, peças aplicadas e movimentações
- **Orçamento (10%)**: Comparação entre orçado vs realizado

### 🔧 **Recursos Principais**
- ✅ **Interface Intuitiva**: Cards interativos por setor com navegação fluida
- ✅ **Cálculos Automáticos**: Pontuação e percentuais calculados em tempo real
- ✅ **Validações Inteligentes**: Verificação automática de dados inconsistentes
- ✅ **Visão Geral**: Dashboard completo com resumo de todos os setores
- ✅ **Relatórios Excel**: Exportação detalhada com múltiplas abas
- ✅ **Gráficos Dinâmicos**: Visualização de dados com Chart.js
- ✅ **Sistema de Premiação**: Classificação automática baseada na pontuação final

### 📈 **Indicadores de Performance**
- **Meta de Premiação**: 8.0 pontos para elegibilidade
- **Classificações**: 1º, 2º, 3º lugar e elegível até 7º lugar
- **Pesos Diferenciados**: Apontamentos (40%), Compras e Estoque (25% cada), Orçamento (10%)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Design responsivo com gradientes e animações
- **JavaScript**: Lógica de negócio e interatividade
- **Chart.js**: Geração de gráficos dinâmicos
- **SheetJS**: Exportação de relatórios em Excel

## 🚀 Como Usar

### 1. **Dados Básicos**
```
- Código do Almoxarifado: Ex: ALM001
- Trimestre: Selecione o período de avaliação
```

### 2. **Preenchimento por Setor**
- Navegue pelos cards usando os botões de modo
- Preencha os indicadores de cada setor
- Visualize os resultados em tempo real

### 3. **Relatórios**
- **Visão Geral**: Veja o resumo completo e classificação
- **Relatório Setor**: Exporte dados específicos
- **Relatório Completo**: Gere Excel com todas as abas

## 📊 Estrutura de Avaliação

### Compras (25% do PPA)
| Erro | Pontuação |
|------|-----------|
| 0% a 5% | 100 pontos |
| 5% a 10% | 75 pontos |
| 10% a 15% | 50 pontos |
| Acima de 15% | 0 pontos |

### Estoque (25% do PPA)
- **Estoque Parado +90 dias**: 25% do setor
- **Ajuste de Saldo**: 25% do setor  
- **Quebra de Diesel**: 50% do setor

### Apontamentos (40% do PPA)
- **Notas no Prazo**: 15% do setor
- **Peças Aplicadas**: 30% do setor
- **Peças Retiradas 60% Abaixo Km**: 30% do setor
- **Movimentações Pneus**: 10% do setor
- **Saída Frota Errada**: 15% do setor

### Orçamento (10% do PPA)
- **Orçamento vs Realizado**: 100% do setor

## 🎨 Interface e Design

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Cores Temáticas**: Cada setor possui identidade visual própria
- **Animações Suaves**: Transições e efeitos para melhor UX
- **Feedback Visual**: Estados de sucesso, erro e carregamento

## 📁 Estrutura do Projeto

```
ppa/
├── index.html          # Página principal
├── script.js          # Lógica da aplicação
├── styles.css         # Estilos e design
└── README.md          # Documentação
```

## 🎯 Casos de Uso

1. **Gestores de Almoxarifado**: Acompanhar performance trimestral
2. **Equipe de Suprimentos**: Avaliar indicadores por setor
3. **Auditoria Interna**: Verificar cumprimento de metas
4. **Diretoria**: Relatórios executivos para tomada de decisão

## 💡 Benefícios Implementados

- ⚡ **Agilidade**: Redução de 80% no tempo de cálculo manual
- 🎯 **Precisão**: Eliminação de erros humanos nos cálculos
- 📈 **Transparência**: Visualização clara dos indicadores
- 📄 **Relatórios**: Documentação automática para auditoria
- 🏆 **Gamificação**: Sistema de premiação motivacional

## 🔄 Atualizações e Melhorias

### Versão 2.0 - Atual
- Sistema de cards independentes por setor
- Validações aprimoradas de dados
- Relatórios Excel com múltiplas abas
- Gráficos interativos
- Interface responsiva completa

## 👨‍💻 Desenvolvedor

**Gabriel Marcelino**  
*Estagiário de Compras - Grupo CSC*

- 📧 Email: [gabrieljf184@gmail.com]
- 💼 LinkedIn: [gabriel-marcelino1](https://www.linkedin.com/in/gabriel-marcelino1/)
- 🐱 GitHub: [gitgabcode](https://github.com/gitgabcode)

## 📜 Licença

Este projeto foi desenvolvido para uso interno do Grupo CSC durante o período de estágio. 

---

*💼 Projeto desenvolvido com foco na resolução de problemas reais do ambiente corporativo, demonstrando aplicação prática de conhecimentos em desenvolvimento web.*
