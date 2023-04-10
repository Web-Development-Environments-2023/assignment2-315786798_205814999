import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    timeNextBulletAllowed = 0;

    constructor(canvas,maxBullets, bulletColor, soundEnabled){
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;

        this.shootSound = new Audio("audio/playershoot.wav");
        this.shootSound.volume = 0.5;
    }

    collideWith(sprite){
        const bulletThatHitSpriteIndex = this.bullets.findIndex(bullet=>bullet.collideWith(sprite));

        if(bulletThatHitSpriteIndex >= 0){
            this.bullets.splice(bulletThatHitSpriteIndex,1);
            return true;
        }
        return false;
    }

    draw(ctx){
        this.bullets = this.bullets.filter(bullet=>bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);
        this.bullets.forEach( (bullet)=>bullet.draw(ctx) );
        if(this.timeNextBulletAllowed > 0 ){
            this.timeNextBulletAllowed--;
        }
    }

    shoot(x,y,velocity, timeNextBulletAllowed=0){
        if(this.timeNextBulletAllowed <=0 && this.bullets.length < this.maxBullets){
            const bullet = new Bullet(this.canvas,x,y,velocity,this.bulletColor);
            this.bullets.push(bullet);
            if(this.soundEnabled){
                this.shootSound.currentTime=0;
                this.shootSound.play();
            }
            this.timeNextBulletAllowed = timeNextBulletAllowed;
        }

    }
}