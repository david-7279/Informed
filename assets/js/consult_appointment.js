document.addEventListener('DOMContentLoaded', function () {
  const tipoConsultaSelect = document.getElementById('tipoConsulta');
  const especialidadeSelect = document.getElementById('especialidade');
  const medicoSelect = document.getElementById('medico');

  // Especialidades por tipo de consulta
  const especialidadesPorTipo = {
    ConsultaGeral: ["Clínica Geral", "Check-up de rotina"],
    ConsultaEspecializada: ["Cardiologia", "Neurologia", "Ginecologia"],
    Exame: ["Radiografia", "Ultrassonografia", "Ressonância Magnética"]
  };

  // Médicos por tipo de especialidade
  const medicosPorEspecialidade = {
    "Clínica Geral": ["Dr. António Silva", "Dra. Ana Costa"],
    "Check-up de rotina": ["Dr. António Silva", "Dra. Ana Costa"],
    Cardiologia: ["Dr. Roberto Lima", "Dra. Luísa Andrade"],
    Neurologia: ["Dra. Fernanda Martins", "Dr. Henrique Alves"],
    Ginecologia: ["Dra. Sofia Almeida", "Dr. Miguel Carvalho"],
    Radiografia: ["Dr. Filipe Costa", "Dra. Beatriz Moura"],
    Ultrassonografia: ["Dr. Rafael Lopes", "Dra. Joana Azevedo"],
    "Ressonância Magnética": ["Dra. Mariana Ribeiro", "Dr. Marcelo Pinto"]
  };

  // Atualiza especialidades com base no tipo de consulta
  tipoConsultaSelect.addEventListener('change', function () {
    const tipoSelecionado = tipoConsultaSelect.value;

    // Limpa as opções de especialidade e médicos
    especialidadeSelect.innerHTML = '<option value="">Selecione...</option>';
    medicoSelect.innerHTML = '<option value="">Selecione...</option>';

    if (tipoSelecionado && especialidadesPorTipo[tipoSelecionado]) {
      especialidadesPorTipo[tipoSelecionado].forEach(especialidade => {
        const option = document.createElement('option');
        option.value = especialidade;
        option.textContent = especialidade;
        especialidadeSelect.appendChild(option);
      });
    }
  });

  // Atualiza médicos com base na especialidade selecionada
  especialidadeSelect.addEventListener('change', function () {
    const especialidadeSelecionada = especialidadeSelect.value;

    // Limpa as opções de médicos
    medicoSelect.innerHTML = '<option value="">Selecione...</option>';

    if (especialidadeSelecionada && medicosPorEspecialidade[especialidadeSelecionada]) {
      medicosPorEspecialidade[especialidadeSelecionada].forEach(medico => {
        const option = document.createElement('option');
        option.value = medico;
        option.textContent = medico;
        medicoSelect.appendChild(option);
      });
    }
  });

  // Configuração do Flatpickr
  flatpickr("#dataHora", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    time_24hr: true,
    minDate: "today",
    minuteIncrement: 5,
    theme: "material_blue"
  });

  // Validação e submissão do formulário
  document.getElementById('consultaForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtendo os valores dos campos
    const tipoConsulta = tipoConsultaSelect.value;
    const especialidade = especialidadeSelect.value;
    const medico = medicoSelect.value;
    const unidade = document.getElementById('unidade').value;
    const dataHora = document.getElementById('dataHora').value;
    const motivo = document.getElementById('motivo').value;

    // Validação dos campos
    if (!tipoConsulta || !especialidade || !medico || !unidade || !dataHora || !motivo) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // Separando data e hora
    const [dataCompleta, horaCompleta] = dataHora.split(' ');

    // Verificar se já existe consulta marcada
    const consultasSalvas = JSON.parse(localStorage.getItem('consultas')) || [];
    const consultaExistente = consultasSalvas.find(consulta =>
      consulta.medico === medico &&
      consulta.data === dataCompleta.split('-').reverse().join('/') &&
      consulta.hora === horaCompleta
    );

    if (consultaExistente) {
      alert('Este médico já tem uma consulta marcada para o horário selecionado. Por favor, escolha outro horário.');
      return;
    }

    // Criar objeto de consulta
    const consulta = {
      tipoConsulta,
      especialidade,
      medico,
      unidade,
      data: dataCompleta.split('-').reverse().join('/'), // Formato DD/MM/YYYY
      hora: horaCompleta,
      motivo
    };

    // Exibe o resumo da consulta
    exibirResumoConsulta(consulta);

    // Ocultar o formulário e mostrar o resumo
    document.getElementById('consultaForm').style.display = 'none';
    document.getElementById('summaryContainer').style.display = 'block';

    // Adicionar eventos aos botões Confirmar e Cancelar
    document.getElementById('confirmButton').addEventListener('click', function () {
      consultasSalvas.push(consulta);
      localStorage.setItem('consultas', JSON.stringify(consultasSalvas));
      mostrarMensagemFinal('Consulta marcada');
    });

    document.getElementById('cancelButton').addEventListener('click', function () {
      mostrarMensagemFinal('Consulta cancelada');
    });
  });

  // Função para exibir o resumo da consulta
  function exibirResumoConsulta(consulta) {
    document.getElementById('summaryData').textContent = consulta.data; // Exibe a data
    document.getElementById('summaryHora').textContent = consulta.hora; // Exibe a hora
    document.getElementById('summaryTipoConsulta').textContent = consulta.tipoConsulta; // Exibe o tipo de consulta
    document.getElementById('summaryEspecialidade').textContent = consulta.especialidade; // Exibe a especialidade
    document.getElementById('summaryMedico').textContent = consulta.medico; // Exibe o médico
    document.getElementById('summaryUnidade').textContent = consulta.unidade; // Exibe a unidade
    document.getElementById('summaryMotivo').textContent = consulta.motivo; // Exibe o motivo
  }

  // Função para mostrar a mensagem final
  function mostrarMensagemFinal(mensagem) {
    document.getElementById('summaryContainer').style.display = 'none';
    const finalMessage = document.getElementById('finalMessage');
    finalMessage.style.display = 'block';
    document.getElementById('statusMessage').innerHTML = mensagem === 'Consulta cancelada'
      ? `<h2>${mensagem}</h2><p>A sua consulta foi cancelada com sucesso. Clique no botão abaixo para marcar uma nova consulta.</p>`
      : `<h2>${mensagem}</h2><p>A sua consulta foi marcada com sucesso. Obrigado por utilizar nosso sistema!</p>`;
  }
});
