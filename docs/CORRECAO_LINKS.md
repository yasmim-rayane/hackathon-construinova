# Script de Correção de Links - HubBS
# Mapeamento completo de caminhos após reorganização

## Estrutura Atual
```
pages/
├── auth/
│   ├── login.html
│   ├── signup.html
│   └── test-auth.html
├── relatos/
│   ├── enviar-relato.html
│   ├── buscar-protocolo.html
│   ├── meus-relatos.html
│   └── whatsapp-bot.html
├── sistema/
│   ├── dashboard.html
│   ├── recompensas.html
│   ├── planos.html
│   ├── sobre.html
│   └── test-db.html
├── empresa/
│   ├── empresa.html
│   └── empresa-dashboard.html
└── admin/
    └── database.html
```

## Regras de Navegação

### De: index.html (raiz)
- Login → `pages/auth/login.html`
- Signup → `pages/auth/signup.html`
- Dashboard → `pages/sistema/dashboard.html`
- Sobre → `pages/sistema/sobre.html`
- Planos → `pages/sistema/planos.html`
- Recompensas → `pages/sistema/recompensas.html`
- Enviar Relato → `pages/relatos/enviar-relato.html`
- WhatsApp Bot → `pages/relatos/whatsapp-bot.html`
- Buscar Protocolo → `pages/relatos/buscar-protocolo.html`

### De: pages/auth/* (login, signup, test-auth)
- Index → `../../index.html`
- Login → `login.html` (mesmo diretório)
- Signup → `signup.html` (mesmo diretório)
- Dashboard → `../sistema/dashboard.html`
- Sobre → `../sistema/sobre.html`
- Planos → `../sistema/planos.html`
- Scripts → `../../assets/js/modules/`

### De: pages/relatos/* (enviar-relato, buscar-protocolo, etc)
- Index → `../../index.html`
- Login → `../auth/login.html`
- Signup → `../auth/signup.html`
- Dashboard → `../sistema/dashboard.html`
- Sobre → `../sistema/sobre.html`
- WhatsApp Bot → `whatsapp-bot.html` (mesmo diretório)
- Scripts → `../../assets/js/modules/`

### De: pages/sistema/* (dashboard, recompensas, planos, sobre)
- Index → `../../index.html`
- Login → `../auth/login.html`
- Signup → `../auth/signup.html`
- Dashboard → `dashboard.html` (mesmo diretório)
- Sobre → `sobre.html` (mesmo diretório)
- Planos → `planos.html` (mesmo diretório)
- Recompensas → `recompensas.html` (mesmo diretório)
- Enviar Relato → `../relatos/enviar-relato.html`
- WhatsApp Bot → `../relatos/whatsapp-bot.html`
- Scripts → `../../assets/js/modules/`

### De: pages/empresa/* (empresa, empresa-dashboard)
- Index → `../../index.html`
- Login → `../auth/login.html`
- Signup → `../auth/signup.html`
- Scripts → `../../assets/js/modules/`

## Imports JavaScript

### Todos os arquivos HTML devem usar:
```html
<!-- Database e Auth -->
<script src="../../assets/js/modules/database.js"></script>
<script src="../../assets/js/modules/auth.js"></script>
<script src="../../assets/js/modules/api.js"></script>

<!-- Específicos -->
<script src="../../assets/js/modules/login.js" defer></script>
<script src="../../assets/js/modules/signup.js" defer></script>
<script src="../../assets/js/modules/session.js"></script>
```

## Assets (CSS, Imagens)

### De qualquer pasta em pages/*/
```html
<link href="../../assets/css/style.css" rel="stylesheet">
<img src="../../assets/img/logo.jpeg" alt="Logo">
```
