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
  scene: [StartScene, GameScene, GuideScene],
};

const Game = new Phaser.Game(config);
