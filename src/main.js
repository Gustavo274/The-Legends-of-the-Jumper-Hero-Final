import Phaser from "./lib/phaser.js";

import Game from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import GameStart from "./scenes/GameStart.js";

console.dir(Phaser)

export default new Phaser.Game({
    type: Phaser.AUTO,
    width:450,
    height: 417,
    scene: [GameStart, Game, GameOver],
    scale: {mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH},
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    }
});