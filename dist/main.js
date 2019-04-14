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

/***/ "./src/bird.js":
/*!*********************!*\
  !*** ./src/bird.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Bird; });\nconst CONSTANTS = {\n    BIRD_WIDTH: 40,\n    BIRD_HEIGHT: 30,\n    GRAVITY: 0.4,\n    FLAP_SPEED: 8,\n    TERMINAL_VEL: 12\n};\n\nclass Bird {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = dimensions.width / 3; //do i need this.dimensions instead? no i dont\n        this.y = dimensions.height / 2;\n        this.vel = 0;\n    }\n\n    flap() {\n        this.vel = CONSTANTS.FLAP_SPEED * -1;\n    }\n\n    moveBird() {\n        this.y += this.vel;\n        this.vel += CONSTANTS.GRAVITY;\n\n        // in case bird travels too fast\n        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {\n            // switch(this.vel > 0) {\n            //     case true:\n            //         this.vel = CONSTANTS.TERMINAL_VEL;\n            //         break;\n            //     case false:\n            //         this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            //         break;\n            // }\n            if (this.vel > 0) {\n                this.vel = CONSTANTS.TERMINAL_VEL;\n            } else {\n                this.vel = CONSTANTS.TERMINAL_VEL * -1;\n            }\n        }\n    }\n    \n    animate(ctx) {\n        this.moveBird();\n        this.drawBird(ctx);\n    }\n\n    drawBird(ctx) {\n        ctx.fillStyle = \"yellow\";\n        ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);\n    }\n}\n\n//# sourceURL=webpack:///./src/bird.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FlappyBird; });\n/* harmony import */ var _bird__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bird */ \"./src/bird.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\nclass FlappyBird {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\"); //instance of drawing context\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.restart();\n    }\n\n    play() {\n        this.running = true;\n        this.animate();\n    }\n\n    animate() {\n        // calls level#animate(ctx)\n        this.level.animate(this.ctx);\n        this.bird.animate(this.ctx);\n        if (this.running) {\n            requestAnimationFrame(this.animate.bind(this)); //bind 'this' game instance instead of?\n        }\n    }\n\n    restart() {\n        this.running = false;\n        this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.bird = new _bird__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n        this.animate();\n    }\n\n    click(e) {\n        if (!this.running) {\n            this.play();\n        }\n        this.bird.flap();\n    }\n\n    registerEvents() {\n        //honestly idk\n        this.boundClickHandler = this.click.bind(this);\n        this.ctx.canvas.addEventListener(\"mousedown\", this.boundClickHandler);\n    }\n}\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst canvas = document.getElementById(\"bird-game\"); //grab element with id of\nnew _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n    HORIZONTAL_PIPE_SPACING: 220,\n    PIPE_GAP: 150,\n    WARMUP_SECONDS: 1,\n    EDGE_BUFFER: 50,\n    PIPE_WIDTH: 50,\n    PIPE_SPEED: 2 //change this speed later\n}\n\nclass Level {\n    constructor(dimensions) { //need to pass in from game variables\n        this.dimensions = dimensions;\n\n        const firstPipeDistance = this.dimensions.width + (CONSTANTS.WARMUP_SECONDS * 60 * CONSTANTS.PIPE_SPEED);\n\n        this.pipes = [\n            this.randomPipe(firstPipeDistance),\n            this.randomPipe(firstPipeDistance + CONSTANTS.HORIZONTAL_PIPE_SPACING),\n            this.randomPipe(firstPipeDistance + (2 * CONSTANTS.HORIZONTAL_PIPE_SPACING))\n        ];\n    }\n\n    randomPipe(distance) {\n        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.PIPE_GAP;\n        const topOfGap = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n        const pipe = {\n            topPipe: {\n                left: distance,\n                right: CONSTANTS.PIPE_WIDTH + distance,\n                top: 0,\n                bottom: topOfGap\n            },\n            bottomPipe: {\n                left: distance,\n                right: CONSTANTS.PIPE_WIDTH + distance,\n                top: topOfGap + CONSTANTS.PIPE_GAP,\n                bottom: this.dimensions.height\n            },\n            passed: false\n        };\n        return pipe;\n    }\n\n    movePipes() {\n        this.eachPipe(function(pipe) {\n            pipe.topPipe.left -= CONSTANTS.PIPE_SPEED; //MAKE SURE 'THIS' IS RIGHT\n            pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;\n            pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;\n            pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;\n        });\n\n        // const firstPipe = this.pipes[0].topPipe;\n        // const lastPipe = this.pipes[this.pipes.length - 1].topPipe;\n\n        // if (firstPipe.right <= 0) {\n        //     this.pipes.shift();\n        //     this.pipes.push(this.randomPipe(lastPipe.left + CONSTANTS.HORIZONTAL_PIPE_SPACING));\n        // }\n\n        if (this.pipes[0].topPipe.right <= 0) {\n            this.pipes.shift();\n            const newX = this.pipes[1].topPipe.left + CONSTANTS.HORIZONTAL_PIPE_SPACING;\n            this.pipes.push(this.randomPipe(newX));\n        }\n    }\n\n    drawPipes(ctx) {\n        this.eachPipe(function(pipe) {\n            ctx.fillStyle = \"green\";\n            \n            ctx.fillRect(\n                pipe.topPipe.left,\n                pipe.topPipe.top,\n                CONSTANTS.PIPE_WIDTH,\n                pipe.topPipe.bottom - pipe.topPipe.top\n            );\n            ctx.fillRect(\n                pipe.bottomPipe.left,\n                pipe.bottomPipe.top,\n                CONSTANTS.PIPE_WIDTH,\n                pipe.bottomPipe.bottom - pipe.bottomPipe.top\n            );\n        });\n    }\n\n    eachPipe(callback) {\n        this.pipes.forEach(callback.bind(this));\n    }\n\n    drawBackground(ctx) { //animate() will call this\n        ctx.fillStyle = \"skyblue\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height); //make sure to check what 'this' is\n    }\n\n    animate(ctx) { //or called #frame or #move\n        this.drawBackground(ctx);\n        this.movePipes();\n        this.drawPipes(ctx);\n    }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ })

/******/ });