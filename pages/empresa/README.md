# 🏢 Área Empresarial - HUB

Esta pasta contém todas as páginas relacionadas à área empresarial do HUB.

## Arquivos

- **dashboard.html** - Dashboard principal da empresa com visão geral de métricas ODS
- **metricas-ods.html** - Métricas detalhadas por ODS com filtros dinâmicos (ODS, Cidades, Período)
- **relatorios.html** - Relatórios completos com gráficos e análises de impacto

## Acesso

Para acessar a área empresarial:
1. Faça login em `/pages/login.html`
2. Use as credenciais de demonstração:
   - **Usuário:** admin
   - **Senha:** admin

## Estrutura de Navegação

```
/pages/empresa/
├── dashboard.html      → Página inicial após login
├── metricas-ods.html   → Análise detalhada por ODS
└── relatorios.html     → Relatórios e exportações
```

## Funcionalidades

### Dashboard
- Visão geral de relatos por ODS
- Estatísticas de cidadãos alcançados
- Links rápidos para métricas e relatórios
- Sistema de logout com proteção de sessão

### Métricas ODS
- Filtros por ODS (9, 11, 13)
- Filtros por cidade (9 cidades da Baixada Santista)
- Filtros por período (semana, mês, trimestre, ano, todo período)
- Gráficos interativos (Chart.js)
- Exportação de dados

### Relatórios
- Gráficos de evolução temporal
- Distribuição por status
- Ranking de cidades
- Análise detalhada por ODS
- Exportação (PDF, Excel, Email)
- Função de impressão otimizada
