/**
 * Login Page Script
 * Sistema de autenticação - Página de Login
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const errorContainer = document.getElementById('login-error');

    // Verifica se já está autenticado
    if (auth.isAuthenticated()) {
        console.log('✅ Usuário já autenticado, redirecionando...');
        redirectToDashboard();
        return;
    }

    // Carrega e-mail salvo se existir
    const savedEmail = localStorage.getItem('hubbs_saved_email');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }

    // Usuário de demonstração
    createDemoUserButton();

    // Botão de reset do banco de dados
    const resetDbBtn = document.getElementById('reset-db-btn');
    if (resetDbBtn) {
        resetDbBtn.addEventListener('click', async () => {
            if (confirm('⚠️ ATENÇÃO: Isso vai apagar TODOS os dados e recriar os usuários demo.\n\nDeseja continuar?')) {
                resetDbBtn.disabled = true;
                resetDbBtn.textContent = '🔄 Resetando banco...';
                
                try {
                    // Deletar banco existente
                    const deleteRequest = indexedDB.deleteDatabase('HubDatabase');
                    
                    deleteRequest.onsuccess = async () => {
                        console.log('✅ Banco deletado com sucesso');
                        
                        // Aguardar um pouco
                        await new Promise(resolve => setTimeout(resolve, 500));
                        
                        // Recarregar a página para reinicializar tudo
                        alert('✅ Banco de dados resetado!\n\nA página será recarregada.');
                        window.location.reload();
                    };
                    
                    deleteRequest.onerror = () => {
                        console.error('❌ Erro ao deletar banco');
                        alert('❌ Erro ao resetar banco. Tente limpar o cache do navegador.');
                        resetDbBtn.disabled = false;
                        resetDbBtn.textContent = '🔄 Reinicializar Banco de Dados';
                    };
                    
                } catch (error) {
                    console.error('❌ Erro:', error);
                    alert('❌ Erro ao resetar banco: ' + error.message);
                    resetDbBtn.disabled = false;
                    resetDbBtn.textContent = '🔄 Reinicializar Banco de Dados';
                }
            }
        });
    }

    // Submissão do formulário
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;

        // Validações básicas
        if (!email || !password) {
            showError('Por favor, preencha todos os campos');
            return;
        }

        // Desabilita o botão durante o login
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Entrando...';

        try {
            // Tenta fazer login
            console.log('🔐 Tentando login com:', email);
            const result = await auth.login(email, password);

            console.log('📊 Resultado do login:', result);

            if (result.success) {
                // Salva e-mail se "lembrar-me" estiver marcado
                if (remember) {
                    localStorage.setItem('hubbs_saved_email', email);
                } else {
                    localStorage.removeItem('hubbs_saved_email');
                }

                // Mostra mensagem de sucesso
                showSuccess(`Bem-vindo(a), ${result.user.nome}!`);

                // Aguarda 1 segundo e redireciona
                setTimeout(() => {
                    redirectToDashboard();
                }, 1000);

            } else {
                console.error('❌ Login falhou:', result.message);
                showError(result.message);
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
            }

        } catch (error) {
            console.error('❌ Erro no login:', error);
            showError('Erro ao fazer login. Tente novamente.');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
        }
    });

    // Mostra/oculta senha
    const togglePassword = document.getElementById('toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.innerHTML = type === 'password' 
                ? '<i class="fas fa-eye"></i>' 
                : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Funções auxiliares
    function showError(message) {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.remove('hidden');
            errorContainer.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'mb-4');
        }
    }

    function showSuccess(message) {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.remove('hidden', 'bg-red-100', 'border-red-400', 'text-red-700');
            errorContainer.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'mb-4');
        }
    }

    function clearError() {
        if (errorContainer) {
            errorContainer.classList.add('hidden');
        }
    }

    function redirectToDashboard() {
        const user = auth.getCurrentUser();
        if (user) {
            // Redireciona baseado no tipo de usuário
            switch (user.tipo) {
                case 'empresa':
                    window.location.href = '../empresa/empresa-dashboard.html';
                    break;
                case 'cidadao':
                default:
                    window.location.href = '../cidadao/cidadao-dashboard.html';
                    break;
            }
        } else {
            window.location.href = '../cidadao/cidadao-dashboard.html';
        }
    }

    function createDemoUserButton() {
        const demoContainer = document.getElementById('demo-login');
        if (demoContainer) {
            // Criar container para os botões
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'space-y-2';

            // Botão Login Cidadão
            const cidadaoButton = document.createElement('button');
            cidadaoButton.type = 'button';
            cidadaoButton.className = 'w-full bg-vibrant-teal text-white py-3 rounded-lg font-semibold hover:bg-ods-green transition flex items-center justify-center gap-2';
            cidadaoButton.innerHTML = '<i class="fas fa-user"></i>Login Cidadão (Demo)';
            
            cidadaoButton.addEventListener('click', async () => {
                emailInput.value = 'joao@exemplo.com';
                passwordInput.value = '123456';
                loginForm.dispatchEvent(new Event('submit'));
            });

            // Botão Login Empresa
            const empresaButton = document.createElement('button');
            empresaButton.type = 'button';
            empresaButton.className = 'w-full bg-deep-blue text-white py-3 rounded-lg font-semibold hover:bg-vibrant-teal transition flex items-center justify-center gap-2';
            empresaButton.innerHTML = '<i class="fas fa-building"></i>Login Empresa (Demo)';
            
            empresaButton.addEventListener('click', async () => {
                emailInput.value = 'empresa@demo.com';
                passwordInput.value = 'empresa123';
                loginForm.dispatchEvent(new Event('submit'));
            });

            // Adicionar título
            const titulo = document.createElement('p');
            titulo.className = 'text-sm text-gray-600 text-center mb-2 mt-4';
            titulo.textContent = 'Ou teste com contas demo:';

            buttonContainer.appendChild(titulo);
            buttonContainer.appendChild(cidadaoButton);
            buttonContainer.appendChild(empresaButton);
            
            demoContainer.appendChild(buttonContainer);
        }
    }
});
