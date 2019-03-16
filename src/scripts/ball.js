
function Ball(parameters) {
    this.start_pos = parameters.start_pos;
    this.x = parameters.curr_pos[0];
    this.y = parameters.curr_pos[1];
    this.radius = parameters.radius;
    this.dx = parameters.dx_dy[0];
    this.dy = parameters.dx_dy[1];
    this.color = parameters.color;
    this.pastPaddle = false;
}

Ball.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

Ball.prototype.move = function(canvas, paddle) {
    const rightCollision = this.x + this.dx > canvas.width - this.radius;
    const leftCollision = this.x + this.dx < this.radius;
    const bottomCollision = this.y + this.dy > canvas.height - this.radius;
    const topCollision = this.y + this.dy < this.radius; 
    const paddleCollisionY = this.y + this.dy > paddle.paddleY - this.radius;
    const paddleCollisionX = ((this.x >= paddle.paddleX) && (this.x <= paddle.paddleX + paddle.width));
    const paddleCollision = paddleCollisionY && paddleCollisionX;
    
    if ( rightCollision || leftCollision ) {
        this.dx = -1 * this.dx;
    }
    if ( topCollision || paddleCollision) {
        this.dy = -1 * this.dy;
    } else if (bottomCollision) {
        this.pastPaddle = true;   
    }
    
    this.x += this.dx;
    this.y += this.dy;
}

module.exports = Ball;
