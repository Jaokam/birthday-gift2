/* =====================================================
   ELEMENTS
===================================================== */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyaUzSoLm0LUxJFWP7ABYgrgciEFQxWQEtNhmV5r7FLcFj51hSTr1GaWaKRcYeFRtn5iQ/exec";


/* =====================================================
   PAGE 1
===================================================== */

const startBtn = document.getElementById("startBtn");
const declineBtn = document.getElementById("declineBtn");


/* =====================================================
   PAGE 2
===================================================== */

const storyScreen = document.getElementById("storyScreen");
const world = document.getElementById("world");
const player = document.getElementById("player");
const layerBack = document.getElementById("layerBack");
const layerMiddle = document.getElementById("layerMiddle");

const storyMessage = document.getElementById("storyMessage");
const storyText = document.getElementById("storyText");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");


/* =====================================================
   PAGE 3
===================================================== */

const questionScreen = document.getElementById("questionScreen");
const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const answerInput = document.getElementById("answerInput");

const nextQuestionBtn =
  document.getElementById("nextQuestionBtn");

const skipQuestionBtn =
  document.getElementById("skipQuestionBtn");


/* =====================================================
   PAGE 4
===================================================== */

const reflectionScreen =
  document.getElementById("reflectionScreen");

const reflectionNextBtn =
  document.getElementById("reflectionNextBtn");

const answerMemory =
  document.getElementById("answerMemory");


/* =====================================================
   PAGE 5
===================================================== */

const giftScreen =
  document.getElementById("giftScreen");

const giftBox =
  document.getElementById("giftBox");

const clickHint =
  document.getElementById("clickHint");

const letterTransition =
  document.getElementById("letterTransition");

const letterScene =
  document.querySelector(".letter-scene");

const letter =
  document.getElementById("letter");

const letterPaper =
  document.getElementById("letterPaper");

const letterContent =
  document.getElementById("letterContent");


/* =====================================================
   PAGE 1 — RUNAWAY BUTTON
===================================================== */

const DETECT_DISTANCE = 170;
const EDGE_MARGIN = 25;

const MIN_DODGE_DISTANCE = 450;
const MAX_DODGE_DISTANCE = 700;

const MIN_DODGE_SPEED = 15;
const MAX_DODGE_SPEED = 22;

let mouseX = -9999;
let mouseY = -9999;

let declineX = 0;
let declineY = 0;

let declineVX = 0;
let declineVY = 0;

let declineLoose = false;
let dodging = false;

let wobbleTime = 0;


