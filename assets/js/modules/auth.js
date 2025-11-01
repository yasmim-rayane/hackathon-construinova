/**
 * HubBS Authentication System
 * Sistema de autenticação com IndexedDB e localStorage
 */

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.sessionKey = 'hubbs_session';
        this.init();
    }

    /**
     * Inicializa o sistema de autenticação
     */
    async init() {
        // Verifica se há uma sessão ativa
        const session = this.getSession();
        if (session) {
            this.currentUser = session;
            console.log('✅ Sessão ativa encontrada:', session.nome);
        }
    }

    /**
     * Registra um novo usuário
     */
    async register(userData) {
        try {
            // Validações
            if (!userData.nome || !userData.email || !userData.senha) {
                throw new Error('Preencha todos os campos obrigatórios');
            }

            if (!this.validateEmail(userData.email)) {
                throw new Error('E-mail inválido');
            }

            if (userData.senha.length < 6) {
                throw new Error('A senha deve ter pelo menos 6 caracteres');
            }

            // Verifica se o e-mail já existe
            const existingUser = await this.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Este e-mail já está cadastrado');
            }

            // Cria o usuário no banco
            const db = new HubDatabase();
            await db.waitForInit();

            const novoUsuario = {
                nome: userData.nome,
                email: userData.email.toLowerCase(),
                senha: await this.hashPassword(userData.senha), // Em produção, usar bcrypt
                telefone: userData.telefone || '',
                cidade: userData.cidade || '',
                tipo: userData.tipo || 'cidadao', // cidadao, empresa
                pontos: 0,
                nivel: 1,
                avatar: userData.avatar || this.getDefaultAvatar(userData.nome),
                dataCriacao: new Date().toISOString(),
                ativo: true
            };

            const userId = await db.addUsuario(novoUsuario);
            novoUsuario.id = userId;

            // Remove a senha do objeto antes de salvar na sessão
            delete novoUsuario.senha;

            console.log('✅ Usuário registrado com sucesso:', novoUsuario);
            return {
                success: true,
                user: novoUsuario,
                message: 'Cadastro realizado com sucesso!'
            };

        } catch (error) {
            console.error('❌ Erro ao registrar usuário:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    /**
     * Faz login do usuário
     */
    async login(email, senha) {
        try {
            console.log('🔐 [AUTH] Iniciando login para:', email);
            
            if (!email || !senha) {
                throw new Error('Preencha e-mail e senha');
            }

            // Busca o usuário pelo e-mail
            console.log('🔍 [AUTH] Buscando usuário no banco...');
            const user = await this.getUserByEmail(email.toLowerCase());
            
            console.log('👤 [AUTH] Usuário encontrado:', user ? 'SIM' : 'NÃO');
            if (user) {
                console.log('📧 [AUTH] Email do usuário:', user.email);
                console.log('🏷️ [AUTH] Tipo do usuário:', user.tipo);
                console.log('✅ [AUTH] Usuário ativo:', user.ativo);
            }
            
            if (!user) {
                console.error('❌ [AUTH] Usuário não encontrado para email:', email);
                throw new Error('E-mail ou senha incorretos');
            }

            // Verifica a senha
            console.log('🔑 [AUTH] Verificando senha...');
            const senhaValida = await this.verifyPassword(senha, user.senha);
            console.log('🔑 [AUTH] Senha válida:', senhaValida);
            
            if (!senhaValida) {
                console.error('❌ [AUTH] Senha incorreta');
                throw new Error('E-mail ou senha incorretos');
            }

            if (!user.ativo) {
                console.error('❌ [AUTH] Usuário inativo');
                throw new Error('Usuário inativo. Entre em contato com o suporte.');
            }

            // Remove a senha do objeto
            delete user.senha;

            // Cria a sessão
            this.createSession(user);
            this.currentUser = user;

            console.log('✅ [AUTH] Login realizado com sucesso:', user.nome);
            return {
                success: true,
                user: user,
                message: 'Login realizado com sucesso!'
            };

        } catch (error) {
            console.error('❌ [AUTH] Erro ao fazer login:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    /**
     * Faz logout do usuário
     */
    logout() {
        try {
            // Limpar todas as chaves possíveis de sessão
            localStorage.removeItem(this.sessionKey);
            localStorage.removeItem('hubbs_session');
            localStorage.removeItem('hub_current_user');
            localStorage.removeItem('currentUser');
            
            // Limpar sessionStorage também
            sessionStorage.clear();
            
            // Resetar currentUser
            this.currentUser = null;
            
            console.log('✅ Logout realizado com sucesso');
            console.log('🧹 LocalStorage limpo');
            console.log('🧹 SessionStorage limpo');
            
            return true;
        } catch (error) {
            console.error('❌ Erro ao fazer logout:', error);
            // Mesmo com erro, tentar limpar manualmente
            localStorage.clear();
            sessionStorage.clear();
            return true;
        }
    }

    /**
     * Cria uma sessão para o usuário
     */
    createSession(user) {
        const session = {
            ...user,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
    }

    /**
     * Obtém a sessão atual
     */
    getSession() {
        const sessionData = localStorage.getItem(this.sessionKey);
        return sessionData ? JSON.parse(sessionData) : null;
    }

    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated() {
        return this.currentUser !== null;
    }

    /**
     * Obtém o usuário atual
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Busca usuário por e-mail no banco
     */
    async getUserByEmail(email) {
        const db = new HubDatabase();
        await db.waitForInit();
        return await db.getUsuarioByEmail(email);
    }

    /**
     * Valida formato de e-mail
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Hash simples de senha (em produção usar bcrypt)
     */
    async hashPassword(senha) {
        // Simples hash para demonstração
        // Em produção, usar bcrypt ou similar no backend
        return btoa(senha + 'hubbs_salt_2025');
    }

    /**
     * Verifica senha
     */
    async verifyPassword(senha, hash) {
        const senhaHash = await this.hashPassword(senha);
        return senhaHash === hash;
    }

    /**
     * Gera avatar padrão com iniciais
     */
    getDefaultAvatar(nome) {
        const iniciais = nome
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
        
        const colors = ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return {
            iniciais: iniciais,
            cor: color
        };
    }

    /**
     * Atualiza dados do usuário
     */
    async updateUser(userId, updates) {
        try {
            const db = new HubDatabase();
            await db.waitForInit();
            
            await db.updateUsuario(userId, updates);
            
            // Atualiza a sessão se for o usuário atual
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser = { ...this.currentUser, ...updates };
                this.createSession(this.currentUser);
            }

            return {
                success: true,
                message: 'Dados atualizados com sucesso!'
            };
        } catch (error) {
            console.error('❌ Erro ao atualizar usuário:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    /**
     * Adiciona pontos ao usuário
     */
    async addPoints(userId, pontos, motivo) {
        try {
            const db = new HubDatabase();
            await db.waitForInit();
            
            const usuario = await db.getUsuario(userId);
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            const novosPontos = (usuario.pontos || 0) + pontos;
            await db.updateUsuario(userId, { pontos: novosPontos });

            // Registra a transação
            await db.addTransacao({
                usuarioId: userId,
                tipo: 'ganho',
                pontos: pontos,
                motivo: motivo,
                data: new Date().toISOString()
            });

            // Atualiza sessão se for o usuário atual
            if (this.currentUser && this.currentUser.id === userId) {
                this.currentUser.pontos = novosPontos;
                this.createSession(this.currentUser);
            }

            return {
                success: true,
                pontos: novosPontos
            };
        } catch (error) {
            console.error('❌ Erro ao adicionar pontos:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }

    /**
     * Requer autenticação - redireciona se não autenticado
     */
    requireAuth(redirectUrl = '../pages/login.html') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    /**
     * Requer tipo de usuário específico
     */
    requireRole(roles = []) {
        if (!this.isAuthenticated()) {
            return false;
        }
        
        if (Array.isArray(roles) && roles.length > 0) {
            return roles.includes(this.currentUser.tipo);
        }
        
        return true;
    }
}

// Instância global
const auth = new AuthSystem();
