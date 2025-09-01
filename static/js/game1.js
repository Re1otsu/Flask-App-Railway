const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const gameOverModal = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");

let score = 0;
const infoSources = ["кітап", "телефон", "газет", "компьютер", "теледидар"];
const items = [
  {name: "кітап", img: "static/img/book.png"},
  {name: "телефон", img: "static/img/phone.png"},
  {name: "алма", img: "static/img/apple.png"},
  {name: "доп", img: "static/img/ball.png"},
  {name: "орындық", img: "static/img/chair.png"},
  {name: "теледидар", img: "static/img/tv.png"},
  {name: "табиғат", img: "static/img/nature.png"},
  {name: "компьютер", img: "static/img/computer.png"},
  {name: "газет", img: "static/img/newspaper.png"},
  {name: "машина", img: "static/img/car.png"}
];

let remainingItems = [...items];

function spawnItem() {
  if (!remainingItems.length) return;

  const index = Math.floor(Math.random() * remainingItems.length);
  const itemData = remainingItems.splice(index, 1)[0];

  const item = document.createElement("img");
  item.src = itemData.img;
  item.classList.add("item");

  let x = Math.random() * (gameArea.clientWidth - 80);
  let y = gameArea.clientHeight;
  item.style.left = x + "px";
  item.style.top = y + "px";

  gameArea.appendChild(item);

  const interval = setInterval(() => {
    y -= 2;
    item.style.top = y + "px";
    if (y < -100) {
      clearInterval(interval);
      item.remove();
      checkGameEnd();
    }
  }, 20);

  item.onclick = () => {
    if (infoSources.includes(itemData.name)) {
      score++;

      const star = document.createElement("div");
      star.textContent = "⭐";
      star.classList.add("star");
      star.style.left = item.offsetLeft + "px";
      star.style.top = item.offsetTop + "px";
      gameArea.appendChild(star);

      setTimeout(() => star.remove(), 1000);
      message.textContent = "";
    } else {
      message.textContent = "❌ Бұл ақпарат көзі емес!";
    }

    clearInterval(interval);
    item.remove();
    checkGameEnd();
  };
}

// Ойын аяқталғанын тексеру
function checkGameEnd() {
  if (!remainingItems.length && !gameArea.querySelector(".item")) {
    clearInterval(gameInterval);
    showGameOver();
  }
}
function showGameOver() {
  finalScore.textContent = `Ұпай: ${score}`;
  gameOverModal.classList.remove("hidden");

  fetch("/game_result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game_name: "Ақпарат-алу",
        score: score,
        completed: true
      })
    }).then(res => res.json()).then(data => {
      document.getElementById('result-box').style.display = 'block';
    });
}

// Әр 1.5 секундта жаңа сурет шығару
const gameInterval = setInterval(() => {
  if (remainingItems.length) spawnItem();
}, 1500);
