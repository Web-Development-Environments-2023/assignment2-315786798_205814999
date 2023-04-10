import keyMap from "./Configuration.js";
import BulletController from "./BulletController.js";
export default class Player{

    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;
    shootPressed = false;
    bulletSpeed = 4;
    bulletGap = 10;

    constructor(canvas, velocity, bulletController){
        this.canvas =canvas;
        this.velocity=velocity;
        this.width=80;
        this.height=77;
        this.bulletController = bulletController;

        //const randomX = Math.random() * (canvas.width-this.width);
        //const randomY = (canvas.height-this.height) * 0.6 + Math.random() * ((canvas.height-this.height) * 0.4);
        this.x = canvas.width/2;
        this.y = canvas.height*0.8;
        
        this.image = new Image();
        this.image.src = "images/player.png";

        document.addEventListener("keydown",this.keydown);
        document.addEventListener("keyup",this.keyup);
    }

    reposition(){
        this.x = this.canvas.width/2;
        this.y = this.canvas.height*0.8;
    }

    draw(ctx){
        this.checkShoot();
        this.move();
        this.wallCollide();
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    checkShoot(){
        if(this.shootPressed){
            this.bulletController.shoot(this.x+this.width/2,this.y,this.bulletSpeed,this.bulletGap);
        }
    }

    wallCollide(){
        if(this.x < 0){
            this.x=0;
        }

        if(this.x > this.canvas.width - this.width){
            this.x = this.canvas.width - this.width;
        }

        if(this.y > this.canvas.height-this.height){
            this.y=this.canvas.height-this.height;
        }
        if(this.y < this.canvas.height*0.6){
            this.y = this.canvas.height*0.6;
        }
    }

    move(){
        if(this.rightPressed){
            this.x+=this.velocity;
        }else if(this.leftPressed){
            this.x+= -this.velocity;
        }else if(this.upPressed){
            this.y+= -this.velocity
        }else if(this.downPressed){
            this.y+= this.velocity
        }
    }

    keydown = event =>{
        if(event.code == keyMap.right){
            this.rightPressed = true;
        }
        if(event.code == keyMap.left){
            this.leftPressed = true;
        }
        if(event.code == keyMap.up){
            this.upPressed = true;
        }
        if(event.code == keyMap.down){
            this.downPressed = true;
        }
        if(event.code == keyMap.shoot){
            this.shootPressed = true;
        }
    }
    keyup = event =>{
        if(event.code == keyMap.right){
            this.rightPressed = false;
        }
        if(event.code == keyMap.left){
            this.leftPressed = false;
        }
        if(event.code == keyMap.up){
            this.upPressed = false;
        }
        if(event.code == keyMap.down){
            this.downPressed = false;
        }
        if(event.code == keyMap.shoot){
            this.shootPressed = false;
        }
    }
    
}