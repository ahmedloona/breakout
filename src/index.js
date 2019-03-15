import "./index.scss"
const Ball = require("./scripts/ball.js");

document.addEventListener("DOMContentLoaded", () => {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let x = canvas.width / 2;
    let y = canvas.height - 20;
    let delta_x = -10;
    let delta_y = -10;
    let ballRadius = 20;
    let color = "#00FF00";

    const ball = new Ball({
        start_pos: [x, y],
        curr_pos: [x, y],
        radius: ballRadius,
        dx_dy: [delta_x, delta_y],
        color: color
    });


    function refreshDrawing() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.render(ctx);
        ball.move(canvas);
    }

    setInterval(refreshDrawing, 30);


});




