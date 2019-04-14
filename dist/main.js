/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/capy.js":
/*!*********************!*\
  !*** ./src/capy.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Capy; });\n// A hash of constants that can be changed based on capy sprite hitbox\n// and other properties\nconst CONSTANTS = {\n    CAPY_WIDTH: 50,  // Width of capy hitbox\n    CAPY_HEIGHT: 38, // Height of capy hitbox\n    GRAVITY: 0.4,    // 'Acceleration' value representing gravity\n    FLAP_SPEED: 8,   // 'Acceleration' value of a #flap\n    TERMINAL_VEL: 12 // Maximum velocity the capy can reach\n};\n\nclass Capy {\n    /*\n    Constructor function that sets the appropriate dimensions of the canvas,\n    as well as the position of the capy relative to the canvas. The velocity\n    is initialized to be 0 to indicate the stopped value.\n    */\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = dimensions.width / 3;\n        this.y = dimensions.height / 2;\n        this.vel = 0;\n    }\n    \n    /*\n    Animation function that takes in the canvas and #moveCapy before drawing\n    it on the canvas for rendering\n    */\n    animate(ctx) {\n        this.moveCapy();\n        this.drawCapy(ctx);\n    }\n\n    /*\n    Capy is represented as a yellow rectangle currently, but can by passed in as an\n    image.\n    */\n    drawCapy(ctx) {\n        // ctx.fillStyle = \"yellow\";\n        // ctx.fillRect(this.x, this.y, CONSTANTS.CAPY_WIDTH, CONSTANTS.CAPY_HEIGHT);\n        let capySprite = new Image();\n        capySprite.src = 'assets/images/capy-sprite-small.png';\n        // capySprite.onload = () => {\n        ctx.drawImage(capySprite, this.x, this.y);\n        // };\n    }\n\n    /*\n    Capy is adjusted according to y position based on current velocity, and the \n    effects of gravity is added to the velocity for the next update in position.\n    Capy rotation can be added later, with a max range to represent a parabolic \n    function's tangent at a certain position.\n    */\n    moveCapy() {\n        this.y += this.vel;\n        this.vel += CONSTANTS.GRAVITY;\n        \n        /*\n        Logic to determine whether or not to reset the velocity to the terminal\n        velocity. Though switch case is not necessary, it is an alternative to \n        if comments, and I prefer the clarity of switch cases.\n        */\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            switch(this.vel > 0) {\n                case true:\n                    this.vel = CONSTANTS.TERMINAL_VEL;\n                    break;\n                case false:\n                    this.vel = CONSTANTS.TERMINAL_VEL * -1;\n                    break;\n            }\n        }\n    }\n\n    // Simple method that is called whenever there is an appropriate keypress, \n    // and increments the velocity by the FLAP_SPEED\n    flap() {\n        this.vel = CONSTANTS.FLAP_SPEED * -1;\n    }\n\n    /*\n    Method that returns a POJO containing the capy hitbox, for use when determining\n    if the capy has hit out of bounds, or one of the pipes. \n    When using a custom sprite, the hitboxes may be a little off, and different extremes\n    may potentially be a better choice\n    */\n    bounds() {\n        return { \n            left: this.x,\n            right: this.x + CONSTANTS.CAPY_WIDTH,\n            top: this.y,\n            bottom: this.y + CONSTANTS.CAPY_HEIGHT\n        };\n    }\n\n    /*\n    Logic that handles the testing of if the capy has hit the upper and lower bounds of\n    the canvas, as given by the dimensions passed into the constructor.\n    */\n    outOfBounds() {\n        const aboveTop = this.y < 0;\n        const belowBottom = this.y + CONSTANTS.CAPY_HEIGHT > this.dimensions.height;\n        return aboveTop || belowBottom;\n    }\n}\n\n//# sourceURL=webpack:///./src/capy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlappyCapy; });\n/* harmony import */ var _capy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capy */ \"./src/capy.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n// Import capy and level\n\n\n\nclass FlappyCapy {\n    /* \n    Constructor function that will start a 2d drawing context,\n    instantiate dimensions of the canvas context,\n    start an event listener for mouse clicks (implement space bar later),\n    and start the game loop.\n    */\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.restart();\n    }\n    \n    /*\n    Animation of the Game instance that calls the animation of\n    the Capy and Level instances, within this context.\n    */\n    animate() {\n        this.level.animate(this.ctx);\n        this.capy.animate(this.ctx);\n\n        /* \n        After animating all the instances, #gameOver will be called\n        which will return the user to the starting frame of the game\n        via #restart if needed.\n        */\n        if (this.gameOver()) {\n            alert(this.score);\n            this.restart();\n        }\n        \n        // Simple method to increment score whenever a pipe is passed\n        this.level.passedPipe(this.capy.bounds(), () => {\n            this.score ++;\n        });\n        \n        // Display score\n        this.drawScore();\n        \n        /*\n        Unless the game is over, run #animate via callback while\n        binding this Game instance. #requestAnimationFrame will only\n        call #callback according to standard refresh rate, e.g. 60fps\n        */\n       if (this.running) {\n           requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n    \n    /*\n    Displays the current score of the Game by drawing on the current context\n    and filling in the strings with interpolated values. \n    */\n    drawScore() {\n        const loc = { x: this.dimensions.width / 4, y: this.dimensions.height / 5 };\n        this.ctx.font = \"bold 50pt serif\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(`Score: ${this.score}`, loc.x, loc.y);\n        this.ctx.strokeStyle = \"black\";\n        this.ctx.lineWidth = 2;\n        this.ctx.strokeText(`Score: ${this.score}`, loc.x, loc.y);\n    }\n    \n    // Starts off the game state and runs the initial #animate call\n    play() {\n        this.running = true;\n        this.animate();\n    }\n\n    /*\n    Whenever the game is over, this method will be invoked to reset\n    game state and create new Level and Capy instances, as well as\n    resetting the score and calling #animate\n    */\n    restart() {\n        this.running = false;\n        this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.capy = new _capy__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n        this.score = 0;\n        this.animate();\n    }\n    \n    /*\n    Event handler method that will determine what the keypress will\n    do. #click can take a variable, but is not used in this case.\n    If the game is not running, e.g. first keypress after #gameOver or \n    page load has not been made, it will #play the game.\n    The capy will #flap per keypress.\n    NOTE: This method isn't actually necessary right now, it can be \n    incorporated within the callback in #registerEvents\n    */\n    /*\n    click(e) {\n        if (!this.running) {\n            this.play();\n        }\n        this.capy.flap();\n    }\n    */\n\n    /*\n    Add event listener to the page, attached to the canvas in this Game instance,\n    listening to a \"mousedown\" action and having a callback of what #click would do.\n\n    NOTE: #click could be called as an instance variable invoked method, \n    binding this Game instance to it, and passed into the callback instead, e.g.\n    this.boundClickHandler = this.click.bind(this);\n    this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n    */\n    registerEvents() {\n        this.ctx.canvas.addEventListener(\"mousedown\", () => {\n            if (!this.running) {\n                this.play();\n            }\n            this.capy.flap();\n        });\n    }\n\n    /*\n    Returns whether or not the capy has hit one of the pipes or\n    the upper/lower boundaries of the Level\n    */\n    gameOver() {\n        return (this.level.collidesWith(this.capy.bounds()) || this.capy.outOfBounds());\n    }\n\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n// Import class and constructor from js file\n\n\n// Create constants to grab elements from index\nconst canvas = document.getElementById(\"capy-game\");\n\n// Create a new game instance and passing in relevant variables\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\n// A hash of level constants that can be changed to adjust game difficulty\nconst CONSTANTS = {\n    HORIZONTAL_PIPE_SPACING: 220, // Space between pipes on x axis\n    PIPE_GAP: 150,                // Space between top and bototm pipes\n    WARMUP_SECONDS: 1,            // Time between first click and first pipe appearing\n    EDGE_BUFFER: 50,              // Distance between the level bounds and gap extremes\n    PIPE_WIDTH: 50,               // Width of the pipe hitbox\n    PIPE_SPEED: 2,                // Frequency of pipe spawn\n    PIPE_IMAGE_HEIGHT: 640\n};\n\nclass Level {\n    /*\n    Constructor function that sets the dimensions of the Level instance, and\n    handles the pipe logic. Pipe spawns will be kept track of in an array (ideally\n    a queue, but JS does not have a queue object natively), where the first pipe\n    will be added after the warmup time passes, and subsequent pipes are added \n    at a fixed horizontal distance away, as defined by constants hash\n    */\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        const firstPipeDistance = this.dimensions.width + (CONSTANTS.WARMUP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);\n\n        this.pipes = [\n            this.randomPipe(firstPipeDistance),\n            this.randomPipe(firstPipeDistance + CONSTANTS.HORIZONTAL_PIPE_SPACING),\n            this.randomPipe(firstPipeDistance + (2 * CONSTANTS.HORIZONTAL_PIPE_SPACING))\n        ];\n    }\n\n    /*\n    #animate that takes in context given by the game, and proceeds\n    to draw the background and pipes element onto the canvas.\n    #movePipes is called before it is drawn in order for the visible \n    pipes to more accurately reflect the current location, e.g. if #movePipes\n    is called after #drawPipes, the visible pipes will actually represent the\n    previous position of the pipes in the last event loop cycle (1 frame ago).\n    Background clouds will be added at a later time.\n    */\n    animate(ctx) {\n        this.drawBackground(ctx);\n        this.movePipes();\n        this.drawPipes(ctx);\n    }\n\n    /*\n    Pipes are drawn onto the canvas with #fillRect and colored with #fillStyle,\n    which will be replaced by actual images at a later time, using #drawImage or \n    whatever the method is called, positioned for each pipe.\n    */\n    drawPipes(ctx) {\n        this.eachPipe(function(pipe) {\n            // ctx.fillStyle = \"green\";\n            \n            // ctx.fillRect(\n            //     pipe.topPipe.left,\n            //     pipe.topPipe.top,\n            //     CONSTANTS.PIPE_WIDTH,\n            //     pipe.topPipe.bottom - pipe.topPipe.top\n            // );\n            // ctx.fillRect(\n            //     pipe.bottomPipe.left,\n            //     pipe.bottomPipe.top,\n            //     CONSTANTS.PIPE_WIDTH,\n            //     pipe.bottomPipe.bottom - pipe.bottomPipe.top\n            // );\n\n            let topPipeRender = new Image();    \n            topPipeRender.src = 'assets/images/top-pipe.png';\n            ctx.drawImage(topPipeRender, pipe.topPipe.left, pipe.topPipe.bottom - pipe.topPipe.top - CONSTANTS.PIPE_IMAGE_HEIGHT);\n\n            let bottomPipeRender = new Image();\n            bottomPipeRender.src = 'assets/images/bottom-pipe.png';\n            ctx.drawImage(bottomPipeRender, pipe.bottomPipe.left, CONSTANTS.PIPE_IMAGE_HEIGHT - (pipe.bottomPipe.bottom - pipe.bottomPipe.top));\n        });\n    }\n\n    /*\n    Logic that moves each pipe across the screen. Pipe speed is determined by the\n    constants hash defined earlier, and will be placed in a callback called by #eachPipe.\n    #eachPipe is necessary to properly retain 'this' when iterating through the pipes\n    as it will be used for various functions.\n    */\n    movePipes() {\n        this.eachPipe(function(pipe) {\n            pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;\n            pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;\n            pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;\n            pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;\n        });\n\n        /*\n        Whenever a pipe completely passes out of the dimensions of the canvas\n        it should be shifted from the array and a new, randomly generated pair\n        of pipes should be pushed into the array. Unfortunately, JS does not\n        have #first and #last methods for array indices. \n        */\n        if (this.pipes[0].topPipe.right <= 0) {\n            this.pipes.shift();\n            /*\n            This constant is assigned the extra distance in which the new pipe must be created\n            away from the last pipe in order to retain consistent spacing\n            */\n            const newXOffset = this.pipes[1].topPipe.left + CONSTANTS.HORIZONTAL_PIPE_SPACING;\n            this.pipes.push(this.randomPipe(newXOffset));\n        }\n    }\n\n    /*\n    A simple background is drawn onto the context with a color, and \n    fills up the entire page.\n    */\n    drawBackground(ctx) {\n        ctx.fillStyle = \"skyblue\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height); \n    }\n\n    /*\n    Custom iteration method that binds 'this' to the Level instance\n    instead of allowing it to become something else\n    */\n    eachPipe(callback) {\n        this.pipes.forEach(callback.bind(this));\n    }\n\n    /*\n    Logic that handles the collision with Capy instance. Whenever the hitbox of\n    the Capy instance exceeds the dimensions of the pipe (e.g. colliding with it)\n    the collision instance variable will be set to true, otherwise defaulting to false.\n    */\n    collidesWith(capyBound) {\n        /*\n        Instance invoked fat arrow method that will store a boolean result of\n        the collision between a pipe instance and capy.\n        */\n        const _overlap = (pipe, capy) => {\n            if (pipe.left > capy.right || pipe.right < capy.left) {\n                return false;\n            }\n            if (pipe.top > capy.bottom || pipe.bottom < capy.top) {\n                return false;\n            }\n            return true;\n        };\n\n        // Default value of collision as false, which will not be changed unless\n        // a collision is detected.\n        let collision = false;\n\n        /*\n        An iteration through each pipe calling on the _overlap variable invoked method\n        to determine if a collision has occured. Since each pair of pipes is made of two\n        individual pipes, the top and bottom pipes will have to be taken into account when\n        checking for collision.\n        */\n        this.eachPipe((pipe) => {\n            if (_overlap(pipe.topPipe, capyBound) || _overlap(pipe.bottomPipe, capyBound)) {\n                collision = true;\n            }\n        });\n        return collision;\n    }\n\n    /*\n    Logic to check whether or not a capy has passed the pipe obstacle.\n    Through the game script, a simple callback that increments the score is passed\n    into this method to be called whenever a pipe is cleared.\n    Note that any pipe within the array can be considered, but since the capy has no\n    horizontal movement relative to the canvas each pipe will only be passed once,\n    so it is okay to iterate through all pipes in the array, every single time\n    the method is being called\n    */\n    passedPipe(capy, callback) {\n        this.eachPipe((pipe) => {\n            if (pipe.topPipe.right < capy.left) {\n                if (!pipe.passed) {\n                    pipe.passed = true;\n                    callback();\n                }\n            }\n        });\n    }\n\n    /*\n    The generator for pipes, given an input distance. While a simple game can memo-ize this\n    method and others by always having a fixed distance, this allows for greater flexibility in\n    designing variations in the game constants. A heightRange instance variable is set to be within \n    the edge buffers such that the gap will never be at the vertical extremes of the canvas.\n    Since gap distance is defined in the constants, only one reference to the gap is needed, in this\n    case the topOfGap is chosen. \n    A POJO is created and returned with the appropriate dimensions\n    */\n    randomPipe(distance) {\n        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.PIPE_GAP;\n        const topOfGap = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n        const pipe = {\n            topPipe: {\n                left: distance,\n                right: CONSTANTS.PIPE_WIDTH + distance,\n                top: 0,\n                bottom: topOfGap\n            },\n            bottomPipe: {\n                left: distance,\n                right: CONSTANTS.PIPE_WIDTH + distance,\n                top: topOfGap + CONSTANTS.PIPE_GAP,\n                bottom: this.dimensions.height\n            },\n            passed: false\n        };\n        return pipe;\n    }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });