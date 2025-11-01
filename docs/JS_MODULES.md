# 🗄️ Sistema de Banco de Dados Local - HUB

## Visão Geral

O HUB utiliza **IndexedDB** para simular um banco de dados completo localmente no navegador, permitindo demonstrar todas as funcionalidades sem necessidade de backend.

## 📊 Estrutura do Banco

### Object Stores (Tabelas)

#### 1. **relatos**
Armazena todos os relatos/reclamações dos cidadãos.

```javascript
{
    id: 1,                          // Auto-increment
    cidade: 'santos',               // Cidade do relato
    categoria: 'transporte-publico', // Categoria do problema
    ods: 'ods-9',                   // ODS relacionado
    status: 'em_analise',           // Status atual
    descricao: 'Texto do relato',
    data: '2025-11-01T10:30:00Z',   // ISO 8601
    localizacao: {
        lat: -23.9537,
        lng: -46.3330
    },
    prioridade: 'alta',             // baixa, media, alta
    likes: 15,
    visualizacoes: 120,
    usuarioId: 5,                   // FK para usuarios
    origem: 'whatsapp'              // whatsapp, web, app
}
```

**Índices:**
- `cidade` - Busca por cidade
- `categoria` - Busca por categoria
- `ods` - Busca por ODS
- `status` - Busca por status
- `data` - Ordenação temporal

#### 2. **usuarios**
Cadastro de cidadãos e usuários do sistema.

```javascript
{
    id: 1,
    nome: 'João Silva',
    email: 'joao@exemplo.com',
    senha: 'hash_senha',            // Em produção usar bcrypt
    tipo: 'cidadao',                // cidadao, empresa, admin
    cidade: 'santos',
    telefone: '13999999999',
    pontos: 150,                    // Pontos acumulados
    relatosEnviados: 15,
    dataCriacao: '2025-01-01T00:00:00Z'
}
```

**Índices:**
- `email` (único) - Login
- `tipo` - Filtro por tipo de usuário

#### 3. **empresas**
Cadastro de empresas parceiras.

```javascript
{
    id: 1,
    nome: 'Empresa Demo',
    cnpj: '12.345.678/0001-00',
    email: 'admin@empresa.com',
    senha: 'hash_senha',
    plano: 'professional',          // starter, professional, enterprise
    dataCadastro: '2025-01-01T00:00:00Z',
    ativo: true
}
```

**Índices:**
- `cnpj` (único)
- `plano` - Filtro por plano contratado

#### 4. **recompensas**
Recompensas oferecidas pelas empresas.

```javascript
{
    id: 1,
    empresaId: 1,
    titulo: 'Desconto 20%',
    descricao: 'Válido para compras acima de R$ 50',
    pontosNecessarios: 500,
    quantidadeDisponivel: 100,
    quantidadeResgatada: 43,
    ativo: true,
    dataValidade: '2025-12-31T23:59:59Z'
}
```

**Índices:**
- `empresaId`
- `ativo`

#### 5. **transacoes**
Histórico de ganho/gasto de pontos.

```javascript
{
    id: 1,
    usuarioId: 5,
    tipo: 'ganho',                  // ganho, gasto
    pontos: 10,
    motivo: 'Relato enviado',
    recompensaId: null,             // Se tipo=gasto
    data: '2025-11-01T10:30:00Z'
}
```

**Índices:**
- `usuarioId`
- `tipo`
- `data`

## 🚀 Como Usar

### 1. Inicialização Automática

O banco é inicializado automaticamente ao carregar qualquer página que inclua os scripts:

```html
<script src="js/database.js"></script>
<script src="js/api.js"></script>
```

### 2. Dados Simulados

Na primeira inicialização, o banco é populado com **1.200 relatos simulados**:
- Distribuídos entre as 9 cidades da Baixada Santista
- 3 ODS principais (9, 11, 13)
- Múltiplas categorias por ODS
- Status variados (resolvido, em progresso, em análise)
- Datas dos últimos 90 dias

### 3. Acesso via API

Todas as operações devem usar a API global `hubAPI`:

```javascript
// Buscar todos os relatos
const result = await hubAPI.buscarRelatos();
console.log(result.data); // Array de relatos

// Buscar com filtros
const filtrados = await hubAPI.buscarRelatos({
    cidade: 'santos',
    ods: 'ods-11',
    status: 'resolvido'
});

// Obter estatísticas
const stats = await hubAPI.getEstatisticas();
console.log(stats.data.total); // Total de relatos

// Enviar novo relato
const novo = await hubAPI.enviarRelato({
    cidade: 'guaruja',
    categoria: 'saneamento-basico',
    ods: 'ods-11',
    descricao: 'Vazamento de esgoto na Rua X'
});

// Login
const login = await hubAPI.login('joao@exemplo.com', '123456');
if (login.success) {
    console.log('Logado como:', login.role);
}
```

### 4. Painel de Administração

Acesse `/admin/database.html` para:
- Visualizar estatísticas em tempo real
- Filtrar e buscar relatos
- Exportar dados em JSON
- Resetar banco com dados simulados
- Monitorar console de logs

## 🔧 Funções Principais

### database.js

- `addRelato(relato)` - Adiciona novo relato
- `getRelatos(filtros)` - Busca relatos com filtros opcionais
- `updateRelato(id, updates)` - Atualiza relato existente
- `addUsuario(usuario)` - Cadastra novo usuário
- `getUsuarioByEmail(email)` - Busca usuário por email
- `addPontos(usuarioId, pontos, motivo)` - Adiciona pontos ao usuário
- `getEstatisticas()` - Retorna estatísticas gerais
- `seedDatabase()` - Popula banco com dados simulados
- `clearDatabase()` - Limpa todo o banco
- `exportData()` - Exporta dados para JSON

