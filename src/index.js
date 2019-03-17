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

    function drawScore() {
        ctx.font = "20px Verdana";
        ctx.fillStyle = "#028f31";
        ctx.fillText("Score: " + score, 30, 30);
    }

    function drawLives() {
        ctx.font = "20px Verdana";
        ctx.fillStyle = "#028f31";
        ctx.fillText("Lives: " + lives, canvas.width - 100, 30);
    }

    let score = 0;
    let lives = 3;
    const ballStartPos = [canvas.width / 2, canvas.height - 80]
    const ballSpeed = [-6, -6]
    const brickRowCount = 5;
    const brickColumnCount = 5;
    const paddleHeight = 20;
    const paddleWidth = 75;
    const paddleCanvasGap = 15;
    
    let ball = new Ball({
        start_pos: ballStartPos,
        curr_pos: ballStartPos,
        radius: 10,
        dx_dy: ballSpeed,
        color: "#2e04ff"
    });

    let paddle = new Paddle({
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
        ball.move(canvas, paddle);
        paddle.move(canvas);
        let destroyedBrick = Brick.detectCollisions(ball, bricks, brickRowCount, brickColumnCount);
        if (destroyedBrick){
            score += 1;
        }
        drawScore();
        drawLives();

        if (ball.pastPaddle === true) {
            // debugger;
            ball.pastPaddle = false;
            lives--;
            if (lives === 0) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
            else {
                ball.x = ballStartPos[0],
                ball.y = ballStartPos[1],
                ball.dx = ballSpeed[0];
                ball.dy = ballSpeed[1];
            }

        }
        if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            clearInterval(interval); 
        }
        
        // requestAnimationFrame(refreshDrawing);
    }
    
    let interval = setInterval(refreshDrawing, 30);


    // refreshDrawing();

});





