import Phaser from 'phaser';

const LEFT = 'left';
const RIGHT = 'right';

const PLAYER_LEFT_FRAME = 0;
const PLAYER_RIGHT_FRAME = 1;

export default class extends Phaser.Sprite {
    constructor({game, x, y, asset}) {
        super(game, x, y, asset);
        game.physics.enable(this);

        this.game = game;

        this.body.collideWorldBounds = true;
        this.anchor.setTo(0.5);
        this.direction = -1;
        this.facing = LEFT;

        this.body.velocity.x = 0;
        this.body.setSize(180, 250, 40, 4);
        this.scale.setTo(0.5, 0.5);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpTimer = 0;
        console.log({body: this.body, onFloor: this.body.onFloor()})

    }

    update() {
        if (this.facing == LEFT) {
            this.frame = PLAYER_LEFT_FRAME;
        } else {
            this.frame = PLAYER_RIGHT_FRAME;
        }

        if (this.jumpButton.isDown && this.body.onFloor() && game.time.now > this.jumpTimer)
        {
            this.body.velocity.y = -250;
            this.jumpTimer = game.time.now + 750;
        }

        if (!this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.body.velocity.x =0;
        } else if (this.cursors.left.isDown) {
            this.facing = LEFT;
            this.body.velocity.x = -150;

            // if (this.facing != LEFT)
            // {
            //     this.animations.play(LEFT);
            //     this.facing = LEFT;
            // }
        } else if (this.cursors.right.isDown) {
            this.facing = RIGHT;
            this.body.velocity.x = 150;

            // if (this.facing != RIGHT)
            // {
            //     this.animations.play(RIGHT);
            //     this.facing = RIGHT;
            // }
        }
        // else
        // {
        //     if (this.facing != 'idle')
        //     {
        //         // this.animations.stop();
        //
        //         if (this.facing == LEFT)
        //         {
        //             this.frame = 0;
        //         }
        //         else
        //         {
        //             this.frame = 1;
        //         }
        //
        //         this.facing = 'idle';
        //     }
        // }
    }
}
