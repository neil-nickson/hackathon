document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('token');

  // Highlight active sidebar link if any (optional)
  const links = document.querySelectorAll('.sidebar ul li a');
  const current = window.location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });

  // Redirect to login if token missing
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Inventory form logic
  const form = document.getElementById('inventoryForm');
  const responseDiv = document.getElementById('responseMessage');

  form.onsubmit = async (e) => {
    e.preventDefault();
    const formData 