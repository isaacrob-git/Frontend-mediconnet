const API_URL = 'https://backend-mediconnet.onrender.com/api/auth';

// Registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();

      const messageEl = document.getElementById('message');
      if (res.ok) {
        messageEl.classList.remove('text-red-500');
        messageEl.classList.add('text-green-500');
        messageEl.textContent = data.message;
        setTimeout(() => window.location.href = 'login.html', 1500);
      } else {
        messageEl.classList.remove('text-green-500');
        messageEl.classList.add('text-red-500');
        messageEl.textContent = data.message;
      }
    } catch (error) {
      console.error(error);
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      const messageEl = document.getElementById('message');
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'index.html'; // redirige a página principal
      } else {
        messageEl.textContent = data.message;
      }
    } catch (error) {
      console.error(error);
    }
  });
}