if (declineBtn) {

  const initialRect =
    declineBtn.getBoundingClientRect();

  declineX = initialRect.left;
  declineY = initialRect.top;


  document.addEventListener(
    "mousemove",
    (e) => {

      mouseX = e.clientX;
      mouseY = e.clientY;

    }
  );


  function makeLoose() {

    if (declineLoose) return;

    declineLoose = true;

    const rect =
      declineBtn.getBoundingClientRect();

    declineX = rect.left;
    declineY = rect.top;

    declineBtn.style.position = "fixed";
    declineBtn.style.left = `${declineX}px`;
    declineBtn.style.top = `${declineY}px`;
    declineBtn.style.zIndex = "9999";

  }


  function chooseEscapePosition() {

    const width =
      declineBtn.offsetWidth;

    const height =
      declineBtn.offsetHeight;

    const centerX =
      declineX + width / 2;

    const centerY =
      declineY + height / 2;

    let dx =
      centerX - mouseX;

    let dy =
      centerY - mouseY;

    let distance =
      Math.hypot(dx, dy);

    if (distance < 1) {

      dx = Math.random() - 0.5;
      dy = Math.random() - 0.5;

      distance = Math.hypot(dx, dy);

    }

    dx /= distance;
    dy /= distance;


    const randomAngle =
      (Math.random() - 0.5) * 0.7;

    const cos =
      Math.cos(randomAngle);

    const sin =
      Math.sin(randomAngle);

    const dodgeX =
      dx * cos - dy * sin;

    const dodgeY =
      dx * sin + dy * cos;


    const dodgeDistance =
      MIN_DODGE_DISTANCE +
      Math.random() *
      (MAX_DODGE_DISTANCE - MIN_DODGE_DISTANCE);


    let targetX =
      declineX +
      dodgeX * dodgeDistance;

    let targetY =
      declineY +
      dodgeY * dodgeDistance;


    const maxX =
      window.innerWidth -
      width -
      EDGE_MARGIN;

    const maxY =
      window.innerHeight -
      height -
      EDGE_MARGIN;


    targetX =
      Math.max(
        EDGE_MARGIN,
        Math.min(targetX, maxX)
      );

    targetY =
      Math.max(
        EDGE_MARGIN,
        Math.min(targetY, maxY)
      );


    const targetDX =
      targetX - declineX;

    const targetDY =
      targetY - declineY;

    const targetDistance =
      Math.hypot(
        targetDX,
        targetDY
      );


    if (targetDistance > 0) {

      const speed =
        MIN_DODGE_SPEED +
        Math.random() *
        (MAX_DODGE_SPEED - MIN_DODGE_SPEED);

      declineVX =
        (targetDX / targetDistance) * speed;

      declineVY =
        (targetDY / targetDistance) * speed;

    }

    wobbleTime = 0;
    dodging = true;

  }


  function updateRunawayButton() {

    if (!declineLoose) return;


    const rect =
      declineBtn.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const distance =
      Math.hypot(
        centerX - mouseX,
        centerY - mouseY
      );


    if (
      distance < DETECT_DISTANCE &&
      !dodging
    ) {

      chooseEscapePosition();

    }


    if (dodging) {

      declineX += declineVX;
      declineY += declineVY;


      wobbleTime += 0.22;

      const wobble =
        Math.sin(wobbleTime) * 0.7;

      declineX +=
        -declineVY * wobble;

      declineY +=
        declineVX * wobble;


      declineVX *= 0.94;
      declineVY *= 0.94;


      const speed =
        Math.hypot(
          declineVX,
          declineVY
        );


      if (speed < 0.45) {

        declineVX = 0;
        declineVY = 0;

        dodging = false;

      }


      const width =
        declineBtn.offsetWidth;

      const height =
        declineBtn.offsetHeight;


      const maxX =
        window.innerWidth -
        width -
        EDGE_MARGIN;

      const maxY =
        window.innerHeight -
        height -
        EDGE_MARGIN;


      if (declineX < EDGE_MARGIN) {

        declineX = EDGE_MARGIN;
        declineVX *= -0.35;

      }

      if (declineX > maxX) {

        declineX = maxX;
        declineVX *= -0.35;

      }

      if (declineY < EDGE_MARGIN) {

        declineY = EDGE_MARGIN;
        declineVY *= -0.35;

      }

      if (declineY > maxY) {

        declineY = maxY;
        declineVY *= -0.35;

      }


      declineBtn.style.left =
        `${declineX}px`;

      declineBtn.style.top =
        `${declineY}px`;

    }

  }


  declineBtn.addEventListener(
    "mouseenter",
    () => {

      makeLoose();
      chooseEscapePosition();

    }
  );


  declineBtn.addEventListener(
    "click",
    (e) => {

      e.preventDefault();

      makeLoose();
      chooseEscapePosition();

    }
  );


  function runawayLoop() {

    updateRunawayButton();

    requestAnimationFrame(
      runawayLoop
    );

  }

  runawayLoop();

}


/* =====================================================
   PAGE 1 → PAGE 2
===================================================== */

if (startBtn) {

  startBtn.addEventListener(
    "click",
    () => {

      const stage =
        document.querySelector(".stage");

      if (stage) {

        stage.classList.add(
          "is-leaving"
        );

      }

      setTimeout(
        () => {

          if (stage) {
            stage.style.display = "none";
          }

          if (storyScreen) {

            storyScreen.classList.add(
              "is-active"
            );

          }

          resetStoryGame();

        },
        350
      );

    }
  );

}


/* =====================================================
   PAGE 2 — STORY GAME
===================================================== */

let playerX = 300;

const PLAYER_SPEED = 5;
const WORLD_WIDTH = 5200;


/* =====================================================
   YELO PLAYER
===================================================== */

