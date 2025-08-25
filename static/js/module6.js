const allDrawings = [
  {
    name: "Саңырауқұлақ",
    pixels: [
        "..........",
        "..gggggg..",
        ".gggggggg.",
        ".gggggggg.",
        "..gggggg..",
        "....mm....",
        "....mm....",
        "....mm....",
        "....mm....",
        "..........",
    ]

  },
  {
    name: "Смайлик",
    pixels: [
      "..........",
      "..yyyyyy..",
      ".y......y.",
      ".y.o..o.y.",
      ".y......y.",
      ".y......y.",
      ".y.nnnn.y.",
      ".y......y.",
      "..yyyyyy..",
      "..........",
    ]
  },
  {
    name: "Жүрек",
    pixels: [
        "..........",
        "..rr..rr..",
        ".rrrrrrrr.",
        ".rrrrrrrr.",
        ".rrrrrrrr.",
        "..rrrrrr..",
        "...rrrr...",
        "....rr....",
        "..........",
        "..........",
    ]

  },
  {
    name: "Үй",
    pixels: [
        "....bb....",
        "...bbbb...",
        "..bbbbbb..",
        ".bbbbbbbb.",
        ".m......m.",
        ".m.wwww.m.",
        ".m.wwww.m.",
        ".m......m.",
        ".mmmmmmmm.",
        "..........",
    ]
  }
];

const colors = ["red", "yellow", "blue", "green", "black", "white", "brown"];
const colorMap = {
  "y": "yellow",
  "r": "red",
  "b": "blue",
  "g": "green",
  "n": "black",
  "w": "white",
  "o": "black",
  ".": "white",
  "m": "brown"
};

let currentLevel = 0;
let selectedColor = "red";

function createColorButtons() {
  const colorButtonsDiv = document.getElementById("color-buttons");
  colors.forEach(color => {
    const btn = document.createElement("button");
    btn.style.backgroundColor = color;
    btn.classList.add("color-button");
    btn.dataset.color = color;
    btn.onclick = () => {
      selectedColor = color;
      document.querySelectorAll(".color-button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    colorButtonsDiv.appendChild(btn);
  });
}

function createGrid(id, pixels = null, isReference = false) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const div = document.createElement("div");
      div.classList.add("cell");

      if (isReference && pixels) {
        div.style.background = colorMap[pixels[y][x]];
      } else {
        div.dataset.y = y;
        div.dataset.x = x;
        div.style.background = "white";
        div.addEventListener("click", () => {
          div.style.background = selectedColor;
        });
      }

      container.appendChild(div);
    }
  }
}


function hideReference() {
  document.getElementById("reference").style.display = "none";
}

function showReference() {
  document.getElementById("reference").style.display = "grid";
}

let score = 0;  // 👈 глобал айнымалы ретінде жоғарыда жарияла

function checkDrawing() {
  const pixels = allDrawings[currentLevel].pixels.map(row => row.split(""));
  const cells = document.querySelectorAll("#grid .cell");
  let correct = 0;
  let total = 0;

  cells.forEach(cell => {
    const y = cell.dataset.y;
    const x = cell.dataset.x;
    const expectedColor = colorMap[pixels[y][x]];
    const actualColor = cell.style.background;

    if (expectedColor !== "white") {
      total++;
      if (expectedColor === actualColor) {
        correct++;
      }
    }
  });

  score = total > 0 ? Math.round((correct / total) * 100) : 0;
  document.getElementById("result").textContent = `Дәлдік: ${score}%`;

  if (score >= 80) {
    alert("Жарайсың! Келесі суретке өттің!");
    nextLevel();  // Бұл жерде sendProgress(score) кейін шақырылады
  } else {
    alert("Тағы бір рет байқап көр!");
  }
}


function nextLevel() {
  currentLevel++;
  if (currentLevel >= allDrawings.length) {
    alert("🎉 Барлық деңгей аяқталды!");
    document.getElementById("result").textContent = `Ойын аяқталды! Жалпы ұпай: ${score}`;
    sendProgress(score);  // ✅ Осында жіберу
    return;
  }

  startLevel();
}


function startLevel() {
  const targetPixels = allDrawings[currentLevel].pixels.map(row => row.split(""));

  createGrid("reference", targetPixels, true);
  createGrid("grid");

  showReference();
  setTimeout(hideReference, 4000);
  document.getElementById("result").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  createColorButtons();
  startLevel();
});

function sendProgress(score) {
  fetch("/game_result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      game_name: "paint",
      score: score,
      completed: true
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "ok") {
      alert("Прогресс сақталды!");
    } else {
      alert("Сақтау сәтсіз: " + (data.message || "белгісіз қате"));
    }
  })
  .catch(err => {
    alert("Қате жіберілді: " + err);
  });
}