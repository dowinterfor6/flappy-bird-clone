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
        //honestly this is super ugly, change this later
        if (this.gameOver()) {
            alert(this.score);
            this.restart();
        }
        
        this.level.passedPipe(this.bird.bounds(), () => {
            this.score ++;
            // console.log(this.score); //what is this doing?
        });
        
        this.drawScore();
        
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this)); //bind 'this' game instance instead of?
        }
    }
    
    restart() {
        this.running = false;
        this.level = new Level(this.dimensions);
        this.bird = new Bird(this.dimensions);
        this.score = 0;
        //should probably add a "start" button here
        //also display score instead of alert
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
        // change to any keypress?
        // this.ctx.canvas.addEventListener("keypress", this.boundClickHandler);
    }

    gameOver() {
        return (this.level.collidesWith(this.bird.bounds()) || this.bird.outOfBounds());
    }

    //i just copied this tbh
    drawScore() {
        //loc will be the location 
        // this is not in the middle and i dont like it
        const loc = { x: this.dimensions.width / 4, y: this.dimensions.height / 5 };
        this.ctx.font = "bold 50pt serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score: ${this.score}`, loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText(`Score: ${this.score}`, loc.x, loc.y);
    }
}