const YELO_ASSETS = {

  idle: [
    "assets/forest/Player/Idle/YeloIdle1.png",
    "assets/forest/Player/Idle/YeloIdle2.png",
    "assets/forest/Player/Idle/YeloIdle3.png",
    "assets/forest/Player/Idle/YeloIdle4.png"
  ],

  run: [
    "assets/forest/Player/Run/YeloRun1.png",
    "assets/forest/Player/Run/YeloRun2.png",
    "assets/forest/Player/Run/YeloRun3.png",
    "assets/forest/Player/Run/YeloRun4.png",
    "assets/forest/Player/Run/YeloRun5.png",
    "assets/forest/Player/Run/YeloRun6.png",
    "assets/forest/Player/Run/YeloRun7.png",
    "assets/forest/Player/Run/YeloRun8.png"
  ],

  jump: [
    "assets/forest/Player/Jump/YeloJump1.png",
    "assets/forest/Player/Jump/YeloJump2.png",
    "assets/forest/Player/Jump/YeloJump3.png",
    "assets/forest/Player/Jump/YeloJump4.png",
    "assets/forest/Player/Jump/YeloJump5.png"
  ],

  death: [
    "assets/forest/Player/Death/YeloDeath1.png",
    "assets/forest/Player/Death/YeloDeath2.png",
    "assets/forest/Player/Death/YeloDeath3.png",
    "assets/forest/Player/Death/YeloDeath4.png",
    "assets/forest/Player/Death/YeloDeath5.png"
  ]

};


/* =====================================================
   CREATE / FIND YELO SPRITE
===================================================== */

let playerSprite = null;

if (player) {

  playerSprite =
    document.getElementById("playerSprite");


  /*
     ถ้ายังไม่มี #playerSprite
     สร้างให้เองจาก player-body เดิม
  */

  if (!playerSprite) {

    playerSprite =
      document.createElement("img");

    playerSprite.id =
      "playerSprite";

    playerSprite.className =
      "player-sprite";


    const oldBody =
      player.querySelector(".player-body");

    if (oldBody) {

      oldBody.style.display =
        "none";

    }


    player.appendChild(
      playerSprite
    );

  }


  playerSprite.alt = "Yelo";


  playerSprite.style.imageRendering =
    "pixelated";


  playerSprite.style.objectFit =
    "contain";


  playerSprite.style.display =
    "block";

}


/* =====================================================
   PRELOAD YELO FRAMES
===================================================== */

const allYeloFrames = [
  ...YELO_ASSETS.idle,
  ...YELO_ASSETS.run,
  ...YELO_ASSETS.jump,
  ...YELO_ASSETS.death
];


allYeloFrames.forEach(
  (src) => {

    const img =
      new Image();

    img.src = src;

  }
);


/* =====================================================
   PLAYER ANIMATION STATE
===================================================== */

let playerState = "idle";

let playerFrame = 0;

let playerAnimationTimer = 0;

let playerFacing = 1;


/*
   ค่าเลขยิ่งน้อย = เปลี่ยนเฟรมเร็วขึ้น
*/

const PLAYER_ANIMATION_SPEED = {

  idle: 180,

  run: 90,

  jump: 110,

  death: 140

};


/* =====================================================
   SET PLAYER STATE
===================================================== */

function setPlayerState(
  newState
) {

  if (
    playerState === newState
  ) return;


  playerState =
    newState;

  playerFrame = 0;

  playerAnimationTimer = 0;

  updatePlayerSprite();

}


/* =====================================================
   UPDATE SPRITE IMAGE
===================================================== */

function updatePlayerSprite() {

  if (!playerSprite) return;


  const frames =
    YELO_ASSETS[playerState];


  if (
    !frames ||
    frames.length === 0
  ) return;


  playerFrame =
    Math.min(
      playerFrame,
      frames.length - 1
    );


  playerSprite.src =
    frames[playerFrame];


  /*
     หันซ้าย / ขวา
  */

  playerSprite.style.transform =
    `translateX(-50%) scaleX(${playerFacing})`;

}


/* =====================================================
   PLAYER ANIMATION LOOP
===================================================== */

function updatePlayerAnimation(
  deltaTime
) {

  if (!playerSprite) return;


  playerAnimationTimer +=
    deltaTime;


  const frameDelay =
    PLAYER_ANIMATION_SPEED[playerState];


  if (
    playerAnimationTimer >=
    frameDelay
  ) {

    playerAnimationTimer = 0;

    playerFrame++;


    const frames =
      YELO_ASSETS[playerState];


    if (
      playerFrame >=
      frames.length
    ) {

      /*
         Jump เล่นจนจบแล้ว
         ถ้ายังอยู่กลางอากาศ
         กลับไปเฟรมสุดท้าย
      */

      if (
        playerState === "jump"
      ) {

        playerFrame =
          frames.length - 1;

      } else {

        playerFrame = 0;

      }

    }


    updatePlayerSprite();

  }

}


/* =====================================================
   MOVEMENT
===================================================== */

let movingLeft = false;
let movingRight = false;


