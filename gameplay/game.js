gameState = {};

class GameScene extends Phaser.Scene{
  constructor(){
  super({
    key: 'GameScene'
  })
  }
  
  };

function setup() {
  const randomNumber1 = Math.floor(Math.random() * 20);
  const randomNumber2 = Math.floor(Math.random() * 20);

  let firstNumber = Math.floor(Math.random() * 10);
  let secondNumber = Math.floor(Math.random() * 10);

  let rightResult = firstNumber + secondNumber;
  let results = [];

  results.push(rightResult, randomNumber1, randomNumber2);

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffle(results);

  return { rightResult, results, firstNumber, secondNumber };
}

function preload() {
  this.load.image(
    "particle",
    "http://labs.phaser.io/assets/particles/cloud.png"
  );
  this.load.image("background", "https://i.imgur.com/XO29SNe.png");

  this.load.image("presents", "https://i.imgur.com/ky82hMs.png");
  this.load.image(
    "elf",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png"
  );

  this.load.image("platform", "https://i.imgur.com/LfjTltX.png");

  this.load.image("tube", "https://i.imgur.com/XTzhnCX.png");

  this.load.spritesheet("running_elf", "https://i.imgur.com/K75TdvB.png", {
    frameWidth: 52,
    frameHeight: 61,
  });

  this.load.spritesheet("running_present", "https://i.imgur.com/7JLog5t.png", {
    frameWidth: 57,
    frameHeight: 61,
  });

  this.load.spritesheet("stil_elf", "https://i.imgur.com/G0Bk0Nn.png", {
    frameWidth: 44,
    frameHeight: 61,
  });
}

