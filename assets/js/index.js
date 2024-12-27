function validateForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Regular expression for basic email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(email)) {
    alert('Por favor, insira um email válido.');
    return false;
  }

  if (password.length < 6) {
    alert('A palavra-passe deve ter pelo menos 6 caracteres.');
    return false;
  }

  // If validation passes, redirect to the home page
  window.location.href = './pages/home.html';
  return true;
}