const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lives: document.querySelector("#lives"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
      gameOverTime: 200,
      lives: 3,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);

      playSound("gameover");
      setTimeout(() => {
        alert("Game Over! O seu resultado foi: " + state.values.result);
      }, state.values.gameOverTime);
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        } else {
          state.values.lives--;
          state.view.lives.textContent = `x${state.values.lives}`;
          playSound("miss");
  
          if (state.values.lives <= 0) {
            clearInterval(state.actions.timerId);
            clearInterval(state.actions.countDownTimerId);
  
            playSound("gameover");
            setTimeout(() => {
              alert("Você perdeu todas as vidas!");
            }, state.values.gameOverTime);
          }
        }
      });
    });
  }
  
  function initialize() {
    addListenerHitBox();
  }
  
  initialize();
  