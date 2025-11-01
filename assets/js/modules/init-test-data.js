/**
 * Script para inicializar dados de teste no HubBS
 * Execute este script para criar protocolos de demonstração
 */

async function initTestData() {
    console.log('🚀 Iniciando criação de dados de teste...');
    
    const hubDB = new HubDatabase();
    await hubDB.init();
    
    // Protocolo de teste principal
    const protocoloTeste = {
        id: 1,
        nome: 'Maria Silva',
        email: 'maria.silva@email.com',
        telefone: '(13) 98765-4321',
        cidade: 'Santos',
        categoria: 'Saneamento',
        titulo: 'Vazamento de esgoto na Av. Ana Costa',
        descricao: 'Há um vazamento de esgoto na Av. Ana Costa, altura do número 450, causando mau cheiro e risco à saúde. O problema persiste há mais de uma semana.',
        localizacao: 'Av. Ana Costa, 450 - Gonzaga, Santos/SP',
        prioridade: 'alta',
        imagens: [],
        status: 'em_progresso',
        protocolo: 'HubBS-2025-000001',
        timestamp: Date.now() - 86400000, // 1 dia atrás
        pontos: 50
    };
    
    try {
        // Verificar se já existe
        const relatos = await hubDB.getRelatos();
        const existe = relatos.some(r => r.protocolo === 'HubBS-2025-000001');
        
        if (!existe) {
            await hubDB.addRelato(protocoloTeste);
            console.log('✅ Protocolo de teste criado:', protocoloTeste.protocolo);
        } else {
            console.log('ℹ️ Protocolo de teste já existe');
        }
        
        // Listar todos os protocolos
        const todosRelatos = await hubDB.getRelatos();
        console.log('📋 Total de protocolos no banco:', todosRelatos.length);
        console.log('📝 Protocolos disponíveis:', todosRelatos.map(r => r.protocolo));
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao criar dados de teste:', error);
        return false;
    }
}

// Auto-executar quando o script for carregado
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initTestData);
}