/* =====================================================
   JUMP PHYSICS
===================================================== */

let playerY = 0;

let playerVelocityY = 0;

let isJumping = false;

const GRAVITY = 0.65;
const JUMP_POWER = 12;


/* =====================================================
   JUMP
===================================================== */

function jumpPlayer() {

  if (
    !storyScreen ||
    !storyScreen.classList.contains(
      "is-active"
    )
  ) return;


  if (storyPaused) return;


  if (isJumping) return;


  isJumping = true;

  playerVelocityY =
    -JUMP_POWER;

  setPlayerState("jump");


  if (player) {

    player.classList.add(
      "is-jumping"
    );

  }

}


/* =====================================================
   UPDATE JUMP
===================================================== */

function updatePlayerJump() {

  if (!isJumping) return;


  playerY +=
    playerVelocityY;

  playerVelocityY +=
    GRAVITY;


  if (
    playerY >= 0
  ) {

    playerY = 0;

    playerVelocityY = 0;

    isJumping = false;


    if (player) {

      player.classList.remove(
        "is-jumping"
      );

    }


    if (
      movingLeft ||
      movingRight
    ) {

      setPlayerState(
        "run"
      );

    } else {

      setPlayerState(
        "idle"
      );

    }

  }


  if (player) {

    player.style.bottom =
      `calc(23% + ${-playerY}px)`;

  }

}


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
  "keydown",
  (e) => {

    const key =
      e.key.toLowerCase();


    if (
      key === "arrowleft" ||
      key === "a"
    ) {

      movingLeft = true;

      playerFacing = -1;

      if (!isJumping) {

        setPlayerState(
          "run"
        );

      }

      updatePlayerSprite();

    }


    if (
      key === "arrowright" ||
      key === "d"
    ) {

      movingRight = true;

      playerFacing = 1;

      if (!isJumping) {

        setPlayerState(
          "run"
        );

      }

      updatePlayerSprite();

    }


    if (
      key === "arrowup" ||
      key === "w" ||
      e.code === "Space"
    ) {

      /*
         กัน Space ทำหน้าเว็บเลื่อน
      */

      e.preventDefault();

      jumpPlayer();

    }

  }
);


document.addEventListener(
  "keyup",
  (e) => {

    const key =
      e.key.toLowerCase();


    if (
      key === "arrowleft" ||
      key === "a"
    ) {

      movingLeft = false;

    }


    if (
      key === "arrowright" ||
      key === "d"
    ) {

      movingRight = false;

    }


    /*
       ถ้าหยุดเดินแล้ว
       และไม่ได้กระโดด → Idle
    */

    if (
      !movingLeft &&
      !movingRight &&
      !isJumping
    ) {

      setPlayerState(
        "idle"
      );

    }

  }
);


/* =====================================================
   MOBILE CONTROLS
===================================================== */

function stopMovement() {

  movingLeft = false;
  movingRight = false;


  if (!isJumping) {

    setPlayerState(
      "idle"
    );

  }

}


if (leftBtn) {

  leftBtn.addEventListener(
    "pointerdown",
    (e) => {

      e.preventDefault();

      movingLeft = true;

      playerFacing = -1;

      if (!isJumping) {

        setPlayerState(
          "run"
        );

      }

      updatePlayerSprite();

    }
  );


  leftBtn.addEventListener(
    "pointerup",
    stopMovement
  );


  leftBtn.addEventListener(
    "pointercancel",
    stopMovement
  );


  leftBtn.addEventListener(
    "pointerleave",
    stopMovement
  );

}


if (rightBtn) {

  rightBtn.addEventListener(
    "pointerdown",
    (e) => {

      e.preventDefault();

      movingRight = true;

      playerFacing = 1;

      if (!isJumping) {

        setPlayerState(
          "run"
        );

      }

      updatePlayerSprite();

    }
  );


  rightBtn.addEventListener(
    "pointerup",
    stopMovement
  );


  rightBtn.addEventListener(
    "pointercancel",
    stopMovement
  );


  rightBtn.addEventListener(
    "pointerleave",
    stopMovement
  );

}


/* =====================================================
   MOBILE JUMP BUTTON
===================================================== */

let jumpBtn =
  document.getElementById("jumpBtn");


