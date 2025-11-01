# 🌊 HUB - Dados Urbanos Inteligentes | Baixada Santista

![HUB - Plataforma de Dados Urbanos](https://via.placeholder.com/800x200/0077B6/ffffff?text=HUB+-+Dados+Urbanos+da+Baixada+Santista)

## 📋 Sobre o Projeto

**HUB** é uma plataforma inovadora focada em coletar, processar e comercializar dados e métricas de reclamações de cidadãos sobre problemas urbanos e de infraestrutura na **Baixada Santista**. 

### 🎯 Missão
Transformar reclamações de cidadãos em dados estratégicos para empresas investirem de forma sustentável, alinhados aos **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU.

### 💡 Como Funciona
1. **Cidadãos** enviam reclamações via WhatsApp sobre problemas urbanos
2. Dados são armazenados no **Firebase (Firestore)**
3. Sistema converte em **métricas ODS**
4. **Empresas** acessam relatórios para decisões estratégicas de investimento

## 🎨 Identidade Visual

### Paleta de Cores (Temática Praiana e Sustentável)

```css
Azul Oceano:   #0077B6  /* Cor principal - confiabilidade e mar */
Turquesa:      #90E0EF  /* Destaques e hover states */
Areia Suave:   #F5E6CA  /* Background neutro */
Verde Água:    #00B4D8  /* Botões e links */
Cinza Escuro:  #2E2E2E  /* Textos principais */
Branco Gelo:   #FAFAFA  /* Fundos e contraste */
```

A identidade visual reflete a atmosfera praiana e sustentável da Baixada Santista, transmitindo leveza, tecnologia e confiança.

## ✨ Funcionalidades Principais

### 🏠 Página Inicial (`index.html`)
- Landing page moderna com Hero Section
- Apresentação do fluxo de dados (Cidadão → Firebase → Métricas → Empresas)
- Seção sobre ODS da ONU
- Estatísticas em tempo real
- Call-to-actions para WhatsApp, Dashboard e Empresas

### 📖 Sobre a HUB (`sobre.html`)
- Missão e Visão da empresa
- 3 Pilares Fundamentais:
  - **ODS**: Alinhamento com Objetivos de Desenvolvimento Sustentável
  - **Sustentabilidade**: Decisões empresariais conscientes
  - **Dados Éticos**: LGPD, consentimento e transparência
- Fluxo detalhado de dados com detalhes técnicos
- Compromisso com a Baixada Santista

### 📊 Dashboard Público (`dashboard.html`)
- **Visualizações com Chart.js**:
  - Gráfico de barras: Reclamações por Categoria
  - Gráfico de rosca: Distribuição por ODS
  - Gráfico de linhas: Tendência Mensal
- Mapa de calor da Baixada Santista (9 cidades)
- Estatísticas rápidas (Total, Resolvidas, Em Análise, Taxa de Resolução)
- Principais insights por categoria

### 🎁 Sistema de Recompensas (`recompensas.html`)
- Explicação do sistema de pontos
- Como funciona: Enviar → Acumular → Trocar
- Parcerias com:
  - iFood (cupons)
  - Uber (descontos em corridas)
  - Rappi (frete grátis)
  - Cinemark (ingressos)

### 🏢 Painel de Empresas (`empresa.html`)
- Dashboard com métricas ODS
- Visualização de reclamações categorizadas
- Sistema de filtros (Todas, Pendentes, Resolvidas)
- Simulação de ROI
- Relatórios por cidade e bairro

### 🔐 Autenticação
- **Login** (`login.html`): Interface moderna com nova paleta
- **Cadastro** (`signup.html`): Formulários validados, escolha entre Consumidor/Empresa

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **Tailwind CSS** (CDN com config customizada)
- **JavaScript ES6+**

### Visualização de Dados
- **Chart.js 4.4.0** - Gráficos interativos

### Backend/Banco de Dados (Preparado para)
- **Firebase Firestore** - Banco NoSQL
- **Firebase Cloud Storage** - Armazenamento de mídias
- **Firebase Hosting** - Hospedagem futura

### Integrações
- **WhatsApp Business API** - Coleta de reclamações
- **Geolocalização** - Mapeamento automático
- **Machine Learning** - Categorização (futuro)

## 📁 Estrutura de Arquivos

```
Hackathon/
│
├── index.html          # Landing page principal
├── sobre.html          # Sobre a HUB (missão, visão, pilares)
├── dashboard.html      # Dashboard público com gráficos
├── recompensas.html    # Sistema de recompensas e parcerias
├── empresa.html        # Painel para empresas
├── login.html          # Página de login
├── signup.html         # Página de cadastro
│
├── app.js              # JavaScript principal (validações, interatividade)
├── dashboard.js        # Lógica dos gráficos Chart.js
├── style.css           # Estilos customizados + media queries
│
└── README.md           # Esta documentação
```

## 🌍 Objetivos de Desenvolvimento Sustentável (ODS)

O projeto está alinhado com:

- **ODS 6**: Água Potável e Saneamento
- **ODS 7**: Energia Limpa e Acessível
- **ODS 9**: Indústria, Inovação e Infraestrutura
- **ODS 11**: Cidades e Comunidades Sustentáveis ⭐ (Principal)
- **ODS 14**: Vida na Água

## 📱 Responsividade

Design 100% responsivo com breakpoints Tailwind:

```javascript
// Breakpoints
sm:   640px   // Smartphones
md:   768px   // Tablets
lg:   1024px  // Desktops pequenos
xl:   1280px  // Desktops grandes
```

### Media Queries Customizadas

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

## 💻 Como Executar

### 1. Abrir o Projeto

```powershell
# PowerShell - Abrir index.html
Start-Process "c:\Users\Yasmim\Desktop\Hackathon\index.html"

# Ou navegue manualmente para qualquer arquivo HTML
```

### 2. Navegação

O site possui navegação completa entre todas as páginas:
- **Navbar responsiva** (desktop + mobile)
- **Links internos** funcionais
- **Botões de ação** para WhatsApp, Dashboards, etc.

### 3. Testar Funcionalidades

#### Cadastro de Usuário
1. Acesse `signup.html`
2. Preencha o formulário
3. Escolha tipo de conta (Consumidor/Empresa)
4. Os dados são salvos no `localStorage`

#### Login
1. Acesse `login.html`
2. Use credenciais criadas anteriormente
3. Sistema redireciona baseado no tipo de usuário

#### Dashboard
1. Acesse `dashboard.html`
2. Visualize gráficos interativos
3. Explore métricas por cidade

#### WhatsApp (Simulado)
1. Clique no botão "Enviar Reclamação" na home
2. Redireciona para `wa.me` (placeholder)

## 🔧 Configuração do Tailwind CSS

O projeto usa Tailwind via CDN com configuração inline:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'ocean-blue': '#0077B6',
                'turquoise': '#90E0EF',
                'sand': '#F5E6CA',
                'aqua-green': '#00B4D8',
                'dark-gray': '#2E2E2E',
                'ice-white': '#FAFAFA',
            }
        }
    }
}
```

## 📊 Dados Simulados (Dashboard)

### Estatísticas
- Total de Reclamações: **2,548**
- Resolvidas: **1,892**
- Em Análise: **656**
- Taxa de Resolução: **74%**

### Cidades da Baixada Santista
1. Santos - 842 reclamações
2. São Vicente - 456
3. Guarujá - 321
4. Praia Grande - 287
5. Cubatão - 198
6. Itanhaém - 156
7. Mongaguá - 124
8. Peruíbe - 98
9. Bertioga - 66

## 🎯 Funcionalidades JavaScript

### Validação de Formulários
```javascript
- Email: Regex validation
- Senha: Mínimo 6 caracteres
- Confirmação de senha
- Aceite de termos
```

### LocalStorage
```javascript
// Estrutura de dados
{
    id: timestamp,
    name: string,
    email: string,
    password: string (não recomendado em produção),
    userType: 'consumer' | 'company',
    createdAt: ISOString
}
```

### Gráficos (Chart.js)
```javascript
- categoryChart: Gráfico de barras
- odsChart: Gráfico de rosca
- trendChart: Gráfico de linhas
```

## 🔐 Segurança e Privacidade

- **LGPD Compliant**: Coleta com consentimento
- **Anonimização**: Dados sensíveis protegidos
- **Criptografia**: End-to-end no Firebase
- **Transparência**: Fluxo de dados documentado

## 🚧 Próximos Passos (Roadmap)

- [ ] Integração real com Firebase
- [ ] WhatsApp Business API funcional
- [ ] Google Maps API para mapa interativo
- [ ] Sistema de notificações em tempo real
- [ ] Machine Learning para categorização automática
- [ ] API REST para empresas
- [ ] Mobile App (React Native)
- [ ] Dashboard administrativo
- [ ] Sistema de pagamento para empresas
- [ ] Gamificação do sistema de recompensas

## 📞 Contato

- **Email**: contato@hub.com.br
- **WhatsApp**: (13) 99999-9999
- **Endereço**: Santos, SP - Brasil

## 👥 Equipe

Desenvolvido para o **Hackathon Construinova 2025**

## 📄 Licença

Projeto desenvolvido para fins educacionais e competição de hackathon.

---

**🌊 HUB - Transformando dados urbanos em oportunidades sustentáveis**

*Alinhado com os Objetivos de Desenvolvimento Sustentável da ONU*
