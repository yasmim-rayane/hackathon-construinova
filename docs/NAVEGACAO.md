# 🚀 Guia Rápido - Navegação HubBS

## 📍 Páginas Principais

### 🏠 Página Inicial
- **URL:** `/index.html`
- **Descrição:** Landing page do projeto

### 🔐 Autenticação
- **Login:** `/pages/auth/login.html`
- **Cadastro:** `/pages/auth/signup.html`
- **Teste Auth:** `/pages/auth/test-auth.html`

### 📝 Relatos
- **Enviar Relato:** `/pages/relatos/enviar-relato.html`
- **Buscar Protocolo:** `/pages/relatos/buscar-protocolo.html`
- **Meus Relatos:** `/pages/relatos/meus-relatos.html`
- **Bot WhatsApp:** `/pages/relatos/whatsapp-bot.html`

### 🎛️ Sistema
- **Dashboard:** `/pages/sistema/dashboard.html`
- **Recompensas:** `/pages/sistema/recompensas.html`
- **Planos:** `/pages/sistema/planos.html`
- **Sobre:** `/pages/sistema/sobre.html`
- **Teste DB:** `/pages/sistema/test-db.html`

### 🏢 Empresas
- **Landing:** `/pages/empresa/empresa.html`
- **Dashboard:** `/pages/empresa/empresa-dashboard.html`
- **Métricas ODS:** `/pages/empresa/metricas-ods.html`
- **Relatórios:** `/pages/empresa/relatorios.html`

### 👨‍💼 Admin
- **Database:** `/pages/admin/database.html`

## 🔗 Redirecionamentos

Por compatibilidade, os seguintes caminhos antigos redirecionam automaticamente:

- `/pages/login.html` → `/pages/auth/login.html`
- `/pages/signup.html` → `/pages/auth/signup.html`
- `/pages/dashboard.html` → `/pages/sistema/dashboard.html`

## 📦 Assets

### JavaScript
- **Aplicação:** `/assets/js/app.js`
- **Dashboard:** `/assets/js/dashboard.js`
- **Scripts Gerais:** `/assets/js/script.js`

### Módulos
- **API:** `/assets/js/modules/api.js`
- **Autenticação:** `/assets/js/modules/auth.js`
- **Banco de Dados:** `/assets/js/modules/database.js`
- **Login:** `/assets/js/modules/login.js`
- **Cadastro:** `/assets/js/modules/signup.js`
- **Sessão:** `/assets/js/modules/session.js`
- **Dados Teste:** `/assets/js/modules/init-test-data.js`

### Estilos
- **CSS Principal:** `/assets/css/style.css`

### Imagens
- **Logo:** `/assets/img/logo.jpeg`

## 📚 Documentação

- **README Principal:** `/README.md`
- **Autenticação:** `/docs/AUTENTICACAO.md`
- **Módulos JS:** `/docs/JS_MODULES.md`
- **Estrutura:** `/docs/ESTRUTURA.md`
- **Árvore de Arquivos:** `/docs/ARVORE.txt`

## 🧭 Servidor Local

Para testar o projeto localmente:

```bash
# Python
python -m http.server 8000

# Acesse no navegador
http://localhost:8000/
```

## 📋 Checklist de Navegação

- ✅ Todas as pastas organizadas por funcionalidade
- ✅ Redirecionamentos criados para compatibilidade
- ✅ Documentação centralizada em /docs
- ✅ Módulos JS em assets/js/modules
- ⏳ Atualizar imports nos arquivos HTML
- ⏳ Atualizar links de navegação
- ⏳ Testar todas as páginas

---

**Última atualização:** 01/11/2025