if (
  !jumpBtn &&
  storyScreen
) {

  const controls =
    storyScreen.querySelector(
      ".controls"
    );


  if (controls) {

    jumpBtn =
      document.createElement("button");

    jumpBtn.id =
      "jumpBtn";

    jumpBtn.className =
      "control-btn control-jump";

    jumpBtn.textContent =
      "↑";

    jumpBtn.setAttribute(
      "aria-label",
      "กระโดด"
    );


    controls.appendChild(
      jumpBtn
    );

  }

}


if (jumpBtn) {

  jumpBtn.addEventListener(
    "pointerdown",
    (e) => {

      e.preventDefault();

      jumpPlayer();

    }
  );

}


/* =====================================================
   STORY MESSAGE
===================================================== */

let storyMessageTimeout = null;


function showStory(text) {

  if (
    !storyMessage ||
    !storyText
  ) return;


  storyText.textContent =
    text;


  storyMessage.classList.add(
    "is-visible"
  );


  storyPaused = true;


  if (storyMessageTimeout) {

    clearTimeout(
      storyMessageTimeout
    );

  }


  storyMessageTimeout =
    setTimeout(
      () => {

        storyMessage.classList.remove(
          "is-visible"
        );

        storyPaused = false;

      },
      9000
    );

}


/* =====================================================
   STORY POINTS
===================================================== */

const storyPoints = [

  {
    x: 1000,
    text:
      "เราเคยเป็นเพื่อนกันตั้งแต่ ม.ต้น ตอนนั้นฉันเคยแอบหึงแกด้วยนะ แต่ก็ไม่เคยกล้าคิดอะไรเกินเพื่อน เพราะฉันรู้ว่า ฉันอาจชอบใครได้ง่าย แต่การจะรักใครสักคนจริง ๆ มันยากสำหรับฉัน"
  },

  {
    x: 2300,
    text:
      "พอขึ้น ม.ปลาย เราก็ค่อย ๆ ห่างกันไป จนสุดท้ายก็กลายเป็นแค่เพื่อนร่วมห้อง ตอนนั้นฉันเองก็ไม่ได้คิดอะไร คิดว่าก็คงเป็นแบบนี้ไปเรื่อย ๆ แต่พอถึง ม.6 เราก็ได้กลับมาคุยกันอีกครั้ง"
  },

  {
    x: 3300,
    text:
      "ขอบคุณนะ สำหรับมอนิ่ง กู๊ดไนท์ Reel ก่อนนอน และคำชมเล็ก ๆ ในทุกวัน สำหรับฉัน สิ่งพวกนี้ไม่เคยเป็นเรื่องเล็กเลย ขอบคุณที่พยายามเข้ามาหาฉัน และขอบคุณที่ทำให้ชีวิตของฉันสดใสขึ้น ขอบคุณที่เข้ามาในชีวิตนะ"
  }

];


const triggeredPoints =
  new Set();


function checkStoryPoints() {

  storyPoints.forEach(
    (point, index) => {

      if (
        playerX >= point.x &&
        !triggeredPoints.has(index)
      ) {

        triggeredPoints.add(index);

        showStory(
          point.text
        );

      }

    }
  );

}


/* =====================================================
   CAMERA
===================================================== */

function updateCamera() {

  if (
    !world ||
    !player
  ) return;


  const viewport =
    document.getElementById(
      "gameViewport"
    );


  const viewportWidth =
    viewport
      ? viewport.clientWidth
      : window.innerWidth;


  const screenCenter =
    viewportWidth / 2;


  let cameraX =
    playerX - screenCenter;


  cameraX =
    Math.max(
      0,
      Math.min(
        cameraX,
        WORLD_WIDTH -
        viewportWidth
      )
    );


  world.style.transform =
    `translate3d(${-cameraX}px, 0, 0)`;


  /*
     PARALLAX
     ฉากที่อยู่ไกลกว่า (ท้องฟ้า/ภูเขา/ป่าไกล ๆ)
     ต้องเลื่อนช้ากว่าโลกจริง
  */

  if (layerMiddle) {

    layerMiddle.style.transform =
      `translate3d(${-cameraX * 0.35}px, 0, 0)`;

  }

  if (layerBack) {

    layerBack.style.transform =
      `translate3d(${-cameraX * 0.12}px, 0, 0)`;

  }

}


/* =====================================================
   RESET STORY GAME
===================================================== */

