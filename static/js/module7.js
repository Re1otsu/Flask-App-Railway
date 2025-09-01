const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const targetShapes = [
    {type: "rect", x: 100, y: 200, width: 200, height: 150, color: "#cccccc"},
    {type: "triangle", x: 200, y: 100, width: 100, height: 100, color: "#cccccc"},
    {type: "rect", x: 160, y: 250, width: 50, height: 100, color: "#cccccc"}
  ];

  const userShapes = [];

  function drawShape(shape) {
    ctx.fillStyle = shape.color;
    if (shape.type === "rect") {
      ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.width / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else if (shape.type === "triangle") {
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y);
      ctx.lineTo(shape.x + shape.width / 2, shape.y + shape.height);
      ctx.lineTo(shape.x - shape.width / 2, shape.y + shape.height);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    targetShapes.forEach(s => drawShape({...s, color: "#eeeeee"}));
    userShapes.forEach(drawShape);
  }

  function addShape() {
    const shape = {
      type: document.getElementById("shape").value,
      color: document.getElementById("color").value,
      x: parseInt(document.getElementById("x").value),
      y: parseInt(document.getElementById("y").value),
      width: parseInt(document.getElementById("width").value),
      height: parseInt(document.getElementById("height").value),
    };
    userShapes.push(shape);
    drawAll();
  }

  function shapesSimilar(s1, s2) {
    return s1.type === s2.type &&
           Math.abs(s1.x - s2.x) < 30 &&
           Math.abs(s1.y - s2.y) < 30 &&
           Math.abs(s1.width - s2.width) < 30 &&
           Math.abs(s1.height - s2.height) < 30;
  }

  function checkMatch() {
    let matched = 0;
    targetShapes.forEach(target => {
      if (userShapes.some(user => shapesSimilar(user, target))) {
        matched++;
      }
    });
    const percent = Math.round((matched / targetShapes.length) * 100);
    let message = `Сәйкестік: ${percent}%.`;
    if (percent >= 90) {
      message += " 🎉 Жарайсың!";
      sendProgress(percent);
    } else if (percent >= 70) {
      message += " 👍 Жақсы!";
    } else {
      message += " 🤔 Тағы байқап көр!";
    }
    document.getElementById("result").textContent = message;
  }

  function sendProgress(score) {
    fetch("/game_result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        game_name: "shape_builder",
        score: score,
        completed: true
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Жіберілді:", data);
    })
    .catch(err => {
      console.error("Қате:", err);
    });
  }

  drawAll();