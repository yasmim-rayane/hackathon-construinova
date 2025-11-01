/**
 * HubBS Database - Sistema de Banco de Dados Local
 * Simula Firebase Firestore usando IndexedDB + localStorage
 */

class HubDatabase {
    constructor() {
        this.dbName = 'HubDatabase';
        this.version = 1;
        this.db = null;
        this.init();
    }

    /**
     * Inicializa o banco de dados IndexedDB
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error('Erro ao abrir banco de dados:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ Banco de dados HubBS inicializado');
                this.seedDatabase(); // Popular com dados simulados
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Object Store: Relatos/Reclamações
                if (!db.objectStoreNames.contains('relatos')) {
                    const relatosStore = db.createObjectStore('relatos', { keyPath: 'id', autoIncrement: true });
                    relatosStore.createIndex('cidade', 'cidade', { unique: false });
                    relatosStore.createIndex('categoria', 'categoria', { unique: false });
                    relatosStore.createIndex('ods', 'ods', { unique: false });
                    relatosStore.createIndex('status', 'status', { unique: false });
                    relatosStore.createIndex('data', 'data', { unique: false });
                }

                // Object Store: Usuários
                if (!db.objectStoreNames.contains('usuarios')) {
                    const usuariosStore = db.createObjectStore('usuarios', { keyPath: 'id', autoIncrement: true });
                    usuariosStore.createIndex('email', 'email', { unique: true });
                    usuariosStore.createIndex('tipo', 'tipo', { unique: false });
                }

                // Object Store: Empresas
                if (!db.objectStoreNames.contains('empresas')) {
                    const empresasStore = db.createObjectStore('empresas', { keyPath: 'id', autoIncrement: true });
                    empresasStore.createIndex('cnpj', 'cnpj', { unique: true });
                    empresasStore.createIndex('plano', 'plano', { unique: false });
                }

                // Object Store: Recompensas
                if (!db.objectStoreNames.contains('recompensas')) {
                    const recompensasStore = db.createObjectStore('recompensas', { keyPath: 'id', autoIncrement: true });
                    recompensasStore.createIndex('empresaId', 'empresaId', { unique: false });
                    recompensasStore.createIndex('ativo', 'ativo', { unique: false });
                }

                // Object Store: Transações de Pontos
                if (!db.objectStoreNames.contains('transacoes')) {
                    const transacoesStore = db.createObjectStore('transacoes', { keyPath: 'id', autoIncrement: true });
                    transacoesStore.createIndex('usuarioId', 'usuarioId', { unique: false });
                    transacoesStore.createIndex('tipo', 'tipo', { unique: false });
                    transacoesStore.createIndex('data', 'data', { unique: false });
                }

                console.log('📦 Estrutura do banco criada');
            };
        });
    }

    /**
     * Adicionar um relato
     */
    async addRelato(relato) {
        const transaction = this.db.transaction(['relatos'], 'readwrite');
        const store = transaction.objectStore('relatos');
        
        const novoRelato = {
            ...relato,
            data: relato.data || new Date().toISOString(),
            status: relato.status || 'em_analise'
        };

        return new Promise((resolve, reject) => {
            const request = store.add(novoRelato);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Buscar relatos com filtros
     */
    async getRelatos(filtros = {}) {
        const transaction = this.db.transaction(['relatos'], 'readonly');
        const store = transaction.objectStore('relatos');

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            
            request.onsuccess = () => {
                let relatos = request.result;

                // Aplicar filtros
                if (filtros.cidade) {
                    relatos = relatos.filter(r => r.cidade === filtros.cidade);
                }
                if (filtros.ods) {
                    relatos = relatos.filter(r => r.ods === filtros.ods);
                }
                if (filtros.status) {
                    relatos = relatos.filter(r => r.status === filtros.status);
                }
                if (filtros.categoria) {
                    relatos = relatos.filter(r => r.categoria === filtros.categoria);
                }
                if (filtros.dataInicio) {
                    relatos = relatos.filter(r => new Date(r.data) >= new Date(filtros.dataInicio));
                }
                if (filtros.dataFim) {
                    relatos = relatos.filter(r => new Date(r.data) <= new Date(filtros.dataFim));
                }

                resolve(relatos);
            };
            
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Atualizar status de um relato
     */
    async updateRelato(id, updates) {
        const transaction = this.db.transaction(['relatos'], 'readwrite');
        const store = transaction.objectStore('relatos');

        return new Promise((resolve, reject) => {
            const getRequest = store.get(id);
            
            getRequest.onsuccess = () => {
                const relato = getRequest.result;
                if (!relato) {
                    reject(new Error('Relato não encontrado'));
                    return;
                }

                const relatoAtualizado = { ...relato, ...updates };
                const updateRequest = store.put(relatoAtualizado);
                
                updateRequest.onsuccess = () => resolve(relatoAtualizado);
                updateRequest.onerror = () => reject(updateRequest.error);
            };

            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Adicionar usuário
     */
    async addUsuario(usuario) {
        const transaction = this.db.transaction(['usuarios'], 'readwrite');
        const store = transaction.objectStore('usuarios');

        const novoUsuario = {
            ...usuario,
            dataCriacao: new Date().toISOString(),
            pontos: 0,
            relatosEnviados: 0
        };

        return new Promise((resolve, reject) => {
            const request = store.add(novoUsuario);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Buscar usuário por email
     */
    async getUsuarioByEmail(email) {
        const transaction = this.db.transaction(['usuarios'], 'readonly');
        const store = transaction.objectStore('usuarios');
        const index = store.index('email');

        return new Promise((resolve, reject) => {
            const request = index.get(email);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Buscar todos os usuários
     */
    async getUsuarios() {
        const transaction = this.db.transaction(['usuarios'], 'readonly');
        const store = transaction.objectStore('usuarios');

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Adicionar pontos ao usuário
     */
    async addPontos(usuarioId, pontos, motivo) {
        // Atualizar pontos do usuário
        const transactionUsuario = this.db.transaction(['usuarios'], 'readwrite');
        const storeUsuario = transactionUsuario.objectStore('usuarios');

        const getRequest = storeUsuario.get(usuarioId);
        
        return new Promise((resolve, reject) => {
            getRequest.onsuccess = async () => {
                const usuario = getRequest.result;
                if (!usuario) {
                    reject(new Error('Usuário não encontrado'));
                    return;
                }

                usuario.pontos += pontos;
                const updateRequest = storeUsuario.put(usuario);

                updateRequest.onsuccess = async () => {
                    // Registrar transação
                    await this.addTransacao({
                        usuarioId: usuarioId,
                        tipo: 'ganho',
                        pontos: pontos,
                        motivo: motivo,
                        data: new Date().toISOString()
                    });
                    resolve(usuario);
                };

                updateRequest.onerror = () => reject(updateRequest.error);
            };

            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Adicionar transação
     */
    async addTransacao(transacao) {
        const transaction = this.db.transaction(['transacoes'], 'readwrite');
        const store = transaction.objectStore('transacoes');

        return new Promise((resolve, reject) => {
            const request = store.add(transacao);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Obter estatísticas gerais
     */
    async getEstatisticas() {
        const relatos = await this.getRelatos();
        
        const stats = {
            total: relatos.length,
            porStatus: {
                resolvido: relatos.filter(r => r.status === 'resolvido').length,
                em_progresso: relatos.filter(r => r.status === 'em_progresso').length,
                em_analise: relatos.filter(r => r.status === 'em_analise').length
            },
            porODS: {
                ods9: relatos.filter(r => r.ods === 'ods-9').length,
                ods11: relatos.filter(r => r.ods === 'ods-11').length,
                ods13: relatos.filter(r => r.ods === 'ods-13').length
            },
            porCidade: {}
        };

        // Contar por cidade
        relatos.forEach(r => {
            stats.porCidade[r.cidade] = (stats.porCidade[r.cidade] || 0) + 1;
        });

        return stats;
    }

    /**
     * Popular banco com dados simulados
     */
    async seedDatabase() {
        try {
            // Verificar se já tem dados
            const relatos = await this.getRelatos();
            if (relatos.length > 0) {
                console.log('📊 Banco já possui dados');
                return;
            }

            console.log('🌱 Populando banco de dados...');

            const cidades = ['santos', 'sao-vicente', 'guaruja', 'praia-grande', 'cubatao', 'bertioga', 'mongagua', 'itanhaem', 'peruibe'];
            const categorias = {
                'ods-9': ['transporte-publico', 'infraestrutura-urbana', 'inovacao-tecnologica', 'conectividade'],
                'ods-11': ['espacos-publicos', 'saneamento-basico', 'habitacao', 'areas-verdes'],
                'ods-13': ['gestao-residuos', 'preservacao-ambiental', 'energia-limpa', 'educacao-ambiental']
            };
            const status = ['resolvido', 'em_progresso', 'em_analise'];

            // Gerar 1200 relatos simulados
            const relatosSimulados = [];
            
            for (let i = 0; i < 1200; i++) {
                const ods = ['ods-9', 'ods-11', 'ods-13'][Math.floor(Math.random() * 3)];
                const categoriasODS = categorias[ods];
                const categoria = categoriasODS[Math.floor(Math.random() * categoriasODS.length)];
                const cidade = cidades[Math.floor(Math.random() * cidades.length)];
                const statusRelato = status[Math.floor(Math.random() * status.length)];
                
                // Data aleatória nos últimos 90 dias
                const dataRelato = new Date();
                dataRelato.setDate(dataRelato.getDate() - Math.floor(Math.random() * 90));

                relatosSimulados.push({
                    cidade: cidade,
                    categoria: categoria,
                    ods: ods,
                    status: statusRelato,
                    descricao: `Relato de ${categoria.replace(/-/g, ' ')} em ${cidade.replace(/-/g, ' ')}`,
                    data: dataRelato.toISOString(),
                    localizacao: {
                        lat: -23.9 + Math.random() * 0.5,
                        lng: -46.3 + Math.random() * 0.3
                    },
                    prioridade: ['baixa', 'media', 'alta'][Math.floor(Math.random() * 3)],
                    likes: Math.floor(Math.random() * 50),
                    visualizacoes: Math.floor(Math.random() * 200)
                });
            }

            // Adicionar todos os relatos
            for (const relato of relatosSimulados) {
                await this.addRelato(relato);
            }

            // Criar usuário demo
            await this.addUsuario({
                nome: 'João Silva',
                email: 'joao@exemplo.com',
                senha: '123456',
                tipo: 'cidadao',
                cidade: 'santos',
                telefone: '13999999999'
            });

            // Criar empresa demo
            const transaction = this.db.transaction(['empresas'], 'readwrite');
            const store = transaction.objectStore('empresas');
            
            await new Promise((resolve, reject) => {
                const request = store.add({
                    nome: 'Empresa Demo',
                    cnpj: '12.345.678/0001-00',
                    email: 'admin@empresa.com',
                    senha: 'admin',
                    plano: 'professional',
                    dataCadastro: new Date().toISOString()
                });
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });

            console.log('✅ Banco populado com 1200 relatos simulados');

        } catch (error) {
            console.error('Erro ao popular banco:', error);
        }
    }

    /**
     * Limpar todo o banco de dados
     */
    async clearDatabase() {
        const storeNames = ['relatos', 'usuarios', 'empresas', 'recompensas', 'transacoes'];
        
        for (const storeName of storeNames) {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            await new Promise((resolve, reject) => {
                const request = store.clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }
        
        console.log('🗑️ Banco de dados limpo');
    }

    /**
     * Buscar usuário por ID
     */
    async getUsuario(id) {
        const transaction = this.db.transaction(['usuarios'], 'readonly');
        const store = transaction.objectStore('usuarios');

        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Atualizar usuário
     */
    async updateUsuario(id, updates) {
        const transaction = this.db.transaction(['usuarios'], 'readwrite');
        const store = transaction.objectStore('usuarios');

        return new Promise((resolve, reject) => {
            const getRequest = store.get(id);
            
            getRequest.onsuccess = () => {
                const usuario = getRequest.result;
                if (!usuario) {
                    reject(new Error('Usuário não encontrado'));
                    return;
                }

                const usuarioAtualizado = { ...usuario, ...updates };
                const updateRequest = store.put(usuarioAtualizado);
                
                updateRequest.onsuccess = () => resolve(usuarioAtualizado);
                updateRequest.onerror = () => reject(updateRequest.error);
            };

            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    /**
     * Aguarda inicialização do banco
     */
    async waitForInit() {
        if (this.db) {
            return this.db;
        }
        
        // Aguarda até 3 segundos pela inicialização
        return new Promise((resolve, reject) => {
            let attempts = 0;
            const maxAttempts = 30;
            
            const checkInit = setInterval(() => {
                attempts++;
                if (this.db) {
                    clearInterval(checkInit);
                    resolve(this.db);
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInit);
                    reject(new Error('Timeout ao inicializar banco de dados'));
                }
            }, 100);
        });
    }

    /**
     * Exportar dados para JSON
     */
    async exportData() {
        const relatos = await this.getRelatos();
        const stats = await this.getEstatisticas();
        
        return {
            exportDate: new Date().toISOString(),
            totalRelatos: relatos.length,
            estatisticas: stats,
            relatos: relatos
        };
    }
}

// Instância global do banco de dados
const hubDB = new HubDatabase();

// Expor globalmente
window.hubDB = hubDB;

console.log('🚀 HubBS Database carregado');

