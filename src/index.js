import "./index.scss"

const Ball = require("./scripts/ball.js");
const Paddle = require("./scripts/paddle.js");
const Brick = require("./scripts/brick.js");


document.addEventListener("DOMContentLoaded", () => {

    let canvasContainer = document.getElementById("canvas-container");
    let canvas = document.getElementById("canvas");    

    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight; 
    
    let ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            paddle.rightArrowPress = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            paddle.leftArrowPress = true;
        }
    }
    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            paddle.rightArrowPress = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") {
            paddle.leftArrowPress = false;
        }
    }

    
    const brickRowCount = 5;
    const brickColumnCount = 5;
    const paddleHeight = 20;
    const paddleWidth = 75;
    const paddleCanvasGap = 15;
    
    const ball = new Ball({
        start_pos: [canvas.width / 2, canvas.height - 80],
        curr_pos: [canvas.width / 2, canvas.height - 80],
        radius: 10,
        dx_dy: [-8, -8],
        color: "#2e04ff"
    });

    const paddle = new Paddle({
        height: paddleHeight,
        width: paddleWidth,
        color: "#028f31",
        paddleX: (canvas.width - paddleWidth) / 2,
        paddleY: canvas.height - paddleHeight - paddleCanvasGap,
        dx: 10,
        rightArrowPress: false,
        leftArrowPress: false
    });

    const bricks = Brick.setupBricks(brickRowCount, brickColumnCount);
    
    function refreshDrawing() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Brick.renderBricks(ctx, bricks, brickRowCount, brickColumnCount);
        ball.render(ctx);
        paddle.render(ctx);
        Brick.detectCollisions(ball, bricks, brickRowCount, brickColumnCount);
        ball.move(canvas, paddle);
        paddle.move(canvas);
        if (ball.pastPaddle === true) {
            alert("ROUND OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
    
    let interval = setInterval(refreshDrawing, 30);

});




