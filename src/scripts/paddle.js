function Paddle(parameters) {
    this.height = parameters.height;
    this.width = parameters.width;
    this.color = parameters.color;
    this.paddleX = parameters.paddleX;
    this.paddleY = parameters.paddleY;
    this.dx = parameters.dx;
    this.rightArrowPress = this.rightArrowPress;
    this.leftArrowPress = this.leftArrowPress;
}

Paddle.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.paddleX, this.paddleY, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

Paddle.prototype.move = function(canvas) {
    // if (this.rightArrowPress) {
    //     this.paddleX += 7;
    // }
    // else if (this.leftArrowPress) {
    //     this.paddleX -= 7;
    // }

    if (this.rightArrowPress && this.paddleX < canvas.width - this.width) {
        this.paddleX += this.dx;
    }
    else if (this.leftArrowPress && this.paddleX > 0) {
        this.paddleX -= this.dx;
    }
}

module.exports = Paddle;