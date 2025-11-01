// ======================================
// HUB - JavaScript Application
// ======================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeLoginForm();
    initializeSignupForm();
    initializeCompanyPage();
});

// ======================================
// Mobile Menu Toggle
// ======================================
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// ======================================
// Login Form Validation
// ======================================
function initializeLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const remember = document.getElementById('remember').checked;
        
        // Clear previous errors
        clearErrors(['email-error', 'password-error']);
        hideAlert('login-alert');
        
        // Validation
        let isValid = true;
        
        if (!validateEmail(email)) {
            showError('email-error', 'Por favor, insira um e-mail válido');
            isValid = false;
        }
        
        if (password.length < 6) {
            showError('password-error', 'A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Check credentials in localStorage
        const users = JSON.parse(localStorage.getItem('hub_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store session
            if (remember) {
                localStorage.setItem('hub_current_user', JSON.stringify(user));
            } else {
                sessionStorage.setItem('hub_current_user', JSON.stringify(user));
            }
            
            showAlert('login-alert', 'Login realizado com sucesso! Redirecionando...', 'success');
            
            // Redirect based on user type
            setTimeout(() => {
                if (user.userType === 'company') {
                    window.location.href = 'empresa.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1500);
        } else {
            showAlert('login-alert', 'E-mail ou senha incorretos. Tente novamente.', 'error');
        }
    });
}

// ======================================
// Signup Form Validation
// ======================================
function initializeSignupForm() {
    const signupForm = document.getElementById('signup-form');
    
    if (!signupForm) return;
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();
        const userType = document.querySelector('input[name="user-type"]:checked').value;
        const termsAccepted = document.getElementById('terms').checked;
        
        // Clear previous errors
        clearErrors(['name-error', 'signup-email-error', 'signup-password-error', 'confirm-password-error']);
        hideAlert('signup-alert');
        
        // Validation
        let isValid = true;
        
        if (name.length < 3) {
            showError('name-error', 'O nome deve ter pelo menos 3 caracteres');
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            showError('signup-email-error', 'Por favor, insira um e-mail válido');
            isValid = false;
        }
        
        if (password.length < 6) {
            showError('signup-password-error', 'A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            showError('confirm-password-error', 'As senhas não coincidem');
            isValid = false;
        }
        
        if (!termsAccepted) {
            showAlert('signup-alert', 'Você deve aceitar os termos de uso', 'error');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('hub_users') || '[]');
        const emailExists = users.some(u => u.email === email);
        
        if (emailExists) {
            showAlert('signup-alert', 'Este e-mail já está cadastrado. Por favor, faça login.', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            userType: userType,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('hub_users', JSON.stringify(users));
        
        showAlert('signup-alert', 'Conta criada com sucesso! Redirecionando para login...', 'success');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// ======================================
// Company Page - Complaints Management
// ======================================
function initializeCompanyPage() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => {
                t.classList.remove('active', 'bg-white', 'text-blue-600');
                t.classList.add('text-gray-600');
            });
            
            // Add active class to clicked tab
            this.classList.add('active', 'bg-white', 'text-blue-600');
            this.classList.remove('text-gray-600');
            
            // Filter complaints
            const filter = this.getAttribute('data-filter');
            filterComplaints(filter);
        });
    });
    
    // Response buttons
    const respondBtns = document.querySelectorAll('.respond-btn');
    
    respondBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.complaint-card');
            const form = card.querySelector('.response-form');
            
            if (form) {
                form.classList.toggle('hidden');
            }
        });
    });
    
    // Cancel response buttons
    const cancelBtns = document.querySelectorAll('.cancel-response');
    
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const form = this.closest('.response-form');
            
            if (form) {
                form.classList.add('hidden');
                form.querySelector('textarea').value = '';
            }
        });
    });
    
    // Submit response buttons
    const submitBtns = document.querySelectorAll('.submit-response');
    
    submitBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const form = this.closest('.response-form');
            const textarea = form.querySelector('textarea');
            const responseText = textarea.value.trim();
            
            if (!responseText) {
                alert('Por favor, digite uma resposta antes de enviar.');
                return;
            }
            
            // Get card
            const card = this.closest('.complaint-card');
            
            // Update card status
            card.setAttribute('data-status', 'resolved');
            card.classList.remove('border-orange-500');
            card.classList.add('border-green-500');
            
            // Update status badge
            const badge = card.querySelector('span.bg-orange-100');
            if (badge) {
                badge.classList.remove('bg-orange-100', 'text-orange-800');
                badge.classList.add('bg-green-100', 'text-green-800');
                badge.textContent = 'Resolvida';
            }
            
            // Remove respond button
            const respondBtn = card.querySelector('.respond-btn');
            if (respondBtn) {
                respondBtn.remove();
            }
            
            // Create response display
            const responseDisplay = document.createElement('div');
            responseDisplay.className = 'mt-4 p-4 bg-blue-50 rounded-lg';
            responseDisplay.innerHTML = `
                <p class="text-sm font-semibold text-gray-700 mb-1">Resposta da Empresa:</p>
                <p class="text-gray-600">${responseText}</p>
            `;
            
            // Insert response before form
            form.parentNode.insertBefore(responseDisplay, form);
            
            // Hide form and clear textarea
            form.classList.add('hidden');
            textarea.value = '';
            
            // Show success message
            showTemporaryMessage('Resposta enviada com sucesso!');
        });
    });
}

// ======================================
// Filter Complaints
// ======================================
function filterComplaints(filter) {
    const cards = document.querySelectorAll('.complaint-card');
    
    cards.forEach(card => {
        const status = card.getAttribute('data-status');
        
        if (filter === 'all') {
            card.style.display = 'block';
        } else if (filter === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ======================================
// Utility Functions
// ======================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

function clearErrors(errorIds) {
    errorIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = '';
            element.classList.add('hidden');
        }
    });
}

function showAlert(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.textContent = message;
    element.classList.remove('hidden');
    
    // Remove previous type classes
    element.classList.remove('bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
    
    // Add appropriate classes based on type
    if (type === 'error') {
        element.classList.add('bg-red-100', 'text-red-700');
    } else if (type === 'success') {
        element.classList.add('bg-green-100', 'text-green-700');
    }
}

function hideAlert(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

function showTemporaryMessage(message) {
    // Create temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// ======================================
// Check Authentication (Optional)
// ======================================
function getCurrentUser() {
    const userFromLocal = localStorage.getItem('hub_current_user');
    const userFromSession = sessionStorage.getItem('hub_current_user');
    
    return JSON.parse(userFromLocal || userFromSession || 'null');
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

function logout() {
    localStorage.removeItem('hub_current_user');
    sessionStorage.removeItem('hub_current_user');
    window.location.href = 'index.html';
}
