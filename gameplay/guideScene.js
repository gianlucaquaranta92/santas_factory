gameState = {};

class GuideScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GuideScene",
    });
  }
  preload() {
    this.load.image("example", "https://i.imgur.com/jJjlcWY.png");
    this.load.image("arrows", "https://i.imgur.com/pyCS7Rg.png");
  }

  create() {
    this.platforms = this.physics.add.staticGroup();
    this.tutorial = this.platforms.create(400, 280, "example").setScale(0.8);
    this.arrows = this.platforms.create(120, 350, "arrows");

    this.guide = this.add
    .text(30, 225, "Use the arrows to", {
      fill: "ddff",
    }).setScale(1.1)
    .setStroke("dfefg", 0.8);
    this.guide = this.add
    .text(30, 250, "move the ELf!", {
      fill: "ddff",
    }).setScale(1.1)
    .setStroke("dfefg", 0.8);
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
      .text(30, 120, "the right result, to deliver the present!", {
        fill: "ddff",
      })
      .setScale(1.2)
      .setStroke("dfefg", 0.8);
    this.guide = this.add
      .text(350, 420, "Click to start Play")
      .setScale(1.2)
      .setStroke("#DF2323", 3);

    this.input.on("pointerup", () => {
      this.scene.stop("GuideScene");
      this.scene.start("GameScene");
    });
  }

  update() {}
}
