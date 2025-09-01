document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const games = document.querySelectorAll('.game');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            games.forEach(g => g.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.game).classList.add('active');
        });
    });
});
