window.addEventListener("DOMContentLoaded", () => {
  const text = document.getElementById("greeting-text");
  const flower = document.getElementById("flower-container");

  // Показываем текст 3 секунды, затем скрываем
  setTimeout(() => {
    text.style.opacity = 0;

    setTimeout(() => {
      text.style.display = "none";
      flower.style.display = "block";

      // После того как цветок появился — запускаем анимации
      triggerFlowerAnimation();

    }, 1500); // исчезновение текста

  }, 600); // сколько держится текст
});

function triggerFlowerAnimation() {
  for (let i = 0; i <= 14; i++) {
    const anim = document.getElementById(`animate${i}`);
    if (anim) anim.beginElement();
  }
}

var svg = document.getElementById('svg');

var animation0 = document.getElementById('animate0');
svg.addEventListener('mouseenter', function(){ animation0.beginElement(); });
var animation1 = document.getElementById('animate1');
svg.addEventListener('mouseenter', function(){ animation1.beginElement(); });
var animation2 = document.getElementById('animate2');
svg.addEventListener('mouseenter', function(){ animation2.beginElement(); });
var animation3 = document.getElementById('animate3');
svg.addEventListener('mouseenter', function(){ animation3.beginElement(); });
var animation4 = document.getElementById('animate4');
svg.addEventListener('mouseenter', function(){ animation4.beginElement(); });
var animation5 = document.getElementById('animate5');
svg.addEventListener('mouseenter', function(){ animation5.beginElement(); });
var animation6 = document.getElementById('animate6');
svg.addEventListener('mouseenter', function(){ animation6.beginElement(); });
var animation7 = document.getElementById('animate7');
svg.addEventListener('mouseenter', function(){ animation7.beginElement(); });
var animation8 = document.getElementById('animate8');
svg.addEventListener('mouseenter', function(){ animation8.beginElement(); });
var animation9 = document.getElementById('animate9');
svg.addEventListener('mouseenter', function(){ animation9.beginElement(); });
var animation10 = document.getElementById('animate10');
svg.addEventListener('mouseenter', function(){ animation10.beginElement(); });
var animation11 = document.getElementById('animate11');
svg.addEventListener('mouseenter', function(){ animation11.beginElement(); });
var animation12 = document.getElementById('animate12');
svg.addEventListener('mouseenter', function(){ animation12.beginElement(); });
var animation13 = document.getElementById('animate13');
svg.addEventListener('mouseenter', function(){ animation13.beginElement(); });
var animation14 = document.getElementById('animate14');
svg.addEventListener('mouseenter', function(){ animation14.beginElement(); });