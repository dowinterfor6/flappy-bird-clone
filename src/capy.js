const CONSTANTS = {
    CAPY_WIDTH: 40,
    CAPY_HEIGHT: 30,
    GRAVITY: 0.4,
    FLAP_SPEED: 8,
    TERMINAL_VEL: 12
};

export default class Capy {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = dimensions.width / 3; //do i need this.dimensions instead? no i dont
        this.y = dimensions.height / 2;
        this.vel = 0;
    }

    flap() {
        this.vel = CONSTANTS.FLAP_SPEED * -1;
    }

    moveCapy() {
        this.y += this.vel;
        this.vel += CONSTANTS.GRAVITY;

        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            switch(this.vel > 0) {
                case true:
                    this.vel = CONSTANTS.TERMINAL_VEL;
                    break;
                case false:
                    this.vel = CONSTANTS.TERMINAL_VEL * -1;
                    break;
            }
        }
    }
    
    animate(ctx) {
        this.moveCapy();
        this.drawCapy(ctx);
    }

    drawCapy(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.CAPY_WIDTH, CONSTANTS.CAPY_HEIGHT);
    }

    bounds() {
        return { 
            left: this.x,
            right: this.x + CONSTANTS.CAPY_WIDTH,
            top: this.y,
            bottom: this.y + CONSTANTS.CAPY_HEIGHT
        };
    }

    outOfBounds() {
        const aboveTop = this.y < 0;
        const belowBottom = this.y + CONSTANTS.CAPY_HEIGHT > this.dimensions.height;
        return aboveTop || belowBottom;
    }
}