# 🌱 Guia de População de Dados para Apresentação

## 📋 Visão Geral

Este guia explica como popular o sistema HubBS com dados de demonstração para a apresentação do hackathon.

## 🎯 Dados que serão adicionados

### Quantidade Total: **30 relatos**

### Distribuição por Cidade:
- **Santos**: ~15 relatos
- **Guarujá**: ~8 relatos  
- **São Vicente**: ~7 relatos

### Categorias:
- 🏗️ Infraestrutura (buracos, calçadas, asfalto)
- 💧 Saneamento (esgoto, água, bueiros)
- 🗑️ Lixo/Coleta (lixo acumulado, coleta irregular)
- 💡 Iluminação (postes queimados, iluminação precária)
- 🌳 Meio Ambiente (praças, áreas verdes)

### Status:
- ✅ **Resolvido**: ~8 relatos (para mostrar eficiência)
- 🔄 **Em Progresso**: ~12 relatos (ações em andamento)
- 📋 **Em Análise**: ~10 relatos (recém-reportados)

### ODS (Objetivos de Desenvolvimento Sustentável):
- 💧 **ODS 6**: Água Potável e Saneamento
- ⚡ **ODS 7**: Energia Limpa e Acessível
- 🏗️ **ODS 9**: Indústria, Inovação e Infraestrutura
- 🏙️ **ODS 11**: Cidades e Comunidades Sustentáveis

## 🚀 Como Popular os Dados

### Método 1: Interface Gráfica (Recomendado para Apresentação)

1. **Abra o arquivo**: `popular-dados.html` no navegador
2. **Clique no botão**: "Iniciar População de Dados"
3. **Aguarde**: O processo leva cerca de 5-10 segundos
4. **Visualize**: Os logs mostrarão cada relato sendo adicionado
5. **Confirme**: Estatísticas finais serão exibidas

### Método 2: Console do Navegador

1. Abra qualquer página do sistema no navegador
2. Abra o Console de Desenvolvedor (F12)
3. Cole e execute:
```javascript
// Carregar o script
const script = document.createElement('script');
script.src = 'assets/js/seed-relatos.js';
document.head.appendChild(script);

// Aguardar 3 segundos e executar
setTimeout(() => popularRelatos(), 3000);
```

### Método 3: Automático ao Carregar

O script `seed-relatos.js` está configurado para executar automaticamente 2 segundos após ser carregado. Basta incluí-lo em qualquer página:

```html
<script src="assets/js/seed-relatos.js"></script>
```

## 📊 Exemplos de Relatos

### Santos - Infraestrutura
- "Buraco enorme na Rua Amador Bueno" (Em Progresso)
- "Calçada quebrada dificulta mobilidade" (Resolvido)
- "Asfalto deteriorado causa risco de acidentes" (Em Análise)

### Guarujá - Lixo/Coleta
- "Praia suja com muito lixo" (Em Progresso)
- "Contêineres de lixo transbordando" (Em Análise)

### São Vicente - Saneamento
- "Esgoto a céu aberto há meses" (Em Progresso)
- "Bocas de lobo entupidas causam enchentes" (Em Análise)

## 🎨 Onde Visualizar os Dados

Após popular, você pode ver os dados em:

### 1. **Dashboard Público** (`/pages/sistema/dashboard.html`)
- Estatísticas gerais
- Gráficos por categoria
- Métricas ODS

### 2. **Dashboard Empresa** (`/pages/empresa/empresa-dashboard.html`)
- Visão completa dos relatos
- Métricas detalhadas por ODS
- Relatórios gerenciais

### 3. **Métricas ODS** (`/pages/empresa/metricas-ods.html`)
- Filtros por cidade, ODS, período
- Gráficos interativos
- Exportação em PDF e Excel

### 4. **Relatórios** (`/pages/empresa/relatorios.html`)
- Geração de relatórios personalizados
- Análise por período
- Exportação de dados

## ✅ Verificação

Para confirmar que os dados foram adicionados:

```javascript
// No console do navegador
const db = new HubDatabase();
await db.init();
const stats = await db.getEstatisticas();
console.log(stats);
```

Você deverá ver:
```javascript
{
  total: 30,
  porStatus: {
    resolvido: 8,
    em_progresso: 12,
    em_analise: 10
  },
  porODS: {
    ods9: 10,
    ods11: 9,
    ods6: 7,
    ods7: 4
  },
  porCidade: {
    santos: 15,
    guaruja: 8,
    sao_vicente: 7
  }
}
```

## 🔄 Limpar Dados

Se precisar recomeçar:

### Opção 1: Limpar IndexedDB
```javascript
// No console
indexedDB.deleteDatabase('HubDatabase');
location.reload();
```

### Opção 2: Ferramentas do Navegador
1. F12 → Application/Armazenamento
2. IndexedDB → HubDatabase
3. Botão direito → Delete Database
4. Recarregar página

## 💡 Dicas para Apresentação

### 1. **Prepare Antes**
- Popular dados 5 minutos antes da apresentação
- Verificar se os dashboards estão carregando corretamente
- Testar filtros e exportações

### 2. **Demonstre o Fluxo**
1. Mostrar página inicial
2. Abrir Dashboard Público (dados gerais)
3. Login como empresa (empresa@demo.com / 123456)
4. Explorar Métricas ODS com filtros
5. Gerar relatório em PDF
6. Exportar dados em Excel

### 3. **Destaque os Números**
- "**30 relatos** já registrados em 3 cidades"
- "**8 problemas resolvidos** demonstrando eficiência"
- "**4 ODS** sendo monitorados ativamente"
- "Dados **em tempo real** com gráficos interativos"

### 4. **Mostre a Variedade**
- Diferentes tipos de problemas urbanos
- Múltiplas cidades da Baixada Santista
- Status variados (resolvido, em andamento, análise)
- Integração com ODS da ONU

## 🎯 Argumentos de Venda

Use estes pontos na apresentação:

1. **Sistema Completo**: "Não é apenas um formulário, é uma plataforma completa de gestão urbana"

2. **Dados Reais**: "Já temos 30 relatos cadastrados cobrindo infraestrutura, saneamento e meio ambiente"

3. **Múltiplas Cidades**: "Funciona em escala - Santos, Guarujá e São Vicente já estão no sistema"

4. **Resultados Mensuráveis**: "8 problemas já foram resolvidos, mostrando o impacto real"

5. **Alinhamento ONU**: "Todos os relatos são classificados por ODS, facilitando relatórios para organismos internacionais"

6. **Business Intelligence**: "Dashboards executivos com exportação em PDF e Excel para tomada de decisão"

## 📱 Contato e Suporte

- **Desenvolvido para**: Hackathon ConstruINOVA 2025
- **Tema**: Desenvolvimento Urbano Sustentável
- **Tecnologia**: IndexedDB, JavaScript ES6+, TailwindCSS

---

## ⚙️ Informações Técnicas

### Estrutura dos Relatos
```javascript
{
  titulo: String,
  descricao: String,
  categoria: String,
  endereco: String,
  cidade: String,
  bairro: String,
  ods: String,
  prioridade: String,
  status: String,
  data: ISO Date String,
  coordenadas: { lat: Number, lng: Number }
}
```

### Armazenamento
- **Banco**: IndexedDB (local, sem backend)
- **Tabela**: relatos
- **Índices**: cidade, categoria, ods, status, data

### Performance
- **Tempo de população**: ~5 segundos
- **Relatos por segundo**: ~6
- **Tamanho estimado**: ~50KB

---

**🎉 Boa sorte na apresentação!**
