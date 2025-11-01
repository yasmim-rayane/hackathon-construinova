# 🔐 Sistema de Autenticação - HubBS

Sistema completo de cadastro e login de usuários com banco de dados IndexedDB.

## 📋 Funcionalidades

### ✅ Autenticação Completa
- ✨ **Cadastro de Usuários** - Registro com validação completa
- 🔑 **Login/Logout** - Autenticação segura com sessão persistente
- 👤 **Perfil de Usuário** - Gerenciamento de dados pessoais
- 🎯 **Sistema de Pontos** - Gamificação integrada
- 🔒 **Proteção de Rotas** - Páginas restritas para usuários autenticados
- 💾 **Persistência Local** - Dados salvos em IndexedDB

### 🎨 Recursos Adicionais
- 📱 **Responsivo** - Interface adaptável para mobile
- 🔍 **Validação em Tempo Real** - Feedback instantâneo nos formulários
- 👁️ **Toggle de Senha** - Mostrar/ocultar senha
- 💪 **Indicador de Força de Senha** - Avaliação da segurança
- 🎭 **Avatares Personalizados** - Geração automática de iniciais
- 🌆 **Suporte a Cidades** - Seleção das cidades da Baixada Santista

## 🗂️ Arquitetura do Sistema

### Arquivos Principais

```
js/
├── auth.js          # Sistema de autenticação
├── database.js      # Gerenciamento do IndexedDB
├── login.js         # Lógica da página de login
├── signup.js        # Lógica da página de cadastro
└── session.js       # Gerenciador de sessão

pages/
├── login.html       # Página de login
├── signup.html      # Página de cadastro
└── test-auth.html   # Página de testes do sistema
```

## 🚀 Como Usar

### 1. Incluir Scripts nas Páginas

```html
<!-- Ordem importante: database → auth → página específica -->
<script src="../js/database.js"></script>
<script src="../js/auth.js"></script>
<script src="../js/login.js" defer></script>
```

### 2. Criar um Novo Usuário

```javascript
// Registro de usuário
const result = await auth.register({
    nome: 'João Silva',
    email: 'joao@email.com',
    senha: 'senha123',
    telefone: '(13) 99999-9999',
    cidade: 'Santos',
    tipo: 'cidadao'  // ou 'empresa', 'admin'
});

if (result.success) {
    console.log('Usuário criado:', result.user);
} else {
    console.error('Erro:', result.message);
}
```

### 3. Fazer Login

```javascript
// Login
const result = await auth.login('joao@email.com', 'senha123');

if (result.success) {
    console.log('Login bem-sucedido:', result.user);
    // Redireciona para dashboard
    window.location.href = 'dashboard.html';
} else {
    console.error('Erro:', result.message);
}
```

### 4. Verificar Autenticação

```javascript
// Verifica se está autenticado
if (auth.isAuthenticated()) {
    const user = auth.getCurrentUser();
    console.log('Usuário logado:', user.nome);
}

// Requer autenticação (redireciona se não estiver logado)
auth.requireAuth();

// Requer tipo específico de usuário
if (auth.requireRole(['admin', 'empresa'])) {
    // Código apenas para admin ou empresa
}
```

### 5. Gerenciar Sessão

```javascript
// Logout
auth.logout(); // Redireciona para index.html

// Atualizar dados do usuário
await auth.updateUser(userId, {
    telefone: '(13) 98888-8888',
    cidade: 'Guarujá'
});

// Adicionar pontos
await auth.addPoints(userId, 50, 'Relato aprovado');
```

## 📊 Estrutura do Banco de Dados

### Object Store: `usuarios`

```javascript
{
    id: 1,                      // Auto-incremento
    nome: "João Silva",
    email: "joao@email.com",    // Índice único
    senha: "hash_da_senha",     // Hash base64 (em produção usar bcrypt)
    telefone: "(13) 99999-9999",
    cidade: "Santos",
    tipo: "cidadao",            // cidadao, empresa, admin
    pontos: 100,
    nivel: 2,
    avatar: {
        iniciais: "JS",
        cor: "#005F73"
    },
    dataCriacao: "2025-11-01T10:00:00.000Z",
    ativo: true
}
```

## 🎮 Página de Testes

Acesse `pages/test-auth.html` para testar todas as funcionalidades:

1. **Status da Sessão** - Visualiza usuário logado
2. **Criar Usuário** - Testa cadastro
3. **Fazer Login** - Testa autenticação
4. **Listar Usuários** - Visualiza banco de dados
5. **Console de Logs** - Acompanha operações em tempo real

### Como Acessar

