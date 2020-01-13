const gameSection = document.getElementById("game-section");
let insect = "";
let i = 0;
let score = 0;
let interval;

function reset() {
  i = 0;
  score = 0;
  gameSection.innerHTML = "";
  insect = "";
  if (interval) {
    clearInterval(interval);
  }
}

function onInsectClick(context) {
  reset();
  let children = [].slice.apply(context.children);
  let insectImageTag = children.find(el => el.tagName === "IMG");
  insect = insectImageTag.src;
  startGame();
}

function createInsect() {
  const x = Math.floor(Math.random() * 101);
  const y = Math.floor(Math.random() * 101);
  let img = document.createElement("img");
  img.setAttribute("src", `${insect}`);
  img.setAttribute("height", "100px");
  img.setAttribute("width", "100px");
  img.setAttribute("id", "image");
  img.style.top = `${x % 200}px`;
  img.style.left = `${y % 800}px`;
  img.style.position = `relative`;
  img.style.transform = `rotate(${Math.floor(Math.random() * 101) * 10}deg)`;
  img.classList.add("insectHover");
  let playGround = document.getElementById("playground");
  playGround.appendChild(img);
  img.addEventListener("click", () => {
    setTimeout(() => {
      img.style.visibility = "hidden";
      score++;
      document
        .getElementById("score")
        .removeChild(document.getElementById("score").children[0]);
      let h1Node = document.createElement("h1");
      h1Node.appendChild(document.createTextNode(`Score :${score}`));
      document.getElementById("score").appendChild(h1Node);
    }, 0);
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 2000);
  });
  return img;
}

function createPlayGround() {
  let playGround = `<div id ="playground"></div>`;
  gameSection.innerHTML += playGround;
  let imageNode = createInsect();
  document.getElementById("playground").appendChild(imageNode);
}

function createTimer() {
  interval = setInterval(() => {
    let seconds = Number(i % 60);
    let minutes = Math.floor(i / 60);
    let time =
      String(minutes).padStart(2, 0) + " : " + String(seconds).padStart(2, 0);
    let timer = document.getElementById("timer");
    timer.removeChild(timer.childNodes[0]);
    const timeNode = document.createElement("h2");
    let text = `${time}`;
    timeNode.appendChild(document.createTextNode(text));
    document.getElementById("timer").appendChild(timeNode);

    i++;
  }, 1000);
}

function startGame() {
  let gameUI = `
    <div class="game-header">
        <div id="timer" class="timer"> </div>
        <div class="score" id="score""> <h1>Score :${score}</h1></div>
    </div>
  `;
  gameSection.innerHTML = gameUI;
  createTimer();
  createPlayGround();
}
