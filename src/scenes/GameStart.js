import Phaser from "../lib/phaser.js"

export default class GameStart extends Phaser.Scene
 {
 constructor()
 {
  super("game-start")
 }

 preload() {
   this.load.image("inicio", "assets/Fundo_jogo.png")
   this.load.audio("musica_fundo", ["assets/audio/background_song.mp3"]);

   this.load.image("background", "assets/Background.png")
   this.load.image("platform", "assets/PlatformReady.png")

   this.load.image("sky","assets/Parallax/BG1.png");
   this.load.image("mountains","assets/Parallax/BG2.png");
   this.load.image("forest","assets/Parallax/BG3.png");

   this.load.audio("musica_fundo", ["assets/audio/background_song.mp3"])

   this.load.spritesheet("HeroParado", "assets/Hero/Idle.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroParado2", "assets/Hero/Idle3.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroQueda", "assets/Hero/Fall.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroQueda2", "assets/Hero/Fall2.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroPulo", "assets/Hero/Jump.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroPulo2", "assets/Hero/Jump2.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroCorridaEsq", "assets/Hero/RunLeft.png", { frameWidth: 180, frameHeight: 180 })
   this.load.spritesheet("HeroCorridaDir", "assets/Hero/RunRight.png", { frameWidth: 180, frameHeight: 180 });
 }

 create() {
  const width = this.scale.width;
  const height = this.scale.height;
 
  this.add.image(width*0.5, height*0.5,"inicio")

  const backgroundSound = this.sound.add("musica_fundo") 
  backgroundSound.setLoop(true);
  backgroundSound.play()
  backgroundSound.setVolume(0.025);

  this.input.keyboard.once("keydown_SPACE", () => {this.scene.start("game", backgroundSound)})

 }
 }