function resetStoryGame() {

  playerX = 300;

  playerY = 0;

  playerVelocityY = 0;

  isJumping = false;

  movingLeft = false;

  movingRight = false;

  playerFacing = 1;

  storyPaused = false;

  triggeredPoints.clear();


  if (storyMessage) {

    storyMessage.classList.remove(
      "is-visible"
    );

  }


  if (player) {

    player.style.left =
      `${playerX}px`;

    player.style.bottom =
      "23%";

    player.classList.remove(
      "is-walking",
      "is-jumping"
    );

  }


  setPlayerState(
    "idle"
  );


  updateCamera();

}


/* =====================================================
   GAME LOOP
===================================================== */

let lastGameTime =
  performance.now();


function gameLoop(
  currentTime
) {

  const deltaTime =
    Math.min(
      currentTime -
      lastGameTime,
      50
    );


  lastGameTime =
    currentTime;


  const storyIsActive =
    storyScreen &&
    storyScreen.classList.contains(
      "is-active"
    );


  if (
    storyIsActive &&
    player
  ) {

    /*
       เดินเฉพาะตอนที่
       ไม่มีข้อความหยุดเกม
    */

    if (!storyPaused) {

      if (movingLeft) {

        playerX -=
          PLAYER_SPEED;

      }


      if (movingRight) {

        playerX +=
          PLAYER_SPEED;

      }


      playerX =
        Math.max(
          0,
          Math.min(
            playerX,
            WORLD_WIDTH - 100
          )
        );


      player.style.left =
        `${playerX}px`;


      /*
         Animation ตอนเดิน
      */

      if (
        !isJumping
      ) {

        if (
          movingLeft ||
          movingRight
        ) {

          if (
            playerState !== "run"
          ) {

            setPlayerState(
              "run"
            );

          }

          player.classList.add(
            "is-walking"
          );

        } else {

          if (
            playerState !== "idle"
          ) {

            setPlayerState(
              "idle"
            );

          }

          player.classList.remove(
            "is-walking"
          );

        }

      }


      updatePlayerJump();

      updateCamera();

      checkStoryPoints();


      /*
         จุดจบของฉาก
      */

      if (
        playerX > 4400
      ) {

        storyPaused = true;


        if (
          storyMessage &&
          storyText
        ) {

          storyText.textContent =
            "มาถึงตรงนี้แล้ว ขอถามอะไรหน่อยนะ";


          storyMessage.classList.add(
            "is-visible"
          );

        }


        setTimeout(
          () => {

            goToQuestions();

          },
          1800
        );

      }

    }

  }


  /*
     Animation ยังทำงาน
     แม้ตอน storyPaused
  */

  if (
    storyIsActive
  ) {

    updatePlayerAnimation(
      deltaTime
    );

  }


  requestAnimationFrame(
    gameLoop
  );

}


gameLoop(
  performance.now()
);


/* =====================================================
   PAGE 2 → PAGE 3
===================================================== */

function goToQuestions() {

  movingLeft = false;

  movingRight = false;


  if (storyScreen) {

    storyScreen.classList.remove(
      "is-active"
    );

  }


  setTimeout(
    () => {

      if (questionScreen) {

        questionScreen.classList.add(
          "is-active"
        );

      }

      currentQuestion = 0;

      answers = [];

      resetQuestionPage();

      showQuestion();

    },
    350
  );

}


/* =====================================================
   PAGE 3 — QUESTIONS
===================================================== */

const questions = [

  "ช่วงนี้มีอะไรที่ทำให้เธอมีความสุขที่สุด?",

  "มีอะไรที่เธออยากทำก่อนเรียนจบไหม?",

  "ถ้าให้เลือกเก็บความทรงจำหนึ่งเรื่องในชีวิตมัธยมไว้ เธอจะเลือกเรื่องอะไร",

  "ช่วงนี้มีอะไรที่เธอกำลังสนใจเป็นพิเศษไหม?",

  "แล้ววันเกิดปีนี้ เธออยากขออะไรให้ตัวเองที่สุด?"

];


let currentQuestion = 0;
let answers = [];
let questionsFinished = false;


/* =====================================================
   SHOW QUESTION
===================================================== */

function showQuestion() {

  if (
    !questionText ||
    !questionNumber ||
    !answerInput
  ) {

    console.error(
      "PAGE 3 ELEMENTS NOT FOUND"
    );

    return;

  }


  questionNumber.textContent =
    currentQuestion + 1;

  questionText.textContent =
    questions[currentQuestion];

  answerInput.value = "";


  setTimeout(
    () => {

      if (
        questionScreen &&
        questionScreen.classList.contains(
          "is-active"
        )
      ) {

        answerInput.focus();

      }

    },
    50
  );

}


