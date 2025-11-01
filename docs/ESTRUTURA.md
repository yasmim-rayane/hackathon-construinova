# 📁 Estrutura de Pastas - HubBS

## 🗂️ Nova Organização

```
Hackathon/
│
├── 📄 index.html                    # Página inicial
├── 📄 README.md                     # Documentação principal do projeto
│
├── 📁 assets/                       # Recursos estáticos
│   ├── 📁 css/                      # Estilos CSS
│   ├── 📁 img/                      # Imagens e ícones
│   └── 📁 js/                       # Scripts JavaScript
│       ├── app.js                   # Script principal da aplicação
│       ├── dashboard.js             # Scripts do dashboard
│       ├── script.js                # Scripts gerais
│       └── 📁 modules/              # Módulos do sistema
│           ├── api.js               # Wrapper da API
│           ├── auth.js              # Sistema de autenticação
│           ├── database.js          # Gerenciamento IndexedDB
│           ├── init-test-data.js    # Dados de teste
│           ├── login.js             # Lógica de login
│           ├── session.js           # Gerenciamento de sessão
│           └── signup.js            # Lógica de cadastro
│
├── 📁 pages/                        # Páginas do sistema
│   │
│   ├── 📁 admin/                    # Área administrativa
│   │   └── [páginas de admin]
│   │
│   ├── 📁 auth/                     # Autenticação
│   │   ├── login.html               # Página de login
│   │   ├── signup.html              # Página de cadastro
│   │   └── test-auth.html           # Testes de autenticação
│   │
│   ├── 📁 empresa/                  # Área empresarial
│   │   ├── empresa.html             # Landing page empresas
│   │   └── empresa-dashboard.html   # Dashboard empresas
│   │
│   ├── 📁 relatos/                  # Sistema de relatos
│   │   ├── enviar-relato.html       # Formulário de relato
│   │   ├── buscar-protocolo.html    # Busca de protocolo
│   │   ├── meus-relatos.html        # Relatos do usuário
│   │   └── whatsapp-bot.html        # Bot WhatsApp
│   │
│   └── 📁 sistema/                  # Páginas do sistema
│       ├── dashboard.html           # Dashboard principal
│       ├── recompensas.html         # Sistema de recompensas
│       ├── planos.html              # Planos e preços
│       ├── sobre.html               # Sobre o projeto
│       └── test-db.html             # Testes do banco de dados
│
└── 📁 docs/                         # Documentação
    ├── AUTENTICACAO.md              # Doc. sistema de autenticação
    └── JS_MODULES.md                # Doc. módulos JavaScript
```

## 🔄 Mapeamento de Mudanças

### Arquivos JavaScript
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `js/api.js` | `assets/js/modules/api.js` |
| `js/auth.js` | `assets/js/modules/auth.js` |
| `js/database.js` | `assets/js/modules/database.js` |
| `js/init-test-data.js` | `assets/js/modules/init-test-data.js` |
| `js/login.js` | `assets/js/modules/login.js` |
| `js/session.js` | `assets/js/modules/session.js` |
| `js/signup.js` | `assets/js/modules/signup.js` |

### Páginas de Autenticação
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `pages/login.html` | `pages/auth/login.html` |
| `pages/signup.html` | `pages/auth/signup.html` |
| `pages/test-auth.html` | `pages/auth/test-auth.html` |

### Páginas de Relatos
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `pages/enviar-relato.html` | `pages/relatos/enviar-relato.html` |
| `pages/buscar-protocolo.html` | `pages/relatos/buscar-protocolo.html` |
| `pages/meus-relatos.html` | `pages/relatos/meus-relatos.html` |
| `pages/whatsapp-bot.html` | `pages/relatos/whatsapp-bot.html` |

### Páginas do Sistema
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `pages/dashboard.html` | `pages/sistema/dashboard.html` |
| `pages/recompensas.html` | `pages/sistema/recompensas.html` |
| `pages/planos.html` | `pages/sistema/planos.html` |
| `pages/sobre.html` | `pages/sistema/sobre.html` |
| `pages/test-db.html` | `pages/sistema/test-db.html` |

### Páginas de Empresa
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `pages/empresa.html` | `pages/empresa/empresa.html` |
| `pages/empresa-dashboard.html` | `pages/empresa/empresa-dashboard.html` |

### Administração
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `admin/` | `pages/admin/` |

### Documentação
| Localização Antiga | Localização Nova |
|-------------------|------------------|
| `AUTENTICACAO.md` | `docs/AUTENTICACAO.md` |
| `js/README.md` | `docs/JS_MODULES.md` |

## 📝 Atualizações Necessárias

### 1. Atualizar Imports de Scripts
Todos os arquivos HTML que importam scripts precisam atualizar os caminhos:

**Antes:**
```html
<script src="../js/auth.js"></script>
<script src="../js/database.js"></script>
```

**Depois:**
```html
<script src="../assets/js/modules/auth.js"></script>
<script src="../assets/js/modules/database.js"></script>
```

### 2. Atualizar Links Internos
Links para páginas movidas precisam ser atualizados:

**Antes:**
```html
<a href="pages/login.html">Login</a>
<a href="pages/dashboard.html">Dashboard</a>
```

**Depois:**
```html
<a href="pages/auth/login.html">Login</a>
<a href="pages/sistema/dashboard.html">Dashboard</a>
```

### 3. Atualizar Redirecionamentos
Scripts que fazem redirecionamento precisam novos caminhos:

**Antes:**
```javascript
window.location.href = 'dashboard.html';
window.location.href = '../pages/login.html';
```

**Depois:**
```javascript
window.location.href = '../sistema/dashboard.html';
window.location.href = '../auth/login.html';
```

## 🎯 Benefícios da Nova Estrutura

✅ **Organização Clara** - Arquivos agrupados por funcionalidade
✅ **Fácil Navegação** - Estrutura intuitiva e hierárquica  
✅ **Manutenção Simplificada** - Mais fácil encontrar e editar arquivos
✅ **Escalabilidade** - Facilita adição de novas funcionalidades
✅ **Separação de Responsabilidades** - Módulos bem definidos
✅ **Documentação Centralizada** - Tudo em /docs

## 🚀 Próximos Passos

1. ⏳ Atualizar todos os caminhos de imports nos arquivos HTML
2. ⏳ Atualizar links de navegação no menu
3. ⏳ Atualizar redirecionamentos JavaScript
4. ⏳ Testar todas as páginas após mudanças
5. ⏳ Atualizar README.md principal com nova estrutura

---

**Última atualização:** 01/11/2025  
**Versão:** 2.0 - Estrutura Reorganizada
