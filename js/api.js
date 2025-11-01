/**
 * HubBS API - Interface para interação com o banco de dados
 * Simula uma API REST usando o banco local
 */

class HubAPI {
    constructor() {
        this.db = window.hubDB;
        this.currentUser = this.getCurrentUser();
    }

    /**
     * Obter usuário atual da sessão
     */
    getCurrentUser() {
        const userEmail = sessionStorage.getItem('userEmail');
        const userRole = sessionStorage.getItem('userRole');
        const userName = sessionStorage.getItem('userName');
        
        if (!userEmail) return null;
        
        return {
            email: userEmail,
            role: userRole,
            name: userName
        };
    }

    /**
     * Login de usuário
     */
    async login(email, password) {
        // Verificar se é admin
        if (email === 'admin' && password === 'admin') {
            sessionStorage.setItem('userRole', 'empresa');
            sessionStorage.setItem('userName', 'Empresa Demo');
            sessionStorage.setItem('userEmail', 'admin@empresa.com');
            sessionStorage.setItem('isLoggedIn', 'true');
            return { success: true, role: 'empresa' };
        }

        // Buscar usuário no banco
        try {
            const usuario = await this.db.getUsuarioByEmail(email);
            
            if (!usuario || usuario.senha !== password) {
                return { success: false, message: 'Email ou senha incorretos' };
            }

            sessionStorage.setItem('userRole', usuario.tipo);
            sessionStorage.setItem('userName', usuario.nome);
            sessionStorage.setItem('userEmail', usuario.email);
            sessionStorage.setItem('userId', usuario.id);
            sessionStorage.setItem('isLoggedIn', 'true');

            return { success: true, role: usuario.tipo, user: usuario };

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return { success: false, message: 'Erro ao processar login' };
        }
    }

    /**
     * Registrar novo usuário
     */
    async register(userData) {
        try {
            // Verificar se email já existe
            const existingUser = await this.db.getUsuarioByEmail(userData.email);
            if (existingUser) {
                return { success: false, message: 'Email já cadastrado' };
            }

            const userId = await this.db.addUsuario(userData);
            return { success: true, userId: userId };

        } catch (error) {
            console.error('Erro ao registrar:', error);
            return { success: false, message: 'Erro ao criar conta' };
        }
    }

    /**
     * Enviar novo relato
     */
    async enviarRelato(relato) {
        try {
            const userId = sessionStorage.getItem('userId');
            
            const novoRelato = {
                ...relato,
                usuarioId: userId ? parseInt(userId) : null,
                data: new Date().toISOString(),
                status: 'em_analise'
            };

            const relatoId = await this.db.addRelato(novoRelato);

            // Gerar protocolo
            const ano = new Date().getFullYear();
            const protocolo = `HubBS-${ano}-${String(relatoId).padStart(6, '0')}`;

            // Adicionar pontos ao usuário se estiver logado
            let pontosGanhos = 10;
            if (userId) {
                await this.db.addPontos(parseInt(userId), pontosGanhos, 'Relato enviado');
            }

            return { 
                success: true, 
                relatoId: relatoId,
                protocolo: protocolo,
                pontosGanhos: pontosGanhos
            };

        } catch (error) {
            console.error('Erro ao enviar relato:', error);
            return { success: false, error: 'Erro ao enviar relato. Tente novamente.' };
        }
    }

    /**
     * Buscar relatos com filtros
     */
    async buscarRelatos(filtros = {}) {
        try {
            const relatos = await this.db.getRelatos(filtros);
            return { success: true, data: relatos };
        } catch (error) {
            console.error('Erro ao buscar relatos:', error);
            return { success: false, message: 'Erro ao buscar dados' };
        }
    }

    /**
     * Obter estatísticas
     */
    async getEstatisticas() {
        try {
            const stats = await this.db.getEstatisticas();
            return { success: true, data: stats };
        } catch (error) {
            console.error('Erro ao obter estatísticas:', error);
            return { success: false, message: 'Erro ao carregar estatísticas' };
        }
    }

