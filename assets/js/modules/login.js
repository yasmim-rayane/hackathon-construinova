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
            const result = await auth.login(email, password);

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
                case 'admin':
                    window.location.href = 'dashboard.html';
                    break;
                case 'empresa':
                    window.location.href = 'empresa-dashboard.html';
                    break;
                default:
                    window.location.href = 'dashboard.html';
            }
        } else {
            window.location.href = 'dashboard.html';
        }
    }

    function createDemoUserButton() {
        const demoContainer = document.getElementById('demo-login');
        if (demoContainer) {
            const demoButton = document.createElement('button');
            demoButton.type = 'button';
            demoButton.className = 'w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition flex items-center justify-center gap-2';
            demoButton.innerHTML = '<i class="fas fa-user-circle"></i>Login com Usuário Demo';
            
            demoButton.addEventListener('click', async () => {
                // Cria usuário demo se não existir
                const demoEmail = 'demo@hubbs.com.br';
                const demoPassword = 'demo123';
                
                let demoUser = await auth.getUserByEmail(demoEmail);
                
                if (!demoUser) {
                    // Cria o usuário demo
                    const result = await auth.register({
                        nome: 'Usuário Demonstração',
                        email: demoEmail,
                        senha: demoPassword,
                        telefone: '(13) 99763-9273',
                        cidade: 'Santos',
                        tipo: 'cidadao'
                    });
                    
                    if (!result.success) {
                        showError('Erro ao criar usuário demo');
                        return;
                    }
                }
                
                // Faz login automático
                emailInput.value = demoEmail;
                passwordInput.value = demoPassword;
                loginForm.dispatchEvent(new Event('submit'));
            });
            
            demoContainer.appendChild(demoButton);
        }
    }
});
