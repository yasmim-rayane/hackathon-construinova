/**
 * Script para Popular Relatos de Demonstração
 * Executar no console do navegador para adicionar dados de exemplo
 */

async function popularRelatos() {
    console.log('🌱 Iniciando população de relatos...');
    
    // Aguardar inicialização do banco
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const db = new HubDatabase();
    await db.init();
    
    // Dados de demonstração - Relatos variados das três cidades
    const relatosDemo = [
        // SANTOS - ODS 9 (Infraestrutura)
        {
            titulo: 'Buraco enorme na Rua Amador Bueno',
            descricao: 'Existe um buraco gigante na Rua Amador Bueno próximo ao número 250. O buraco está causando acidentes e danificando veículos. Precisa de reparo urgente.',
            categoria: 'infraestrutura',
            endereco: 'Rua Amador Bueno, 250 - Centro',
            cidade: 'santos',
            bairro: 'Centro',
            ods: 'ods-9',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-15T10:30:00',
            coordenadas: { lat: -23.9618, lng: -46.3322 },
            imagens: []
        },
        {
            titulo: 'Calçada quebrada dificulta mobilidade',
            descricao: 'Calçada totalmente irregular na Av. Ana Costa, dificultando a passagem de pedestres, cadeirantes e carrinhos de bebê. Várias placas soltas representam perigo.',
            categoria: 'infraestrutura',
            endereco: 'Av. Ana Costa, 412 - Gonzaga',
            cidade: 'santos',
            bairro: 'Gonzaga',
            ods: 'ods-9',
            prioridade: 'media',
            status: 'resolvido',
            data: '2025-09-20T14:15:00',
            coordenadas: { lat: -23.9665, lng: -46.3284 },
            imagens: []
        },
        {
            titulo: 'Asfalto deteriorado causa risco de acidentes',
            descricao: 'O asfalto da Rua Silva Jardim está completamente deteriorado com diversos buracos de todos os tamanhos. Motociclistas estão em risco.',
            categoria: 'infraestrutura',
            endereco: 'Rua Silva Jardim, 180 - Vila Belmiro',
            cidade: 'santos',
            bairro: 'Vila Belmiro',
            ods: 'ods-9',
            prioridade: 'alta',
            status: 'em_analise',
            data: '2025-10-28T09:45:00',
            coordenadas: { lat: -23.9526, lng: -46.3358 },
            imagens: []
        },
        
        // SANTOS - ODS 11 (Cidades Sustentáveis)
        {
            titulo: 'Lixo acumulado há dias na orla',
            descricao: 'Grande quantidade de lixo acumulado nos jardins da orla da praia próximo ao Emissário Submarino. Mau cheiro e risco de doenças.',
            categoria: 'lixo',
            endereco: 'Av. Presidente Wilson - Orla',
            cidade: 'santos',
            bairro: 'Ponta da Praia',
            ods: 'ods-11',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-25T16:20:00',
            coordenadas: { lat: -23.9886, lng: -46.3010 },
            imagens: []
        },
        {
            titulo: 'Praça abandonada com mato alto',
            descricao: 'A Praça Washington está totalmente abandonada, com mato alto, bancos quebrados e lixo acumulado. Precisa de manutenção urgente.',
            categoria: 'meio_ambiente',
            endereco: 'Praça Washington - Paquetá',
            cidade: 'santos',
            bairro: 'Paquetá',
            ods: 'ods-11',
            prioridade: 'media',
            status: 'em_analise',
            data: '2025-10-22T11:00:00',
            coordenadas: { lat: -23.9395, lng: -46.3149 },
            imagens: []
        },
        {
            titulo: 'Entulho jogado em terreno baldio',
            descricao: 'Descarte irregular de entulho e móveis velhos em terreno baldio na Rua Dr. Tolentino Filgueiras. Precisa de recolhimento.',
            categoria: 'lixo',
            endereco: 'Rua Dr. Tolentino Filgueiras, 89 - Macuco',
            cidade: 'santos',
            bairro: 'Macuco',
            ods: 'ods-11',
            prioridade: 'media',
            status: 'resolvido',
            data: '2025-09-18T08:30:00',
            coordenadas: { lat: -23.9472, lng: -46.3241 },
            imagens: []
        },

        // SANTOS - ODS 6 (Água e Saneamento)
        {
            titulo: 'Vazamento de esgoto na rua',
            descricao: 'Vazamento de esgoto com forte odor na Rua Carvalho de Mendonça. O esgoto está correndo pela rua há 3 dias.',
            categoria: 'saneamento',
            endereco: 'Rua Carvalho de Mendonça, 567 - Encruzilhada',
            cidade: 'santos',
            bairro: 'Encruzilhada',
            ods: 'ods-6',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-26T07:15:00',
            coordenadas: { lat: -23.9351, lng: -46.3287 },
            imagens: []
        },
        {
            titulo: 'Bueiro entupido causa alagamento',
            descricao: 'Bueiro entupido na Av. Conselheiro Nébias causa alagamento sempre que chove. Água invade imóveis.',
            categoria: 'saneamento',
            endereco: 'Av. Conselheiro Nébias, 780 - Encruzilhada',
            cidade: 'santos',
            bairro: 'Encruzilhada',
            ods: 'ods-6',
            prioridade: 'alta',
            status: 'em_analise',
            data: '2025-10-29T13:40:00',
            coordenadas: { lat: -23.9356, lng: -46.3298 },
            imagens: []
        },

        // SANTOS - ODS 7 (Energia Limpa)
        {
            titulo: 'Poste de luz apagado há uma semana',
            descricao: 'Poste de iluminação pública apagado há mais de uma semana na Rua General Câmara, deixando o local muito escuro e perigoso à noite.',
            categoria: 'iluminacao',
            endereco: 'Rua General Câmara, 125 - Paquetá',
            cidade: 'santos',
            bairro: 'Paquetá',
            ods: 'ods-7',
            prioridade: 'alta',
            status: 'resolvido',
            data: '2025-10-10T19:30:00',
            coordenadas: { lat: -23.9405, lng: -46.3165 },
            imagens: []
        },

        // GUARUJÁ - ODS 9 (Infraestrutura)
        {
            titulo: 'Via com buracos prejudica moradores',
            descricao: 'A Av. Santos Dumont está cheia de buracos profundos que danificam veículos e causam acidentes. Situação crítica após últimas chuvas.',
            categoria: 'infraestrutura',
            endereco: 'Av. Santos Dumont, 1420 - Enseada',
            cidade: 'guaruja',
            bairro: 'Enseada',
            ods: 'ods-9',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-24T10:20:00',
            coordenadas: { lat: -23.9933, lng: -46.2565 },
            imagens: []
        },
        {
            titulo: 'Ponte com estrutura danificada',
            descricao: 'Ponte na Vila Alice apresenta rachaduras e partes da estrutura danificadas. Moradores estão preocupados com segurança.',
            categoria: 'infraestrutura',
            endereco: 'Rua da Ponte - Vila Alice',
            cidade: 'guaruja',
            bairro: 'Vila Alice',
            ods: 'ods-9',
            prioridade: 'alta',
            status: 'em_analise',
            data: '2025-10-27T15:45:00',
            coordenadas: { lat: -23.9815, lng: -46.2634 },
            imagens: []
        },

        // GUARUJÁ - ODS 11 (Cidades Sustentáveis)
        {
            titulo: 'Praia suja com muito lixo',
            descricao: 'Praia das Pitangueiras está com muito lixo acumulado na areia. Garrafas plásticas, embalagens e restos de comida por toda parte.',
            categoria: 'lixo',
            endereco: 'Praia das Pitangueiras - Pitangueiras',
            cidade: 'guaruja',
            bairro: 'Pitangueiras',
            ods: 'ods-11',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-26T08:00:00',
            coordenadas: { lat: -23.9923, lng: -46.2588 },
            imagens: []
        },
        {
            titulo: 'Contêineres de lixo transbordando',
            descricao: 'Contêineres de lixo da Rua Maranhão estão sempre transbordando. Coleta irregular está causando acúmulo de lixo nas calçadas.',
            categoria: 'lixo',
            endereco: 'Rua Maranhão, 245 - Vicente de Carvalho',
            cidade: 'guaruja',
            bairro: 'Vicente de Carvalho',
            ods: 'ods-11',
            prioridade: 'media',
            status: 'em_analise',
            data: '2025-10-28T14:30:00',
            coordenadas: { lat: -23.9987, lng: -46.2712 },
            imagens: []
        },

        // GUARUJÁ - ODS 6 (Água e Saneamento)
        {
            titulo: 'Falta de água constante no bairro',
            descricao: 'Moradores do Morrinhos estão sem água há 2 dias. Já é a terceira vez no mês que isso acontece. Precisamos de solução definitiva.',
            categoria: 'saneamento',
            endereco: 'Rua das Hortênsias - Morrinhos',
            cidade: 'guaruja',
            bairro: 'Morrinhos',
            ods: 'ods-6',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-30T06:00:00',
            coordenadas: { lat: -24.0012, lng: -46.2801 },
            imagens: []
        },

        // GUARUJÁ - ODS 7 (Energia Limpa)
        {
            titulo: 'Iluminação precária em via movimentada',
            descricao: 'A Av. Adhemar de Barros está com iluminação muito fraca e vários postes queimados, tornando perigoso transitar à noite.',
            categoria: 'iluminacao',
            endereco: 'Av. Adhemar de Barros - Vicente de Carvalho',
            cidade: 'guaruja',
            bairro: 'Vicente de Carvalho',
            ods: 'ods-7',
            prioridade: 'alta',
            status: 'em_analise',
            data: '2025-10-25T20:00:00',
            coordenadas: { lat: -23.9965, lng: -46.2689 },
            imagens: []
        },

        // SÃO VICENTE - ODS 9 (Infraestrutura)
        {
            titulo: 'Cratera gigante na avenida principal',
            descricao: 'Cratera enorme se formou na Av. Capitão Luís Chermont após rompimento de tubulação. Trânsito está complicado e perigoso.',
            categoria: 'infraestrutura',
            endereco: 'Av. Capitão Luís Chermont, 890 - Itararé',
            cidade: 'sao_vicente',
            bairro: 'Itararé',
            ods: 'ods-9',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-29T11:20:00',
            coordenadas: { lat: -23.9643, lng: -46.3897 },
            imagens: []
        },
        {
            titulo: 'Ciclovia abandonada e perigosa',
            descricao: 'Ciclovia da orla está com piso quebrado, buracos e sem sinalização. Ciclistas estão em risco de acidentes.',
            categoria: 'infraestrutura',
            endereco: 'Av. Tupiniquins - Itararé',
            cidade: 'sao_vicente',
            bairro: 'Itararé',
            ods: 'ods-9',
            prioridade: 'media',
            status: 'em_analise',
            data: '2025-10-23T09:30:00',
            coordenadas: { lat: -23.9689, lng: -46.3912 },
            imagens: []
        },

        // SÃO VICENTE - ODS 11 (Cidades Sustentáveis)
        {
            titulo: 'Praça pública sem manutenção',
            descricao: 'Praça 22 de Janeiro está abandonada, com gramado alto, brinquedos quebrados e lixo acumulado. Crianças não têm onde brincar.',
            categoria: 'meio_ambiente',
            endereco: 'Praça 22 de Janeiro - Centro',
            cidade: 'sao_vicente',
            bairro: 'Centro',
            ods: 'ods-11',
            prioridade: 'media',
            status: 'em_analise',
            data: '2025-10-21T16:00:00',
            coordenadas: { lat: -23.9599, lng: -46.3954 },
            imagens: []
        },
        {
            titulo: 'Descarte irregular de lixo eletrônico',
            descricao: 'Pessoas estão descartando lixo eletrônico (TVs, computadores, geladeiras) na Rua Frei Gaspar. Precisa de recolhimento urgente.',
            categoria: 'lixo',
            endereco: 'Rua Frei Gaspar, 567 - Centro',
            cidade: 'sao_vicente',
            bairro: 'Centro',
            ods: 'ods-11',
            prioridade: 'media',
            status: 'resolvido',
            data: '2025-10-12T10:45:00',
            coordenadas: { lat: -23.9612, lng: -46.3923 },
            imagens: []
        },

        // SÃO VICENTE - ODS 6 (Água e Saneamento)
        {
            titulo: 'Esgoto a céu aberto há meses',
            descricao: 'Vazamento de esgoto na Vila Valença está correndo a céu aberto há mais de 2 meses. Situação insalubre e perigosa para moradores.',
            categoria: 'saneamento',
            endereco: 'Rua São Paulo, 234 - Vila Valença',
            cidade: 'sao_vicente',
            bairro: 'Vila Valença',
            ods: 'ods-6',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-20T07:30:00',
            coordenadas: { lat: -23.9734, lng: -46.4012 },
            imagens: []
        },
        {
            titulo: 'Bocas de lobo entupidas causam enchentes',
            descricao: 'Várias bocas de lobo entupidas na Av. Presidente Wilson causam alagamentos em dias de chuva. Água invade casas.',
            categoria: 'saneamento',
            endereco: 'Av. Presidente Wilson, 1250 - Itararé',
            cidade: 'sao_vicente',
            bairro: 'Itararé',
            ods: 'ods-6',
            prioridade: 'alta',
            status: 'em_analise',
            data: '2025-10-31T12:00:00',
            coordenadas: { lat: -23.9667, lng: -46.3889 },
            imagens: []
        },

        // SÃO VICENTE - ODS 7 (Energia Limpa)
        {
            titulo: 'Rua completamente às escuras',
            descricao: 'Toda a iluminação da Rua João Pessoa está queimada há mais de 10 dias. Moradores têm medo de sair à noite.',
            categoria: 'iluminacao',
            endereco: 'Rua João Pessoa - Vila Valença',
            cidade: 'sao_vicente',
            bairro: 'Vila Valença',
            ods: 'ods-7',
            prioridade: 'alta',
            status: 'em_progresso',
            data: '2025-10-19T18:45:00',
            coordenadas: { lat: -23.9756, lng: -46.4034 },
            imagens: []
        },

        // Mais alguns relatos RESOLVIDOS para mostrar eficiência
        {
            titulo: 'Semáforo com defeito corrigido',
            descricao: 'Semáforo no cruzamento da Av. Francisco Glicério com Rua XV de Novembro estava piscando amarelo, causando risco de acidentes.',
            categoria: 'infraestrutura',
            endereco: 'Av. Francisco Glicério x Rua XV de Novembro - Centro',
            cidade: 'santos',
            bairro: 'Centro',
            ods: 'ods-9',
            prioridade: 'alta',
            status: 'resolvido',
            data: '2025-09-05T14:20:00',
            coordenadas: { lat: -23.9532, lng: -46.3342 },
            imagens: []
        },
        {
            titulo: 'Poda de árvore que bloqueava passagem',
            descricao: 'Árvore com galhos muito baixos na Rua Bahia estava atrapalhando a passagem de pedestres e veículos altos.',
            categoria: 'meio_ambiente',
            endereco: 'Rua Bahia, 89 - Boqueirão',
            cidade: 'santos',
            bairro: 'Boqueirão',
            ods: 'ods-11',
            prioridade: 'baixa',
            status: 'resolvido',
            data: '2025-09-12T11:00:00',
            coordenadas: { lat: -23.9724, lng: -46.3234 },
            imagens: []
        },
        {
            titulo: 'Coleta de lixo normalizada',
            descricao: 'Coleta de lixo estava atrasada há uma semana na Rua Chile. Problema foi resolvido e novo cronograma estabelecido.',
            categoria: 'lixo',
            endereco: 'Rua Chile, 156 - Boqueirão',
            cidade: 'santos',
            bairro: 'Boqueirão',
            ods: 'ods-11',
            prioridade: 'media',
            status: 'resolvido',
            data: '2025-08-28T09:15:00',
            coordenadas: { lat: -23.9701, lng: -46.3189 },
            imagens: []
        }
    ];

    console.log(`📝 Adicionando ${relatosDemo.length} relatos de demonstração...`);

    let sucessos = 0;
    let erros = 0;

    for (const relato of relatosDemo) {
        try {
            await db.addRelato(relato);
            sucessos++;
            console.log(`✅ Adicionado: ${relato.titulo} (${relato.cidade})`);
        } catch (error) {
            erros++;
            console.error(`❌ Erro ao adicionar: ${relato.titulo}`, error);
        }
    }

    console.log('\n📊 RESUMO DA POPULAÇÃO:');
    console.log(`✅ Sucessos: ${sucessos}`);
    console.log(`❌ Erros: ${erros}`);
    console.log(`📍 Total: ${relatosDemo.length}`);
    
    // Mostrar estatísticas
    const stats = await db.getEstatisticas();
    console.log('\n📈 ESTATÍSTICAS DO BANCO:');
    console.log(`Total de relatos: ${stats.total}`);
    console.log(`Por status:`, stats.porStatus);
    console.log(`Por ODS:`, stats.porODS);
    console.log(`Por cidade:`, stats.porCidade);
    
    console.log('\n✨ População de relatos concluída!');
    console.log('💡 Recarregue a página para ver os dados nos dashboards.');
    
    return stats;
}

// Mensagem de carregamento
if (typeof window !== 'undefined') {
    console.log('🌱 Script de população de relatos carregado!');
    console.log('📌 Para adicionar dados de exemplo, execute: popularRelatos()');
    console.log('� Ou use a página popular-dados.html para interface gráfica');
}
