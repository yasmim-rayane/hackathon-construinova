/**
 * User Session Manager
 * Gerencia a sessão do usuário logado em todas as páginas
 */

class SessionManager {
    constructor() {
        this.userWidget = null;
        this.init();
    }

    async init() {
        // Aguarda o auth carregar
        if (typeof auth === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        await auth.init();
        this.renderUserWidget();
        this.updateUserInfo();
    }

    /**
     * Renderiza o widget do usuário na navbar
     */
    renderUserWidget() {
        const userWidgetContainer = document.getElementById('user-widget');
        if (!userWidgetContainer) return;

        if (auth.isAuthenticated()) {
            const user = auth.getCurrentUser();
            userWidgetContainer.innerHTML = this.getAuthenticatedWidget(user);
            this.attachUserWidgetEvents();
        } else {
            userWidgetContainer.innerHTML = this.getGuestWidget();
        }
    }

    /**
     * Widget para usuário autenticado
     */
    getAuthenticatedWidget(user) {
        const avatar = user.avatar || { iniciais: 'U', cor: '#005F73' };
        const iniciais = typeof avatar === 'object' ? avatar.iniciais : avatar.substring(0, 2);
        const cor = typeof avatar === 'object' ? avatar.cor : '#005F73';

        return `
            <div class="relative">
                <button id="user-menu-button" class="flex items-center gap-2 hover:opacity-80 transition">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" 
                         style="background-color: ${cor}">
                        ${iniciais}
                    </div>
                    <div class="hidden md:block text-left">
                        <div class="text-sm font-semibold text-gray-800">${user.nome}</div>
                        <div class="text-xs text-gray-600">${user.pontos || 0} pontos</div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-600 text-sm"></i>
                </button>
                
                <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div class="p-4 border-b border-gray-200">
                        <div class="font-semibold text-gray-800">${user.nome}</div>
                        <div class="text-sm text-gray-600">${user.email}</div>
                        <div class="mt-2 flex items-center gap-2">
                            <span class="text-sm text-gray-600">Nível ${user.nivel || 1}</span>
                            <span class="text-sm font-semibold text-vibrant-teal">${user.pontos || 0} pts</span>
                        </div>
                    </div>
                    <div class="p-2">
                        <a href="dashboard.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-tachometer-alt mr-2"></i>Dashboard
                        </a>
                        <a href="meus-relatos.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-clipboard-list mr-2"></i>Meus Relatos
                        </a>
                        <a href="recompensas.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-gift mr-2"></i>Recompensas
                        </a>
                        <a href="perfil.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                            <i class="fas fa-user-cog mr-2"></i>Configurações
                        </a>
                    </div>
                    <div class="p-2 border-t border-gray-200">
                        <button id="logout-button" class="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg text-left">
                            <i class="fas fa-sign-out-alt mr-2"></i>Sair
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Widget para visitante (não autenticado)
     */
    getGuestWidget() {
        return `
            <div class="flex items-center gap-2">
                <a href="pages/login.html" class="px-4 py-2 text-deep-blue hover:text-vibrant-teal transition font-semibold">
                    Entrar
                </a>
                <a href="pages/signup.html" class="px-4 py-2 bg-deep-blue text-white rounded-lg hover:bg-vibrant-teal transition font-semibold">
                    Criar Conta
                </a>
            </div>
        `;
    }

    /**
     * Anexa eventos ao widget do usuário
     */
    attachUserWidgetEvents() {
        const menuButton = document.getElementById('user-menu-button');
        const dropdown = document.getElementById('user-dropdown');
        const logoutButton = document.getElementById('logout-button');

        if (menuButton && dropdown) {
            menuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('hidden');
            });

            // Fecha o dropdown ao clicar fora
            document.addEventListener('click', (e) => {
                if (!menuButton.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.add('hidden');
                }
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                if (confirm('Deseja realmente sair?')) {
                    auth.logout();
                }
            });
        }
    }

    /**
     * Atualiza informações do usuário na página
     */
    updateUserInfo() {
        if (!auth.isAuthenticated()) return;

        const user = auth.getCurrentUser();

        // Atualiza elementos com dados do usuário
        const userNameElements = document.querySelectorAll('[data-user-name]');
        userNameElements.forEach(el => {
            el.textContent = user.nome;
        });

        const userEmailElements = document.querySelectorAll('[data-user-email]');
        userEmailElements.forEach(el => {
            el.textContent = user.email;
        });

        const userPointsElements = document.querySelectorAll('[data-user-points]');
        userPointsElements.forEach(el => {
            el.textContent = user.pontos || 0;
        });

        const userLevelElements = document.querySelectorAll('[data-user-level]');
        userLevelElements.forEach(el => {
            el.textContent = user.nivel || 1;
        });
    }

    /**
     * Requer autenticação - redireciona se não estiver logado
     */
    requireAuth() {
        return auth.requireAuth();
    }

    /**
     * Requer tipo de usuário específico
     */
    requireRole(roles) {
        return auth.requireRole(roles);
    }
}

// Instância global
const sessionManager = new SessionManager();

// Função auxiliar para páginas protegidas
function requireAuth() {
    return sessionManager.requireAuth();
}

function requireRole(roles) {
    return sessionManager.requireRole(roles);
}
