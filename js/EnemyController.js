import Enemy from "./Enemy.js"
import MovingDirection from "./MovingDirection.js";
export default class EnemyController {
    enemyMap = [
        [1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2],
        [3, 3, 3, 3, 3],
        [4, 4, 4, 4, 4]
      ];

      enemyRows = [];
      horizontalGap = 80;
      verticalGap = 40;
      currentDirection = MovingDirection.right;
      xVelocity = 0;
      yVelocity = 0;
      defaultXVelocity=2;
      //defaultYVelocity=3;
      speedTimerDefault = 300;
      speedTimer = this.speedTimerDefault;
      maxSpeedUpCount = 4;
      currentSpeedUpCount = 0;
      speedUpValue = 3;
      fireBulletTimerDefault = 100;
      fireBulletTimer = this.fireBulletTimerDefault;
      totalScore = 0;
      

    constructor(canvas,enemyBulletController,playerBulletController){     
        this.canvas = canvas;
        this.enemyBulletController = enemyBulletController;
        this.playerBulletController = playerBulletController;
        this.enemyDeathSound = new Audio("audio/enemydeath1.wav");
        this.enemyDeathSound.volume = 0.5;
        this.enemyDeathSound2 = new Audio("audio/enemydeath2.wav");
        this.enemyDeathSound2.volume = 0.5;

        this.createEnemies();
    }
    draw(ctx){
        console.log(this.currentSpeedUpCount)
        this.updateSpeedTimer();
        this.UpdateVelocityAndDirection();
        this.CollisionDetection();
        this.drawEnemies(ctx);
        this.fireBullet();
    }

    CollisionDetection(){
        this.enemyRows.forEach(enemyRow=>{
            enemyRow.forEach((enemy,enemyIndex)=>{
                if(this.playerBulletController.collideWith(enemy)){
                    this.totalScore += enemy.score;
                    this.enemyDeathSound.currentTime=0;
                    this.enemyDeathSound.play();
                    this.enemyDeathSound2.currentTime=0;
                    this.enemyDeathSound2.play();
                    enemy.image.src = 'images/explosion.png'
                    //enemyRow.splice(enemyIndex,1);
                    setTimeout(() => {
                        enemyRow.splice(enemyIndex, 1);
                    }, 30);
                    
                }
            });
        });

        this.enemyRows = this.enemyRows.filter(enemyRow=>enemyRow.length > 0);
    }

    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer <= 0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allEnemies = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemies.length);
            const enemy = allEnemies[enemyIndex];
            this.enemyBulletController.shoot(enemy.x,enemy.y,-3);
        }
    }

    updateSpeedTimer(){
        if(this.speedTimer<=0 && this.currentSpeedUpCount < this.maxSpeedUpCount){
            this.currentSpeedUpCount++;
            this.speedTimer = this.speedTimerDefault;
        }else{
            this.speedTimer--;
        }    

    }

    UpdateVelocityAndDirection(){
        for(const enemyRow of this.enemyRows){
            if(this.currentDirection === MovingDirection.right){       
                this.xVelocity = this.defaultXVelocity + (this.currentSpeedUpCount * this.speedUpValue);
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (typeof rightMostEnemy === "undefined") {
                    continue;
                }
                if(rightMostEnemy.x + rightMostEnemy.width > this.canvas.width){
                    this.currentDirection = MovingDirection.left;
                    break;
                }
            }
            else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -(this.defaultXVelocity + (this.currentSpeedUpCount * this.speedUpValue));
                const leftMostEnemy = enemyRow[0];
                if (typeof leftMostEnemy === "undefined") {
                    continue;
                }
                if(leftMostEnemy.x <= 0){
                    this.currentDirection = MovingDirection.right;
                    break;
                }

        }
    }
}
    drawEnemies(ctx){
        this.enemyRows.flat().forEach( (enemy)=> {
            enemy.move(this.xVelocity,this.yVelocity);
            enemy.draw(ctx);
        })
    }

    createEnemies(){
        this.enemyMap.forEach( (row,rowIndex)=>{
            this.enemyRows[rowIndex] = [];
            let score = this.getScore(rowIndex);
            row.forEach( (enemyNumber,enemyIndex)=>{
                if(enemyNumber > 0){
                    this.enemyRows[rowIndex].push(new Enemy(enemyIndex*this.horizontalGap,rowIndex*this.verticalGap,enemyNumber,score))
                }
            } )
        }  )
    }

    getScore(rowIndex){
        if (rowIndex === 0) {
            return 20;
          } else if (rowIndex === 1) {
            return 15;
          } else if (rowIndex === 2) {
            return 10;
          } else {
            return 5;
          }
    }
}