function create() {
  this.state = "delivered";

  /* const yolo= setup();
  const rightResult = setup.rightResult;
  const results = setup.results;*/
  let { rightResult, results, firstNumber, secondNumber } = setup();

  this.platforms = this.physics.add.staticGroup();
  this.background = this.platforms.create(300, 220, "background");
  this.background.setAlpha(0.4);
  this.platforms.create(200, 431, "platform").setScale(2, 1).refreshBody();
  this.platforms.create(220, 20, "platform").setScale(1, 1);
  this.platforms.create(400, 20, "platform").setScale(1, 1);

  const tubes = this.physics.add.staticGroup();

  this.tube1 = tubes.create(150, 75, "tube");
  this.tube2 = tubes.create(300, 75, "tube");
  this.tube3 = tubes.create(450, 75, "tube");

  gameState.score_container1 = this.add.rectangle(148, 35, 50, 20, 0xffffff);
  gameState.score_container2 = this.add.rectangle(298, 35, 50, 20, 0xffffff);
  gameState.score_container3 = this.add.rectangle(448, 35, 50, 20, 0xffffff);

  let score1 = this.add.text(139, 27, results[0], { fill: "0x000" });
  let score2 = this.add.text(290, 27, results[1], { fill: "0x000" });
  let score3 = this.add.text(440, 27, results[2], { fill: "0x000" });

  gameState.operators = this.add.rectangle(300, 420, 80, 40, 0xffffff);

  //gameState.timer_container = this.add.rectangle(100, 420, 80, 40, 0xffffff);

  this.timer = this.add
    .text(100, 395, 60, { fill: "#F5F516" })
    .setScale(3)
    .setStroke("#DF2323", 3);
  this.countDown = 60;
  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: onEvent,
    callbackScope: this,
    loop: true,
  });

  function onEvent() {
    this.countDown -= 1;
    this.timer.setText(this.countDown);
    if (this.countDown === 0) {
      this.countDown = "z";
      this.physics.pause();
      this.anims.pauseAll();
      this.add
        .text(192, 200, "Game Over! ", { fill: "#F5F516" })
        .setScale(2.5)
        .setStroke("#DF2323", 3);
      this.add
        .text(190, 300, "Click to Restart ")
        .setScale(1.5)
        .setStroke("#DF2323", 2);
      this.add
        .text(140, 250, "Your Score is: " + gameState.win_score.text)
        .setScale(2)
        .setStroke("#DF2323", 3);
      gameState.active = false;
      this.input.on("pointerup", () => {
        this.anims.resumeAll();
        this.scene.restart();
      });
    }
  }
  /*
  function cd(a) {
    setInterval(() => {
      a -= 1;
      if (a === 0) {
        clearInterval();
      }
      
    }, 1000);
    return a
  }
  let a = cd(this.countDown);
  console.log(a);
  this.timer.setText(a);*/

  gameState.score = this.add
    .text(395, 405, "SCORE")
    .setScale(1.7)
    .setStroke("#DF2323", 3);

  gameState.player_score = this.add.rectangle(510, 420, 50, 30, 0xffffff);

  this.winScore = 0;
  gameState.win_score = this.add
    .text(490, 411, 0, { fill: "0x000" })
    .setScale(1.5);

  this.arithmetic_operators = this.add
    .text(265, 405, firstNumber, {
      fill: "0x000",
    })
    .setScale(2);
    this.addition = this.add
    .text(290, 405, '+', {
      fill: "0x000",
    })
    .setScale(2);
  this.arithmetic_operators2 = this.add
    .text(315, 405, secondNumber, {
      fill: "0x000",
    })
    .setScale(2);

  const presents = this.physics.add.staticGroup();
  this.presents = presents.create(35, 340, "presents").setScale(1.4);

  this.physics.add.collider(this.presents, this.platforms);

  this.player = this.physics.add.sprite(330, 350, "stil_elf").setScale(0.8);

  this.physics.add.collider(this.player, this.platforms, () => {
    this.collide = "is_colliding";
  });
  this.player.setCollideWorldBounds(true);

  this.physics.add.collider(this.player, this.tube1, () => {
    if (
      parseInt(score1.text, 10) === rightResult &&
      this.state === "delivery_package"
    ) {
      const {
        rightResult: newRightResult,
        results: newResults,
        firstNumber: newFirstNumber,
        secondNumber: newSecondNumber,
      } = setup();
      score1.text = newResults[0];
      score2.text = newResults[1];
      score3.text = newResults[2];
      rightResult = newRightResult;
      firstNumber = newFirstNumber;
      secondNumber = newSecondNumber;
      this.arithmetic_operators.text = newFirstNumber;
      this.arithmetic_operators2.text = newSecondNumber;
      this.state = "delivered";
      this.winScore += 10;
      gameState.win_score.setText(this.winScore);
    }
  });

  this.physics.add.collider(this.player, this.tube2, () => {
    if (
      parseInt(score2.text, 10) === rightResult &&
      this.state === "delivery_package"
    ) {
      const {
        rightResult: newRightResult,
        results: newResults,
        firstNumber: newFirstNumber,
        secondNumber: newSecondNumber,
      } = setup();
      score1.text = newResults[0];
      score2.text = newResults[1];
      score3.text = newResults[2];
      rightResult = newRightResult;
      firstNumber = newFirstNumber;
      secondNumber = newSecondNumber;
      this.arithmetic_operators.text = newFirstNumber;
      this.arithmetic_operators2.text = newSecondNumber;
      this.state = "delivered";
      this.winScore += 10;
      gameState.win_score.setText(this.winScore);
    }
  });
  this.physics.add.collider(this.player, this.tube3, () => {
    if (
      parseInt(score3.text, 10) === rightResult &&
      this.state === "delivery_package"
    ) {
      const {
        rightResult: newRightResult,
        results: newResults,
        firstNumber: newFirstNumber,
        secondNumber: newSecondNumber,
      } = setup();
      score1.text = newResults[0];
      score2.text = newResults[1];
      score3.text = newResults[2];
      rightResult = newRightResult;
      firstNumber = newFirstNumber;
      secondNumber = newSecondNumber;
      this.arithmetic_operators.text = newFirstNumber;
      this.arithmetic_operators2.text = newSecondNumber;
      this.state = "delivered";
      this.winScore += 10;
      gameState.win_score.setText(this.winScore);
    }
  });

  this.physics.add.collider(this.player, presents, () => {
    if (this.state === "delivered") {
      this.player.anims.pause();
      this.state = "delivery_package";

      this.player.anims.play("still", true);
    }
  });

  this.anims.create({
    key: "run",
    frames: this.anims.generateFrameNumbers("running_elf", {
      start: 0,
      end: 12,
    }),
    frameRate: 24,
    repeat: -1,
  });
  this.anims.create({
    key: "runPresent",
    frames: this.anims.generateFrameNumbers("running_present", {
      start: 0,
      end: 11,
    }),
    frameRate: 24,
    repeat: -1,
  });

  this.anims.create({
    key: "still",
    frames: this.anims.generateFrameNumbers("stil_elf", {
      start: 0,
      end: 0,
    }),
    frameRate: 1,
    repeat: 1,
  });

  this.anims.create({
    key: "still_with_present",
    frames: this.anims.generateFrameNumbers("running_present", {
      start: 0,
      end: 0,
    }),
    frameRate: 1,
    repeat: 1,
  });
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown & (this.state === "delivered")) {
    this.player.setVelocityX(-200);
    this.player.anims.play("run", true);
    this.player.flipX = true;
  } else if (cursors.right.isDown & (this.state === "delivered")) {
    this.player.setVelocityX(200);
    this.player.anims.play("run", true);
    this.player.flipX = false;
  } else if (cursors.up.isDown & (this.state === "delivered")) {
    var particles = this.add.particles("particle");

    this.emitter = particles.createEmitter({
      speed: 20,
      gravity: { x: 500, y: 5000 },
      scale: { start: 0.02, end: 0.1 },
      follow: this.player,
    });

    this.emitter.setPosition(0, 10);

    this.emitter.setBlendMode(Phaser.BlendModes.ADD);
    this.player.setVelocityY(-150);
    this.emitter.explode();
  } /*else if (cursors.down.isDown) {
    this.player.setVelocityY(150);
  }*/ else if (
    !cursors.left.isDown &
    !cursors.right.isDown &
    !cursors.up.isDown &
    (this.state === "delivered")
  ) {
    this.player.setVelocityX(0);
    this.player.anims.play("still", true);
  }

  if (cursors.left.isDown & (this.state === "delivery_package")) {
    this.player.setVelocityX(-200);
    this.player.anims.play("runPresent", true);
    this.player.flipX = true;
  } else if (cursors.right.isDown & (this.state === "delivery_package")) {
    this.player.setVelocityX(200);
    this.player.anims.play("runPresent", true);
    this.player.flipX = false;
  } else if (cursors.up.isDown & (this.state === "delivery_package")) {
    var particles = this.add.particles("particle");

    this.emitter = particles.createEmitter({
      speed: 20,
      gravity: { x: 500, y: 5000 },
      scale: { start: 0.02, end: 0.1 },
      follow: this.player,
    });

    this.emitter.setPosition(0, 10);

    this.emitter.setBlendMode(Phaser.BlendModes.ADD);
    this.player.setVelocityY(-150);
    this.emitter.explode();
  } /*else if (cursors.down.isDown) {
    this.player.setVelocityY(150);
  }*/ else if (
    !cursors.left.isDown &
    !cursors.right.isDown &
    !cursors.up.isDown &
    (this.state === "delivery_package")
  ) {
    this.player.setVelocityX(0);
    this.player.anims.play("still_with_present", true);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 450,
  backgroundColor: "b9eaff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      enableBody: true,
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const Game = new Phaser.Game(config);
