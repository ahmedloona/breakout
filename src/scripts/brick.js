
function Brick(parameters) {
    this.width = parameters.width;
    this.height = parameters.height;
    this.padding = parameters.padding;
    this.offsetTop = parameters.offsetTop;
    this.offsetLeft = parameters.offsetLeft;
    this.color = parameters.color;
    this.x = parameters.x;
    this.y = parameters.y;
    this.visible = true;
}

Brick.setupBricks = function (brickRowCount, brickColumnCount) {

    let bricks = [];

    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];

        for (let r = 0; r < brickRowCount; r++) {

            let brick = new Brick({
                width: 75,
                height: 20,
                padding: 10,
                offsetTop: 60,
                offsetLeft: 30,
                color: "#ff5804",
                x: 0,
                y: 0,
                visible: true
            });
            bricks[c][r] = brick;

            let brickX = (c * (brick.width + brick.padding)) + brick.offsetLeft;
            let brickY = (r * (brick.height + brick.padding)) + brick.offsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
        }
    }
    return bricks;
}

Brick.renderBricks = function(ctx, bricks, brickRowCount, brickColumnCount) {

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].visible === true) {
                ctx.beginPath();
                ctx.rect(bricks[c][r].x, bricks[c][r].y, bricks[c][r].width, bricks[c][r].height);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

Brick.detectCollisions = function(ball, bricks, brickRowCount, brickColumnCount) {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if (bricks[c][r].visible === true) {
                if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height) {
                    ball.dy = -1 * ball.dy;
                    brick.visible = false;
                    ball.radius += 1;
                    return true;
                }
            }
        }
    }
}


module.exports = Brick;