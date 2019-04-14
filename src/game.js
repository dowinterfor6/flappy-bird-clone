import Bird from "./bird";
import Level from "./level";

export default class FlappyBird {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d"); //instance of drawing context
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();
    }

    play() {
        this.running = true;
        this.animate();
    }

    animate() {
        // calls level#animate(ctx)
        this.level.animate(this.ctx);
        this.bird.animate(this.ctx);
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this)); //bind 'this' game instance instead of?
        }
    }

    restart() {
        this.running = false;
        this.level = new Level(this.dimensions);
        this.bird = new Bird(this.dimensions);
        this.animate();
    }

    click(e) {
        if (!this.running) {
            this.play();
        }
        this.bird.flap();
    }

    registerEvents() {
        //honestly idk
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    }
}