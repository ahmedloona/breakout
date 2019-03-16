import "./index.scss"

const Ball = require("./scripts/ball.js");
const Paddle = require("./scripts/paddle.js");


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

    const ball = new Ball({
        start_pos: [canvas.width / 2, canvas.height - 80],
        curr_pos: [canvas.width / 2, canvas.height - 80],
        radius: 10,
        dx_dy: [-5, -5],
        color: "#00FF00"
    });

    const paddleHeight = 20;
    const paddleWidth = 75;
    const paddleCanvasGap = 15;

    const paddle = new Paddle({
        height: paddleHeight,
        width: paddleWidth,
        color: "#00FF00",
        paddleX: (canvas.width - paddleWidth) / 2,
        paddleY: canvas.height - paddleHeight - paddleCanvasGap,
        dx: 10,
        rightArrowPress: false,
        leftArrowPress: false
    });

    function refreshDrawing() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.render(ctx);
        paddle.render(ctx);
        ball.move(canvas, paddle);
        paddle.move(canvas);
        if (ball.pastPaddle === true) {
            alert("ROUND OVER");
            // document.location.reload();
            clearInterval(interval);
        }
    }

    
    let interval = setInterval(refreshDrawing, 30);

});




