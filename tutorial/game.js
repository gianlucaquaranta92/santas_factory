gameState = {};

function preload() {
  this.load.image("example", "https://i.imgur.com/jJjlcWY.png");
}

function create() {
  this.platforms = this.physics.add.staticGroup();
  this.tutorial = this.platforms.create(300, 280, "example").setScale(0.8);

  this.guide = this.add
    .text(30, 20, "Help the Elf to deliver as many presents as ", {
      fill: "ddff",
    })
    .setScale(1.2)
    .setStroke("dfefg", 0.8);
  this.guide = this.add
    .text(30, 45, "he can into the tubes in 60 seconds!", { fill: "ddff" })
    .setScale(1.2)
    .setStroke("dfefg", 0.8);
  this.guide = this.add
    .text(30, 70, "Move the Elf and touch the presents bag to pick ", {
      fill: "ddff",
    })
    .setScale(1.2)
    .setStroke("dfefg", 0.8);
  this.guide = this.add
    .text(30, 95, "up a present,then fly and hit the tube that has  ", {
      fill: "ddff",
    })
    .setScale(1.2)
    .setStroke("dfefg", 0.8);
  this.guide = this.add
    .text(30, 120, "the right result to deliver the present!", { fill: "ddff" })
    .setScale(1.2)
    .setStroke("dfefg", 0.8);
  this.guide = this.add
    .text(350, 420, "Click to start Play")
    .setScale(1.2)
    .setStroke("#DF2323", 3);
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
