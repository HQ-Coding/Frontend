const textEl = document.getElementById("loading-text");
let dots = 0;

setInterval(() => {
  dots = (dots + 1) % 4; // 0,1,2,3
  textEl.textContent = "Loading" + ".".repeat(dots);
}, 500);

const sectionOne = document.querySelector('.lightAnimation');
const step = 30;
let count_Of_Lights = Math.round(window.innerWidth / step); 

function generateSVGPositions(count) {
  const points = [];
  let x = 0;
  const yValues = [100, 120, 140, 160, 140, 120, 100]; 
  for (let i = 0; i < count; i++) {
    const y = yValues[i % yValues.length];
    points.push({ x, y });
    x += step;
  }
  return points;
}

function renderLights() {
  sectionOne.innerHTML = ""; 
  const light_Positions = generateSVGPositions(count_Of_Lights);

  light_Positions.forEach(({ x, y }, index) => {
    const lightSVG = document.createElement('img');
    lightSVG.src = 'base/img/anime/black.png';;  
    lightSVG.style.position = "absolute";
    lightSVG.style.left = x + "px";
    lightSVG.style.top = y + "px";
    lightSVG.classList.add('lightSVG');
    lightSVG.style.transform = "scale(1) translateY(0)";
    lightSVG.style.animationDelay = `${index * 0.01}s`;

    sectionOne.appendChild(lightSVG);
  });
}


renderLights();

window.addEventListener("resize", () => {
  count_Of_Lights = Math.round(window.innerWidth / step); 
  renderLights();
});
 
window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".lightAnimationFRAME").classList.add("hidden");
    }, 3000); 
  });