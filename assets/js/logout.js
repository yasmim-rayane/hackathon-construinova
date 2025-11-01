/**
 * Sistema de Logout Universal - HubBS
 * Gerencia o logout do usuário em todas as páginas
 */

class LogoutManager {
    constructor() {
        this.init();
    }

    init() {
        // Aguarda o DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.attachLogoutButtons());
        } else {
            this.attachLogoutButtons();
        }
    }

    /**
     * Anexa eventos a todos os botões de logout
     */
    attachLogoutButtons() {
        // Seleciona todos os possíveis botões de logout
        const logoutButtons = document.querySelectorAll(
            '#logout-button, #logout-btn, #logout-btn-mobile, .logout-btn, [data-logout]'
        );

        console.log(`🔍 Encontrados ${logoutButtons.length} botão(ões) de logout`);

        logoutButtons.forEach((button, index) => {
            console.log(`📌 Botão ${index + 1}:`, button.id || button.className);
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleLogout();
            });
        });

        // Também adiciona ao dropdown se existir
        this.attachDropdownLogout();
    }

    /**
     * Anexa logout ao dropdown do session.js
     */
    attachDropdownLogout() {
        // Observer para detectar quando o dropdown é criado dinamicamente
        const observer = new MutationObserver((mutations) => {
            const logoutButton = document.getElementById('logout-button');
            if (logoutButton && !logoutButton.dataset.logoutAttached) {
                logoutButton.dataset.logoutAttached = 'true';
                logoutButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleLogout();
                });
                console.log('✅ Logout anexado ao dropdown dinâmico');
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Processa o logout
     */
    handleLogout() {
        console.log('🚪 Iniciando processo de logout...');

        // Confirmação
        const confirmacao = confirm('Deseja realmente sair da sua conta?');
        
        if (!confirmacao) {
            console.log('❌ Logout cancelado pelo usuário');
            return;
        }

        try {
            // 1. Limpar localStorage
            console.log('🧹 Limpando localStorage...');
            const keysToRemove = [
                'hubbs_session',
                'hub_current_user',
                'currentUser',
                'userSession',
                'authToken'
            ];
            
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                console.log(`  ✓ Removido: ${key}`);
            });

            // 2. Limpar sessionStorage
            console.log('🧹 Limpando sessionStorage...');
            sessionStorage.clear();
            console.log('  ✓ SessionStorage limpo');

            // 3. Se existe auth global, usar seu método logout
            if (typeof auth !== 'undefined' && auth.logout) {
                console.log('🔐 Executando auth.logout()...');
                auth.logout();
                console.log('  ✓ Auth logout executado');
            }

            // 4. Mostrar feedback visual
            this.showLogoutFeedback();

            // 5. Redirecionar para home
            console.log('🏠 Redirecionando para home...');
            
            // Detecta o caminho correto baseado na estrutura
            const currentPath = window.location.pathname;
            let redirectPath = '../../index.html';

            if (currentPath.includes('/pages/')) {
                // Está em subpasta de pages
                if (currentPath.includes('/pages/empresa/') || 
                    currentPath.includes('/pages/cidadao/') ||
                    currentPath.includes('/pages/relatos/') ||
                    currentPath.includes('/pages/sistema/') ||
                    currentPath.includes('/pages/admin/')) {
                    redirectPath = '../../index.html';
                } else {
                    // Está direto em /pages/
                    redirectPath = '../index.html';
                }
            } else {
                // Está na raiz
                redirectPath = 'index.html';
            }

            setTimeout(() => {
                window.location.href = redirectPath;
            }, 500);

        } catch (error) {
            console.error('❌ Erro durante logout:', error);
            
            // Mesmo com erro, tenta limpar e redirecionar
            localStorage.clear();
            sessionStorage.clear();
            
            alert('Sessão encerrada. Você será redirecionado.');
            setTimeout(() => {
                window.location.href = '../../index.html';
            }, 1000);
        }
    }

    /**
     * Mostra feedback visual de logout
     */
    showLogoutFeedback() {
        // Cria um toast de feedback
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #0A9396, #005F73);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 99999;
                font-family: 'Poppins', sans-serif;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 12px;
                animation: slideIn 0.3s ease-out;
            ">
                <i class="fas fa-check-circle" style="font-size: 20px;"></i>
                <span>Logout realizado com sucesso!</span>
            </div>
        `;

        // Adiciona animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(toast);

        console.log('✅ Feedback visual exibido');
    }

    /**
     * Verifica se o usuário está logado
     */
    isLoggedIn() {
        const session = localStorage.getItem('hubbs_session');
        return !!session;
    }
}

// Inicializa o gerenciador de logout globalmente
const logoutManager = new LogoutManager();

// Torna disponível globalmente para uso em outros scripts
window.logoutManager = logoutManager;

console.log('✅ LogoutManager inicializado e pronto para uso');
