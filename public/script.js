const exercicios = [
  { nome: "Push Up", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
  { nome: "Squat", video: "https://www.youtube.com/embed/aclHkVaku9U" },
  { nome: "Plank", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
  { nome: "Lunges", video: "https://www.youtube.com/embed/QOVaHwm-Q6U" },
  { nome: "Burpees", video: "https://www.youtube.com/embed/dZgVxmf6jkA" }
];

window.onload = () => {
  const container = document.getElementById("exercicios");

  exercicios.forEach((ex, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${ex.nome}</h3>
      <iframe width="250" height="140" src="${ex.video}" frameborder="0"></iframe>
      <div id="timer-${i}">03:00</div>
      <button onclick="startTimer(${i})">Iniciar</button>
      <br>
      <label><input type="checkbox" onchange="saveProgresso(${i}, this.checked)"> Feito</label>
    `;
    container.appendChild(card);
  });

  fetch("/status").then(res => res.json()).then(data => {
    data.forEach((val, i) => {
      document.querySelectorAll("input[type=checkbox]")[i].checked = val;
    });
  });
};

function startTimer(index) {
  let seconds = 180;
  const display = document.getElementById(`timer-${index}`);
  const interval = setInterval(() => {
    if (seconds <= 0) return clearInterval(interval);
    seconds--;
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    display.textContent = `${min}:${sec}`;
  }, 1000);
}

function saveProgresso(index, checked) {
  fetch("/progresso", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, checked })
  });
}
