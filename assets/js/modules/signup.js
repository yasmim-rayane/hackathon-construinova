/**
 * Signup Page Script
 * Sistema de autenticação - Página de Cadastro
 */

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const nomeInput = document.getElementById('signup-nome');
    const emailInput = document.getElementById('signup-email');
    const telefoneInput = document.getElementById('signup-telefone');
    const cidadeInput = document.getElementById('signup-cidade');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-password-confirm');
    const termsCheckbox = document.getElementById('terms');
    const submitButton = signupForm.querySelector('button[type="submit"]');
    const errorContainer = document.getElementById('signup-error');

    // Verifica se já está autenticado
    if (auth.isAuthenticated()) {
        console.log('✅ Usuário já autenticado, redirecionando...');
        window.location.href = 'dashboard.html';
        return;
    }

    // Máscara de telefone
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        
        e.target.value = value;
    });

    // Lista de cidades da Baixada Santista
    const cidades = [
        'Santos',
        'São Vicente',
        'Guarujá',
        'Praia Grande',
        'Cubatão',
        'Bertioga',
        'Itanhaém',
        'Mongaguá',
        'Peruíbe'
    ];

    // Popula o select de cidades
    cidades.forEach(cidade => {
        const option = document.createElement('option');
        option.value = cidade;
        option.textContent = cidade;
        cidadeInput.appendChild(option);
    });

    // Validação em tempo real
    emailInput.addEventListener('blur', () => {
        validateEmail();
    });

    passwordInput.addEventListener('input', () => {
        updatePasswordStrength();
    });

    confirmPasswordInput.addEventListener('blur', () => {
        validatePasswordMatch();
    });

    // Submissão do formulário
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();

        // Validações
        if (!validateForm()) {
            return;
        }

        // Desabilita o botão durante o cadastro
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Criando conta...';

        try {
            // Dados do usuário
            const userData = {
                nome: nomeInput.value.trim(),
                email: emailInput.value.trim(),
                telefone: telefoneInput.value.trim(),
                cidade: cidadeInput.value,
                senha: passwordInput.value,
                tipo: 'cidadao'
            };

            // Registra o usuário
            const result = await auth.register(userData);

            if (result.success) {
                // Mostra mensagem de sucesso
                showSuccess('Conta criada com sucesso! Fazendo login...');

                // Faz login automático
                setTimeout(async () => {
                    const loginResult = await auth.login(userData.email, userData.senha);
                    if (loginResult.success) {
                        window.location.href = 'dashboard.html';
                    }
                }, 1500);

            } else {
                showError(result.message);
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Criar Conta';
            }

        } catch (error) {
            console.error('❌ Erro no cadastro:', error);
            showError('Erro ao criar conta. Tente novamente.');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-user-plus mr-2"></i>Criar Conta';
        }
    });

    // Mostra/oculta senha
    const togglePassword = document.getElementById('toggle-password');
    const togglePasswordConfirm = document.getElementById('toggle-password-confirm');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            togglePassword.innerHTML = type === 'password' 
                ? '<i class="fas fa-eye"></i>' 
                : '<i class="fas fa-eye-slash"></i>';
        });
    }

    if (togglePasswordConfirm) {
        togglePasswordConfirm.addEventListener('click', () => {
            const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
            confirmPasswordInput.type = type;
            togglePasswordConfirm.innerHTML = type === 'password' 
                ? '<i class="fas fa-eye"></i>' 
                : '<i class="fas fa-eye-slash"></i>';
        });
    }

    // Funções de validação
    function validateForm() {
        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const cidade = cidadeInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const termsAccepted = termsCheckbox.checked;

        if (!nome) {
            showError('Por favor, preencha seu nome completo');
            nomeInput.focus();
            return false;
        }

        if (nome.split(' ').length < 2) {
            showError('Por favor, preencha seu nome completo (nome e sobrenome)');
            nomeInput.focus();
            return false;
        }

        if (!email) {
            showError('Por favor, preencha seu e-mail');
            emailInput.focus();
            return false;
        }

        if (!validateEmail()) {
            emailInput.focus();
            return false;
        }

        if (!telefone) {
            showError('Por favor, preencha seu telefone');
            telefoneInput.focus();
            return false;
        }

        if (!cidade) {
            showError('Por favor, selecione sua cidade');
            cidadeInput.focus();
            return false;
        }

        if (!password) {
            showError('Por favor, crie uma senha');
            passwordInput.focus();
            return false;
        }

        if (password.length < 6) {
            showError('A senha deve ter pelo menos 6 caracteres');
            passwordInput.focus();
            return false;
        }

        if (password !== confirmPassword) {
            showError('As senhas não coincidem');
            confirmPasswordInput.focus();
            return false;
        }

        if (!termsAccepted) {
            showError('Você precisa aceitar os termos de uso e política de privacidade');
            return false;
        }

        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailError = document.getElementById('signup-email-error');

        if (email && !emailRegex.test(email)) {
            if (emailError) {
                emailError.textContent = 'E-mail inválido';
                emailError.classList.remove('hidden');
            }
            return false;
        }

        if (emailError) {
            emailError.classList.add('hidden');
        }
        return true;
    }

    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const confirmError = document.getElementById('signup-password-confirm-error');

        if (confirmPassword && password !== confirmPassword) {
            if (confirmError) {
                confirmError.textContent = 'As senhas não coincidem';
                confirmError.classList.remove('hidden');
            }
            return false;
        }

        if (confirmError) {
            confirmError.classList.add('hidden');
        }
        return true;
    }

    function updatePasswordStrength() {
        const password = passwordInput.value;
        const strengthIndicator = document.getElementById('password-strength');
        
        if (!strengthIndicator) return;

        let strength = 0;
        let strengthText = '';
        let strengthColor = '';

        if (password.length === 0) {
            strengthIndicator.classList.add('hidden');
            return;
        }

        // Critérios de força
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        // Define texto e cor baseado na força
        if (strength <= 1) {
            strengthText = 'Fraca';
            strengthColor = 'text-red-600';
        } else if (strength <= 3) {
            strengthText = 'Média';
            strengthColor = 'text-yellow-600';
        } else {
            strengthText = 'Forte';
            strengthColor = 'text-green-600';
        }

        strengthIndicator.textContent = `Força da senha: ${strengthText}`;
        strengthIndicator.className = `text-sm mt-1 ${strengthColor}`;
        strengthIndicator.classList.remove('hidden');
    }

    function showError(message) {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.remove('hidden');
            errorContainer.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'mb-4');
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function showSuccess(message) {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.remove('hidden', 'bg-red-100', 'border-red-400', 'text-red-700');
            errorContainer.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'mb-4');
            errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function clearError() {
        if (errorContainer) {
            errorContainer.classList.add('hidden');
        }
    }
});