/* =====================================================
   SAVE ANSWER
===================================================== */

function saveCurrentAnswer() {

  if (!answerInput) return;

  answers[currentQuestion] =
    answerInput.value.trim();

}


/* =====================================================
   RESET QUESTIONS
===================================================== */

function resetQuestionPage() {

  questionsFinished = false;


  if (answerInput) {

    answerInput.style.display =
      "block";

    answerInput.value = "";

  }


  if (nextQuestionBtn) {

    nextQuestionBtn.style.display =
      "inline-block";

  }


  if (skipQuestionBtn) {

    skipQuestionBtn.style.display =
      "inline-block";

    skipQuestionBtn.textContent =
      "ข้าม";

  }

}


/* =====================================================
   NEXT QUESTION
===================================================== */

if (nextQuestionBtn) {

  nextQuestionBtn.addEventListener(
    "click",
    () => {

      if (questionsFinished) return;


      saveCurrentAnswer();

      currentQuestion++;


      if (
        currentQuestion >=
        questions.length
      ) {

        finishQuestions();

        return;

      }


      showQuestion();

    }
  );

}


/* =====================================================
   SKIP QUESTION
===================================================== */

if (skipQuestionBtn) {

  skipQuestionBtn.addEventListener(
    "click",
    () => {

      if (questionsFinished) return;


      answers[currentQuestion] = "";

      currentQuestion++;


      if (
        currentQuestion >=
        questions.length
      ) {

        finishQuestions();

        return;

      }


      showQuestion();

    }
  );

}


/* =====================================================
   FINISH QUESTIONS
===================================================== */

function finishQuestions() {

  questionsFinished = true;

  sendAnswersToGoogleSheet();


  if (questionNumber) {

    questionNumber.textContent =
      "✓";

  }


  if (questionText) {

    questionText.textContent =
      "ขอบคุณที่เล่าให้ฟังนะ :)";

  }


  if (answerInput) {

    answerInput.style.display =
      "none";

  }


  if (nextQuestionBtn) {

    nextQuestionBtn.style.display =
      "none";

  }


  if (skipQuestionBtn) {

    skipQuestionBtn.textContent =
      "มีอะไรอยากให้ดู →";

  }

}


/* =====================================================
   PAGE 3 → PAGE 4
===================================================== */

if (skipQuestionBtn) {

  skipQuestionBtn.addEventListener(
    "click",
    () => {

      if (!questionsFinished) return;

      goToReflection();

    }
  );

}


function goToReflection() {

  if (
    !questionScreen ||
    !reflectionScreen
  ) return;


  questionScreen.classList.remove(
    "is-active"
  );


  setTimeout(
    () => {

      reflectionScreen.classList.add(
        "is-active"
      );

      showReflectionAnswer();

    },
    350
  );

}


/* =====================================================
   PAGE 4 — REFLECTION
===================================================== */

function showReflectionAnswer() {

  if (!answerMemory) return;


  const filledAnswers =
    answers.filter(
      answer =>
        answer &&
        answer.length > 0
    );


  if (
    filledAnswers.length === 0
  ) {

    answerMemory.innerHTML = `
      <div class="answer-memory__empty">
        เธอข้ามไปเยอะเหมือนกันนะ 👀
      </div>
    `;

    return;

  }


  const randomAnswer =
    filledAnswers[
      Math.floor(
        Math.random() *
        filledAnswers.length
      )
    ];


  answerMemory.innerHTML = `
    <div class="answer-memory__label">
      คำตอบหนึ่งที่ฉันจำได้
    </div>

    <div class="answer-memory__text">
      "${escapeHTML(randomAnswer)}"
    </div>
  `;

}


function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}


/* =====================================================
   PAGE 4 → PAGE 5
===================================================== */

if (reflectionNextBtn) {

  reflectionNextBtn.addEventListener(
    "click",
    () => {

      if (
        !reflectionScreen ||
        !giftScreen
      ) return;


      reflectionScreen.classList.remove(
        "is-active"
      );


      setTimeout(
        () => {

          giftScreen.classList.add(
            "is-active"
          );

          resetGiftPage();

        },
        350
      );

    }
  );

}


/* =====================================================
   PAGE 5 — GIFT
===================================================== */

let giftClicks = 0;
let giftOpened = false;
let giftTransitionStarted = false;


/* =====================================================
   RESET GIFT PAGE
===================================================== */

