// Login
if(document.getElementById('loginForm')) {
  document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const response = await fetch('http://localhost:5500/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(response.ok){
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('user', JSON.stringify(result.user));
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('login-response').innerText = result.message || "Login failed";
    }
  }
}

// Signup
if(document.getElementById('signupForm')) {
  document.getElementById('signupForm').onsubmit = async (e) => {
    e.preventDefa