### api.js

- `login(email, password)` - Autenticação de usuário
- `register(userData)` - Registro de novo usuário
- `enviarRelato(relato)` - Enviar novo relato (com pontos)
- `buscarRelatos(filtros)` - Buscar relatos
- `getEstatisticas()` - Obter estatísticas
- `atualizarRelato(id, updates)` - Atualizar relato (somente empresas)
- `getDashboardData()` - Dados para dashboard público
- `getEmpresaDashboard(filtros)` - Dados para dashboard empresa
- `exportarRelatorio()` - Exportar relatório em JSON
- `enviarWhatsApp(mensagem)` - Simular envio via WhatsApp
- `resetDemo()` - Resetar banco para demonstração

## 📱 Integração com Páginas

### Dashboard Público (`pages/dashboard.html`)

```javascript
// Carregar dados
async function carregarDashboard() {
    const result = await hubAPI.getDashboardData();
    if (result.success) {
        const { relatos, estatisticas } = result.data;
        // Renderizar gráficos e estatísticas
    }
}
```

### Dashboard Empresa (`pages/empresa/dashboard.html`)

```javascript
// Carregar métricas da empresa
async function carregarMetricas() {
    const result = await hubAPI.getEmpresaDashboard({
        cidade: 'santos',
        ods: 'ods-11'
    });
    if (result.success) {
        // Exibir métricas
    }
}
```

### Login (`pages/login.html`)

```javascript
// Autenticar
async function fazerLogin() {
    const result = await hubAPI.login(email, senha);
    if (result.success) {
        if (result.role === 'empresa') {
            window.location.href = 'empresa/dashboard.html';
        } else {
            window.location.href = 'dashboard.html';
        }
    }
}
```

## 🔐 Credenciais Demo

### Empresa
- **Usuário:** admin
- **Senha:** admin
- **Acesso:** Dashboard empresarial completo

### Cidadão
- **Email:** joao@exemplo.com
- **Senha:** 123456
- **Acesso:** Dashboard público + envio de relatos

## 🎯 Mapeamento ODS

O sistema categoriza automaticamente relatos em ODS:

| Categoria | ODS |
|-----------|-----|
| Transporte Público | ODS 9 |
| Infraestrutura Urbana | ODS 9 |
| Inovação Tecnológica | ODS 9 |
| Conectividade | ODS 9 |
| Espaços Públicos | ODS 11 |
| Saneamento Básico | ODS 11 |
| Habitação | ODS 11 |
| Áreas Verdes | ODS 11 |
| Gestão de Resíduos | ODS 13 |
| Preservação Ambiental | ODS 13 |
| Energia Limpa | ODS 13 |
| Educação Ambiental | ODS 13 |

## 🌍 Cidades Suportadas

Baixada Santista (9 cidades):
1. Santos
2. São Vicente
3. Guarujá
4. Praia Grande
5. Cubatão
6. Bertioga
7. Mongaguá
8. Itanhaém
9. Peruíbe

## 💾 Persistência

Os dados são armazenados localmente no navegador usando:
- **IndexedDB** - Dados estruturados (relatos, usuários, etc.)
- **SessionStorage** - Dados de sessão (login)
- **LocalStorage** - Preferências do usuário

**Nota:** Os dados persistem entre sessões do navegador, mas são específicos do domínio/origem.

## 🧪 Testes

Para testar o sistema:

1. Acesse `/admin/database.html`
2. Verifique que 1.200 relatos foram criados
3. Teste os filtros (cidade, ODS, status)
4. Exporte os dados para verificar estrutura
5. Acesse páginas do site e veja os dados sendo usados

## 🔄 Reset do Banco

Para resetar completamente:

```javascript
// Via console do navegador
await hubAPI.resetDemo();

// Ou via painel admin
// Clicar em "Resetar Banco"
```

## 📊 Exemplo de Uso Completo

```javascript
// 1. Aguardar inicialização
setTimeout(async () => {
    
    // 2. Obter estatísticas
    const stats = await hubAPI.getEstatisticas();
    console.log('Total de relatos:', stats.data.total);
    
    // 3. Buscar relatos de Santos
    const relatosSantos = await hubAPI.buscarRelatos({
        cidade: 'santos',
        status: 'resolvido'
    });
    console.log('Relatos resolvidos em Santos:', relatosSantos.data.length);
    
    // 4. Enviar novo relato
    const novoRelato = await hubAPI.enviarRelato({
        cidade: 'guaruja',
        categoria: 'saneamento-basico',
        ods: 'ods-11',
        descricao: 'Problema de esgoto'
    });
    console.log('Relato criado com ID:', novoRelato.relatoId);
    
}, 1000);
```

## 🚧 Limitações

- Dados são locais ao navegador (não sincronizam entre dispositivos)
- Tamanho limitado pelo quota do IndexedDB (geralmente 50MB+)
- Não há validação de LGPD (apenas demonstração)
- Senhas não são hasheadas (usar bcrypt em produção)

## 🔮 Próximos Passos

Para produção, substituir por:
- **Firebase Firestore** - Banco NoSQL em nuvem
- **PostgreSQL** - Banco relacional
- **API REST** - Backend Node.js/Python
- **Autenticação real** - OAuth, JWT
- **LGPD** - Conformidade total
