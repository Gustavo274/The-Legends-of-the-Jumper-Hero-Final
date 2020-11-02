import Phaser from "../lib/phaser.js"

export default class Game extends Phaser.Scene {
    personagem

    platforms

    cursors

    jumpCount = 0

    dir = 1

    k = 0

    score

    highscore = 0
    
    constructor() {
        super("game")
    }

    init() {
    this.score = 0
    }

    preload() {
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
        this.load.spritesheet("HeroCorridaDir", "assets/Hero/RunRight.png", { frameWidth: 180, frameHeight: 180 })
    }

  findBottomMostPlatform()
{
    const platforms = this.platforms.getChildren()
    let bottomPlatform = platforms[0]

    for (let i = 1; i < platforms.length; ++i)
    {
      const platform = platforms[i]

      // discard any platforms that are above current
      if (platform.y < bottomPlatform.y)
      {
        continue
      }

      bottomPlatform = platform
    }

    return bottomPlatform
}
    

    create() {
        const width = this.scale.width;
        const height = this.scale.height;
        this.myCam = this.cameras.main;

        this.platforms = this.physics.add.staticGroup();
        
        //Parallax--------------------------------------------------
        this.add.image(width*0.5, height*0.5,"sky")
        .setScale(2.6)
        .setScrollFactor(0);

        this.bg1 = this.add.tileSprite(0,0,this.width,this.height,"mountains")
        .setOrigin(0,0)
        .setScale(2.6)
        .setScrollFactor(0);

        this.bg2 = this.add.tileSprite(0,0,this.width,this.height,"forest")
        .setOrigin(0,0)
        .setScale(2.6)
        .setScrollFactor(0);
        //-----------------------------------------------------------------
        var scoreFont = "bold 100px Arial";
         
         const style = { color: "#DCDCDC", fontSize: 24 }
         this.scoreLabel = this.add.text(70, 40, "Score: 0", style).setScrollFactor(0).setOrigin(0.5, 0);
         this.scoreLabel.align = "left";

        
        const abacate = this.platforms.create(140, 320, "platform").setScale(0.2).body.updateFromGameObject()

        
        for (let i = 0; i < 5; ++i) {
            const x = Phaser.Math.Between(200, 500)
            const y = 150 * i

            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x, y, "platform")
            platform.scale = 0.2

            /** @type {Phaser.Physics.Arcade.StaticBody} */
            const body = platform.body
            body.updateFromGameObject()
        } 
        this.personagem = this.physics.add.sprite(140, 270, "HeroParado")
        this.physics.add.collider(this.platforms, this.personagem)
        //Hitbox - Collision box, false diz para só haver colisão com objetos vindo de baixo
        this.personagem.setSize(32, 50, true);
        this.personagem.body.checkCollision.up = false
        //this.personagem.body.checkCollision.left = false
        //this.personagem.body.checkCollision.right = false
        
        //Camera ---------------------------------------------
        this.cameras.main.startFollow(this.personagem)
        //this.cameras.main.setBounds(0, 0, width* 3, height);
        //-----------------------------------------------------

        
        this.cursors = this.input.keyboard.createCursorKeys()
        this.cursors = this.input.keyboard.addKeys({up:Phaser.Input.Keyboard.KeyCodes.W,down:Phaser.Input.Keyboard.KeyCodes.S,left:Phaser.Input.Keyboard.KeyCodes.A,right:Phaser.Input.Keyboard.KeyCodes.D});
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.anims.create({
            key: "andaresquerda",
            frames: this.anims.generateFrameNumbers("HeroCorridaEsq", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "andardireita",
            frames: this.anims.generateFrameNumbers("HeroCorridaDir", { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "parado",
            frames: this.anims.generateFrameNumbers("HeroParado", {start: 0, end: 10}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "parado2",
            frames: this.anims.generateFrameNumbers("HeroParado2",{start: 0, end: 10}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "Pulo",
            frames: this.anims.generateFrameNumbers("HeroPulo",{start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "Pulo2",
            frames: this.anims.generateFrameNumbers("HeroPulo2",{start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "Caindo",
            frames: this.anims.generateFrameNumbers("HeroQueda",{start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
          });
        
        this.anims.create({
            key: "Caindo2",
            frames: this.anims.generateFrameNumbers("HeroQueda2",{start: 0, end: 2}),
            frameRate: 10,
            repeat: -1
          });
    }

    update(t, dt) {
        const touchingDown = this.personagem.body.touching.down

        const dir = 0
        const yAnt = 0

        //Parallax-------------------------------------
        this.bg1.tilePositionX = this.myCam.scrollX * .02;
        this.bg2.tilePositionX = this.myCam.scrollX * .04;
        //-----------------------------------------------

        this.platforms.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = child

            const scrollY = this.cameras.main.scrollY
            if (platform.y >= scrollY + 560) {
                platform.y = scrollY - Phaser.Math.Between(60, 68)
                platform.x = Phaser.Math.Between(200, 500)
                platform.body.updateFromGameObject()
                this.score +=1
                this.scoreLabel.text = ("Score: ") + this.score;
            }
        })

        if (this.cursors.left.isDown) {
            this.personagem.setVelocityX(-200)
            if(touchingDown){
            this.personagem.anims.playReverse("andaresquerda", true);
            }
            this.dir = 0
        }
        else if (this.cursors.right.isDown) {
            this.personagem.setVelocityX(200)
            if(touchingDown){
            this.personagem.anims.play("andardireita", true);
            }
            this.dir = 1
            
        }
        else {
            // stop movement if not left or right
            this.personagem.setVelocityX(0)
            if(touchingDown){
                if(this.dir == 0){
                    this.personagem.anims.playReverse("parado2", true);
                }
                if(this.dir == 1){
                    this.personagem.anims.play("parado", true);
                }
            }
        }

        const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.up)

        if(isJumpJustDown && (touchingDown || this.jumpCount < 1)){
            this.personagem?.setVelocityY(-430)
            this.jumpCount++
            if(this.dir == 0){
                this.personagem.anims.playReverse("Pulo2", true);
            }
            if(this.dir == 1){
                this.personagem.anims.play("Pulo", true);
            }
        }

        else if(this.personagem.body.velocity.y >= 0 && !touchingDown){
            if(this.dir == 0){
                this.personagem.anims.playReverse("Caindo2", true);
            }
            if(this.dir == 1){
                this.personagem.anims.play("Caindo", true);
            }
        }

        if(touchingDown){
            this.jumpCount = 0
        }
        
        const bottomPlatform = this.findBottomMostPlatform()
        if (this.personagem.y > bottomPlatform.y + 200)
        {
            this.scene.start("game-over", { highscore: this.highscore, score: this.score })
        }
      
        if(this.highscore < this.score)
        {
          this.highscore = this.score
        }


    }
}
