import Phaser from 'phaser';

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset}) {
        super(game, x, y, asset);
        game.load.spritesheet(this, asset, 64, 64);
        game.physics.enable(this);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.direction = -1;
    }

    getPosition() {
        return this.body.position;
    }

    update() {
        if (!this.body.isMoving) {
            this.body.moveTo(1000, 100 * this.direction, 0);
            this.direction = -this.direction;
        }
    }
}