function resetGiftPage() {

  giftClicks = 0;
  giftOpened = false;
  giftTransitionStarted = false;


  if (giftBox) {

    giftBox.classList.remove(
      "is-clicked",
      "is-open"
    );

    giftBox.disabled = false;

  }


  if (clickHint) {

    clickHint.textContent =
      "กดที่กล่องสิ";

  }


  if (letter) {

    letter.classList.remove(
      "is-visible"
    );

  }


  if (letterContent) {

    letterContent.classList.remove(
      "is-visible"
    );

  }


  if (letterTransition) {

    letterTransition.classList.remove(
      "is-active"
    );

  }


  if (letterScene) {

    letterScene.classList.remove(
      "is-hidden"
    );

  }

}


/* =====================================================
   GIFT CLICK
===================================================== */

if (giftBox) {

  giftBox.addEventListener(
    "click",
    () => {

      if (giftOpened) return;


      giftClicks++;


      giftBox.classList.remove(
        "is-clicked"
      );


      void giftBox.offsetWidth;


      giftBox.classList.add(
        "is-clicked"
      );


      setTimeout(
        () => {

          if (giftBox) {

            giftBox.classList.remove(
              "is-clicked"
            );

          }

        },
        180
      );


      if (
        giftClicks === 1
      ) {

        if (clickHint) {

          clickHint.textContent =
            "อีกที 👀";

        }

        return;

      }


      if (
        giftClicks === 2
      ) {

        if (clickHint) {

          clickHint.textContent =
            "อีกครั้งเดียว...";

        }

        return;

      }


      if (
        giftClicks >= 3
      ) {

        openGift();

      }

    }
  );

}


/* =====================================================
   OPEN GIFT
===================================================== */

function openGift() {

  if (
    giftOpened ||
    giftTransitionStarted
  ) return;


  giftOpened = true;
  giftTransitionStarted = true;


  if (giftBox) {

    giftBox.classList.remove(
      "is-clicked"
    );


    void giftBox.offsetWidth;


    giftBox.classList.add(
      "is-open"
    );


    giftBox.disabled = true;

  }


  if (clickHint) {

    clickHint.textContent =
      "";

  }


  setTimeout(
    () => {

      if (letterTransition) {

        letterTransition.classList.add(
          "is-active"
        );

      }

    },
    650
  );


  setTimeout(
    () => {

      if (letterScene) {

        letterScene.classList.add(
          "is-hidden"
        );

      }

    },
    900
  );


  setTimeout(
    () => {

      if (letter) {

        letter.classList.add(
          "is-visible"
        );

      }

    },
    1200
  );


  setTimeout(
    () => {

      if (letterTransition) {

        letterTransition.classList.remove(
          "is-active"
        );

      }

    },
    1450
  );

}


/* =====================================================
   LETTER OPEN
===================================================== */

if (letterPaper) {

  letterPaper.addEventListener(
    "click",
    () => {

      if (!letter) return;


      letter.classList.remove(
        "is-visible"
      );


      setTimeout(
        () => {

          if (letterContent) {

            letterContent.classList.add(
              "is-visible"
            );

          }

        },
        300
      );

    }
  );

}


/* =====================================================
   GOOGLE SHEETS
===================================================== */

async function sendAnswersToGoogleSheet() {

  if (!GOOGLE_SCRIPT_URL) {

    console.warn(
      "ยังไม่ได้ใส่ Google Script URL"
    );

    return;

  }


  const data = {

    answer1:
      answers[0] || "",

    answer2:
      answers[1] || "",

    answer3:
      answers[2] || "",

    answer4:
      answers[3] || "",

    answer5:
      answers[4] || ""

  };


  try {

    await fetch(
      GOOGLE_SCRIPT_URL,
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );


    console.log(
      "ส่งคำตอบไป Google Sheets แล้ว 💌"
    );

  } catch (error) {

    console.error(
      "ส่งคำตอบไม่สำเร็จ:",
      error
    );

  }

}


/* =====================================================
   INITIAL STATE
===================================================== */

if (storyScreen) {

  storyScreen.classList.remove(
    "is-active"
  );

}


if (questionScreen) {

  questionScreen.classList.remove(
    "is-active"
  );

}


if (reflectionScreen) {

  reflectionScreen.classList.remove(
    "is-active"
  );

}


if (giftScreen) {

  giftScreen.classList.remove(
    "is-active"
  );

}


resetStoryGame();

resetGiftPage();


console.log(
  "🎂 Birthday project loaded successfully!"
);