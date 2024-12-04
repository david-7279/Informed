document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os valores dos campos
    const tipoConsulta = document.getElementById('tipoConsulta').value;
    const especialidade = document.getElementById('especialidade').value;
    const medico = document.getElementById('medico').value;
    const unidade = document.getElementById('unidade').value;
    const dataHora = document.getElementById('dataHora').value;
    const motivo = document.getElementById('motivo').value;

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

document.getElementById('cancelButton').addEventListener('click', function() {
    // Exibe a seção de cancelamento
    document.getElementById('cancelSection').style.display = 'block';

    // Oculta o formulário e o resumo
    document.getElementById('consultaForm').style.display = 'none';
    document.getElementById('summaryContainer').style.display = 'none';
});

// Funcionalidade para o botão "Voltar" na seção de cancelamento
document.getElementById('goBackButtonCancel').addEventListener('click', function() {
    // Opcional: redirecionar para outra página ou restaurar o formulário
    window.location.href = "consult.html"; // Ajuste conforme necessário
});

document.getElementById('confirmButton').addEventListener('click', function() {
    // Exibe a seção de confirmação
    document.getElementById('confirmSection').style.display = 'block';  // Mudando para 'flex' para aplicar o layout flexbox

    // Oculta o formulário e o resumo
    document.getElementById('consultaForm').style.display = 'none';
    document.getElementById('summaryContainer').style.display = 'none';
   
});


// Voltar para o formulário
document.getElementById('goBackButton').addEventListener('click', function() {
    // Esconde a seção de confirmação
    document.getElementById('confirmSection').style.display = 'none';
    window.location.href = "consult.html"; 

    // Exibe novamente o formulário e o resumo
    document.getElementById('consultaForm').style.display = 'block';
    document.getElementById('summaryContainer').style.display = 'none';  // O resumo pode estar oculto até o formulário ser enviado
});
