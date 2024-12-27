function saveData() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const doctor = document.getElementById('doctor').value;
  const bloodType = document.getElementById('bloodType').value;

  if (!firstName || !lastName || !email || !phone || !doctor || !bloodType) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
  }

  alert('Alterações salvas com sucesso!');
}