const CONSTANTS = {
    HORIZONTAL_PIPE_SPACING: 220,
    PIPE_GAP: 150,
    WARMUP_SECONDS: 1,
    EDGE_BUFFER: 50,
    PIPE_WIDTH: 50,
    PIPE_SPEED: 2
};

export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        const firstPipeDistance = this.dimensions.width + (CONSTANTS.WARMUP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);

        this.pipes = [
            this.randomPipe(firstPipeDistance),
            this.randomPipe(firstPipeDistance + CONSTANTS.HORIZONTAL_PIPE_SPACING),
            this.randomPipe(firstPipeDistance + (2 * CONSTANTS.HORIZONTAL_PIPE_SPACING))
        ];
    }

    randomPipe(distance) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.PIPE_GAP;
        const topOfGap = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const pipe = {
            topPipe: {
                left: distance,
                right: CONSTANTS.PIPE_WIDTH + distance,
                top: 0,
                bottom: topOfGap
            },
            bottomPipe: {
                left: distance,
                right: CONSTANTS.PIPE_WIDTH + distance,
                top: topOfGap + CONSTANTS.PIPE_GAP,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return pipe;
    }

    movePipes() {
        this.eachPipe(function(pipe) {
            pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;
            pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;
            pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;
            pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;
        });

        if (this.pipes[0].topPipe.right <= 0) {
            this.pipes.shift();
            const newXOffset = this.pipes[1].topPipe.left + CONSTANTS.HORIZONTAL_PIPE_SPACING;
            this.pipes.push(this.randomPipe(newXOffset));
        }
    }

    drawPipes(ctx) {
        this.eachPipe(function(pipe) {
            ctx.fillStyle = "green";
            
            ctx.fillRect(
                pipe.topPipe.left,
                pipe.topPipe.top,
                CONSTANTS.PIPE_WIDTH,
                pipe.topPipe.bottom - pipe.topPipe.top
            );
            ctx.fillRect(
                pipe.bottomPipe.left,
                pipe.bottomPipe.top,
                CONSTANTS.PIPE_WIDTH,
                pipe.bottomPipe.bottom - pipe.bottomPipe.top
            );
        });
    }

    eachPipe(callback) {
        this.pipes.forEach(callback.bind(this));
    }

    drawBackground(ctx) {
        ctx.fillStyle = "skyblue";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height); 
    }

    animate(ctx) {
        this.drawBackground(ctx);
        this.movePipes();
        this.drawPipes(ctx);
    }

    collidesWith(capyBound) {
        const _overlap = (pipe, capy) => {
            if (pipe.left > capy.right || pipe.right < capy.left) {
                return false;
            }
            if (pipe.top > capy.bottom || pipe.bottom < capy.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.eachPipe((pipe) => {
            if (_overlap(pipe.topPipe, capyBound) || _overlap(pipe.bottomPipe, capyBound)) {
                collision = true;
            }
        });
        return collision;
    }

    passedPipe(capy, callback) {
        this.eachPipe((pipe) => {
            if (pipe.topPipe.right < capy.left) {
                if (!pipe.passed) {
                    pipe.passed = true;
                    callback();
                }
            }
        });
    }
}