    /**
     * Atualizar status de relato (apenas empresas)
     */
    async atualizarRelato(relatoId, updates) {
        try {
            if (this.currentUser?.role !== 'empresa') {
                return { success: false, message: 'Sem permissão' };
            }

            const relato = await this.db.updateRelato(relatoId, updates);
            return { success: true, data: relato };

        } catch (error) {
            console.error('Erro ao atualizar relato:', error);
            return { success: false, message: 'Erro ao atualizar' };
        }
    }

    /**
     * Obter dados para dashboard público
     */
    async getDashboardData() {
        try {
            const [relatosResult, statsResult] = await Promise.all([
                this.buscarRelatos(),
                this.getEstatisticas()
            ]);

            if (!relatosResult.success || !statsResult.success) {
                throw new Error('Erro ao carregar dados');
            }

            return {
                success: true,
                data: {
                    relatos: relatosResult.data,
                    estatisticas: statsResult.data
                }
            };

        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
            return { success: false, message: 'Erro ao carregar dados' };
        }
    }

    /**
     * Obter dados para dashboard da empresa
     */
    async getEmpresaDashboard(filtros = {}) {
        try {
            if (this.currentUser?.role !== 'empresa') {
                return { success: false, message: 'Acesso negado' };
            }

            const stats = await this.getEstatisticas();
            const relatos = await this.buscarRelatos(filtros);

            return {
                success: true,
                data: {
                    estatisticas: stats.data,
                    relatos: relatos.data,
                    totalCidadaos: 1542, // Simulado
                    avaliacaoMedia: 4.8,
                    roi: 328
                }
            };

        } catch (error) {
            console.error('Erro ao carregar dashboard empresa:', error);
            return { success: false, message: 'Erro ao carregar dados' };
        }
    }

    /**
     * Exportar relatório
     */
    async exportarRelatorio() {
        try {
            const data = await this.db.exportData();
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `HubBS-relatorio-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            return { success: true };

        } catch (error) {
            console.error('Erro ao exportar:', error);
            return { success: false, message: 'Erro ao exportar' };
        }
    }

    /**
     * Simular envio de WhatsApp
     */
    async enviarWhatsApp(mensagem) {
        console.log('📱 Mensagem WhatsApp simulada:', mensagem);
        
        // Extrair informações da mensagem
        const categoriaMatch = mensagem.match(/categoria:\s*(\w+)/i);
        const localMatch = mensagem.match(/local:\s*(.+)/i);
        
        if (!categoriaMatch || !localMatch) {
            return { success: false, message: 'Formato inválido. Use: Categoria: [tipo] Local: [endereço] Descrição: [texto]' };
        }

        // Mapear categoria para ODS
        const categoriaMapeamento = {
            'transporte': 'ods-9',
            'infraestrutura': 'ods-9',
            'saneamento': 'ods-11',
            'lixo': 'ods-13',
            'meio_ambiente': 'ods-13',
            'espacos_publicos': 'ods-11'
        };

        const categoria = categoriaMatch[1].toLowerCase();
        const ods = categoriaMapeamento[categoria] || 'ods-11';

        const relato = {
            categoria: categoria,
            ods: ods,
            descricao: mensagem,
            cidade: 'santos', // Detectar automaticamente
            origem: 'whatsapp'
        };

        return await this.enviarRelato(relato);
    }

    /**
     * Resetar banco para demo
     */
    async resetDemo() {
        try {
            await this.db.clearDatabase();
            await this.db.seedDatabase();
            return { success: true, message: 'Banco resetado com sucesso' };
        } catch (error) {
            console.error('Erro ao resetar:', error);
            return { success: false, message: 'Erro ao resetar banco' };
        }
    }
}

// Instância global da API
const hubAPI = new HubAPI();
window.hubAPI = hubAPI;

console.log('🌐 HubBS API carregada');

