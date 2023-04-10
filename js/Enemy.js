export default class Enemy{

    image = new Image();
    constructor(x,y,imageNumber,score){
        this.x=x;
        this.y=y;
        //image dimensions
        this.width=50;
        this.height=48;
        this.score=score;
        this.image.src= `images/enemy${imageNumber}.png`;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }

    move(xVelocity,yVelocity){
        this.x+=xVelocity;
        this.y+=yVelocity;
    }
}