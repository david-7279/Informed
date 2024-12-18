document.querySelectorAll('.specialties ul li').forEach(item => {
    item.addEventListener('click', () => {
        alert(`Você clicou na especialidade: ${item.textContent}`);
    });
});

/* */
document.querySelector('.back-btn').addEventListener('click', () => {
    alert('Voltando para a página anterior...');
});

document.querySelector('.view-doctors').addEventListener('click', () => {
    alert('Redirecionando para a lista de médicos...');
});