```bash
# Inicie um servidor local
python -m http.server 8000

# Acesse no navegador
http://localhost:8000/pages/test-auth.html
```

## 🔒 Segurança

### Implementado
- ✅ Validação de e-mail (formato)
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ E-mails únicos (não permite duplicatas)
- ✅ Hash de senha (base64 + salt)
- ✅ Sessão persistente (localStorage)
- ✅ Proteção de rotas

### Para Produção (TODO)
- ⚠️ Usar bcrypt para hash de senha
- ⚠️ Implementar backend com API REST
- ⚠️ Usar JWT para tokens de sessão
- ⚠️ HTTPS obrigatório
- ⚠️ Rate limiting para prevenir ataques
- ⚠️ Validação de CSRF
- ⚠️ Recuperação de senha por e-mail
- ⚠️ Autenticação de dois fatores (2FA)

## 📱 Integração com Páginas

### Login Page
```html
<!-- pages/login.html -->
<form id="login-form">
    <input type="email" id="email" required>
    <input type="password" id="password" required>
    <button type="submit">Entrar</button>
</form>
<div id="login-error"></div>
<div id="demo-login"></div> <!-- Botão de login demo -->
```

### Signup Page
```html
<!-- pages/signup.html -->
<form id="signup-form">
    <input type="text" id="signup-nome" required>
    <input type="email" id="signup-email" required>
    <input type="tel" id="signup-telefone">
    <select id="signup-cidade">...</select>
    <input type="password" id="signup-password" required>
    <input type="password" id="signup-password-confirm" required>
    <input type="checkbox" id="terms" required>
    <button type="submit">Criar Conta</button>
</form>
<div id="signup-error"></div>
<div id="password-strength"></div>
```

### Widget de Usuário (Navbar)
```html
<!-- Adicione em qualquer navbar -->
<div id="user-widget"></div>

<script src="../js/session.js"></script>
```

## 🎯 Casos de Uso

### 1. Página Pública (Index)
```html
<!-- Mostra botões de Login/Cadastro para visitantes -->
<!-- Mostra widget do usuário se logado -->
<script src="js/auth.js"></script>
<script src="js/session.js"></script>
```

### 2. Página Protegida (Dashboard)
```html
<script src="../js/auth.js"></script>
<script>
    // Redireciona para login se não autenticado
    if (!auth.requireAuth()) {
        // Usuário foi redirecionado
    }
</script>
```

### 3. Página Restrita (Admin)
```html
<script src="../js/auth.js"></script>
<script>
    // Apenas admins podem acessar
    if (!auth.requireRole(['admin'])) {
        alert('Acesso negado!');
        window.location.href = '../index.html';
    }
</script>
```

## 📈 Sistema de Pontos

```javascript
// Adicionar pontos ao fazer um relato
await auth.addPoints(userId, 10, 'Relato enviado');

// Adicionar pontos ao relato ser aprovado
await auth.addPoints(userId, 50, 'Relato aprovado');

// Resgatar recompensa (remove pontos)
await auth.addPoints(userId, -100, 'Resgate de cupom');

// Verificar pontos do usuário atual
const user = auth.getCurrentUser();
console.log(`Você tem ${user.pontos} pontos`);
```

## 🐛 Troubleshooting

### Erro: "Usuário não encontrado"
- Verifique se o usuário foi criado com sucesso
- Use a página `test-auth.html` para listar usuários
- Verifique se o e-mail está correto (case-insensitive)

### Erro: "E-mail já cadastrado"
- O e-mail já existe no banco
- Use outro e-mail ou faça login

### Sessão não persiste
- Verifique se localStorage está habilitado
- Verifique console do navegador para erros
- Limpe o localStorage e tente novamente

### Banco não inicializa
- Aguarde o evento DOMContentLoaded
- Verifique se IndexedDB está disponível no navegador
- Use `await db.waitForInit()` antes de operações

## 🔄 Próximos Passos

1. ✅ Sistema de autenticação básico
2. ✅ Cadastro e login funcionais
3. ✅ Gerenciamento de sessão
4. ⏳ Página de perfil do usuário
5. ⏳ Recuperação de senha
6. ⏳ Integração com envio de relatos
7. ⏳ Dashboard personalizado por tipo de usuário
8. ⏳ Sistema de notificações
9. ⏳ Backend com API REST
10. ⏳ Deploy em produção

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 E-mail: hubbs@outlook.com.br
- 📱 WhatsApp: (13) 99763-9273
- 🐙 GitHub: yasmim-rayane/hackathon-construinova

---

**Desenvolvido com 💙 para o Hackathon Construinova Litoral 2025**
