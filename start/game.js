gameState = {};

function preload() {
  this.load.image("background", "https://i.imgur.com/CpvvCLJ.png");
}

function create() {
  this.platforms = this.physics.add.staticGroup();
  this.background = this.platforms.create(300, 225, "background");
  this.add.text(150, 400, "Click to Start!").setScale(2).setStroke("dwd", 2.5);
}

function update() {}

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
