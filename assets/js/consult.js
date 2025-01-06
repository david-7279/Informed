document.addEventListener('DOMContentLoaded', function() {
  // Carregar consultas do localStorage ao carregar a página
  const consultas = JSON.parse(localStorage.getItem('consultas')) || [];

  // Exibir as consultas na página
  const consultasContainer = document.getElementById('consultasContainer');
  consultasContainer.innerHTML = '';  // Limpa o container antes de adicionar as novas consultas
  
  if (consultas.length === 0) {
    consultasContainer.innerHTML = '<p>Nenhuma consulta marcada.</p>';
  }

  consultas.forEach(consulta => {
    const consultaDiv = document.createElement('div');
    consultaDiv.classList.add('consulta-item');
    
    consultaDiv.innerHTML = `
      <p>Consulta do dia <strong>${consulta.data}</strong> na hora <strong>${consulta.hora}</strong></p>
      <button class="detalhes-btn">Mais Detalhes</button>
      <div class="consulta-detalhes" style="display: none;">
        <h2>Detalhes da Consulta</h2>
        <p><strong>Data:</strong> ${consulta.data}</p>
        <p><strong>Hora:</strong> ${consulta.hora}</p>
        <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
        <p><strong>Médico:</strong> ${consulta.medico}</p>
        <p><strong>Unidade:</strong> ${consulta.unidade}</p>
        <p><strong>Motivo:</strong> ${consulta.motivo}</p>
        <button class="voltar-btn">Voltar</button>
      </div>
    `;
    
    // Adiciona a consulta ao container
    consultasContainer.appendChild(consultaDiv);
  });

  // Exibir detalhes ao clicar no botão "Mais Detalhes"
  document.querySelectorAll('.detalhes-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const consultaItem = btn.closest('.consulta-item');
      const detalhes = consultaItem.querySelector('.consulta-detalhes');
      detalhes.style.display = 'block';
      btn.style.display = 'none';
    });
  });

  // Esconder os detalhes ao clicar em "Voltar"
  document.querySelectorAll('.voltar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const consultaItem = btn.closest('.consulta-item');
      const detalhes = consultaItem.querySelector('.consulta-detalhes');
      detalhes.style.display = 'none';
      consultaItem.querySelector('.detalhes-btn').style.display = 'inline-block';
    });
  });
  document.getElementById('theme-switch').addEventListener('click', function () {
      // Alterna a classe dark-mode no body
      document.body.classList.toggle('dark-mode');
  
      // Salva a preferência do usuário no localStorage
      if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
      } else {
          localStorage.setItem('theme', 'light');
      }
  });
  
  // Ao carregar a página, verifica a preferência salva e aplica o modo correspondente
  window.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem('theme') === 'dark') {
          document.body.classList.add('dark-mode');  // Aplica o modo escuro
      }
  });
  document.getElementById('resetConsultasBtn').addEventListener('click', function () {
      // Limpa as consultas salvas no localStorage
      localStorage.removeItem('consultas');
  
      // Atualiza a interface ou exibe uma mensagem de sucesso
      alert('Consultas resetadas com sucesso!');
  
      // Opcionalmente, você pode redirecionar para a página de exibição de consultas para ver as mudanças
      window.location.reload(); // Recarrega a página para refletir as mudanças
  });
});
