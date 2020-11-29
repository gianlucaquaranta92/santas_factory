gameState = {};

class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "StartScene",
    });
  }
  preload() {
    this.load.image("start_background", "https://i.imgur.com/CpvvCLJ.png");
  }

  create() {
    this.platforms = this.physics.add.staticGroup();
    this.background = this.platforms.create(300, 225, "start_background");
    this.add
      .text(150, 400, "Click to Start!")
      .setScale(2)
      .setStroke("dwd", 2.5);
    this.input.on("pointerup", () => {
      this.scene.stop("StartScene");

      this.scene.start("GuideScene");
    });
  }

  update() {}
}
