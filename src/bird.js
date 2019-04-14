const CONSTANTS = {
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30,
    GRAVITY: 0.4,
    FLAP_SPEED: 8,
    TERMINAL_VEL: 12
};

export default class Bird {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = dimensions.width / 3; //do i need this.dimensions instead? no i dont
        this.y = dimensions.height / 2;
        this.vel = 0;
    }

    flap() {
        this.vel = CONSTANTS.FLAP_SPEED * -1;
    }

    moveBird() {
        this.y += this.vel;
        this.vel += CONSTANTS.GRAVITY;

        // in case bird travels too fast
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            // switch(this.vel > 0) {
            //     case true:
            //         this.vel = CONSTANTS.TERMINAL_VEL;
            //         break;
            //     case false:
            //         this.vel = CONSTANTS.TERMINAL_VEL * -1;
            //         break;
            // }
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }
    
    animate(ctx) {
        this.moveBird();
        this.drawBird(ctx);
    }

    drawBird(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }
}