document.addEventListener('DOMContentLoaded', function() {
  const consultaForm = document.getElementById('consultaForm');

  // Verifica se o formulário existe antes de adicionar o evento
  if (consultaForm) {
    consultaForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar o comportamento padrão do formulário

      // Obtendo os valores dos campos
      const tipoConsulta = document.getElementById('tipoConsulta').value;
      const especialidade = document.getElementById('especialidade').value;
      const medico = document.getElementById('medico').value;
      const unidade = document.getElementById('unidade').value;
      const dataHora = document.getElementById('dataHora').value;
      const motivo = document.getElementById('motivo').value;
      const disponibilidadeMedicos = {
        "Dr Carlos": {
          "2024-12-13": ["14:00"], // Lista de horários ocupados
        },
        "Dra Maria": {
          "2024-12-14": ["10:00", "11:00"],
        },
        "Dr João": {},
        "Dra Ana": {},
      };

      // Validando se todos os campos foram preenchidos
      if (!tipoConsulta || !especialidade || !medico || !unidade || !dataHora || !motivo) {
        alert('Por favor, preencha todos os campos!');
        return;
      }

      // Separando a data e hora
      const [data, hora] = dataHora.split('T'); // Divide a string de dataHora em data e hora

      // Formatando a data para o formato DD/MM/YYYY
      const [ano, mes, dia] = data.split('-'); // Separa ano, mês e dia
      const dataFormatada = `${dia}/${mes}/${ano}`; // Reorganiza para o formato DD/MM/YYYY

  // Preenchendo o resumo com as informações
  document.getElementById('summaryTipoConsulta').textContent = tipoConsulta;
  document.getElementById('summaryEspecialidade').textContent = especialidade;
  document.getElementById('summaryMedico').textContent = medico;
  document.getElementById('summaryUnidade').textContent = unidade;
  document.getElementById('summaryData').textContent = dataFormatada; // Exibe a data formatada
  document.getElementById('summaryHora').textContent = hora; // Exibe a hora
  document.getElementById('summaryMotivo').textContent = motivo;

  // Exibindo o resumo e ocultando o formulário
  document.getElementById('consultaForm').style.display = 'none';
  document.getElementById('summaryContainer').style.display = 'block';
});

document.getElementById('cancelButton').addEventListener('click', function () {
  mostrarMensagemFinal('Consulta cancelada');
});

document.getElementById('confirmButton').addEventListener('click', function () {
  mostrarMensagemFinal('Consulta marcada');
});

function mostrarMensagemFinal(mensagem) {
  // Ocultar o resumo
  document.getElementById('summaryContainer').style.display = 'none';

  // Mostrar a mensagem final
  const finalMessage = document.getElementById('finalMessage');
  finalMessage.style.display = 'block';
  document.getElementById('statusMessage').textContent = mensagem;
}

document.getElementById('consultaForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtendo os valores dos campos do formulário
  const medico = document.getElementById('medico').value;
  const dataHora = document.getElementById('dataHora').value;

  // Verificar se os campos obrigatórios estão preenchidos
  if (!medico || !dataHora) {
    alert('Por favor, selecione o médico e a data/hora!');
    return;
  }

  // Separar a data e a hora
  const [data, hora] = dataHora.split('T');

  // Verificar disponibilidade
  if (disponibilidadeMedicos[medico] && disponibilidadeMedicos[medico][data]?.includes(hora)) {
    alert('Este horário já está ocupado para o médico selecionado. Escolha outro horário ou médico.');
    return;
  }

  // Registrar o horário como ocupado
  if (!disponibilidadeMedicos[medico][data]) {
    disponibilidadeMedicos[medico][data] = [];
  }
  disponibilidadeMedicos[medico][data].push(hora);

  // Mostrar mensagem de sucesso
  mostrarMensagemFinal('Consulta marcada');
});

// Função para exibir a mensagem final
function mostrarMensagemFinal(mensagem) {
  // Ocultar o formulário
  document.getElementById('consultaForm').style.display = 'none';

  // Mostrar a mensagem final
  const finalMessage = document.getElementById('finalMessage');
  finalMessage.style.display = 'block';
  document.getElementById('statusMessage').textContent = mensagem;

  console.log(disponibilidadeMedicos); // Para debug, exibe a base de dados atualizada
}}});