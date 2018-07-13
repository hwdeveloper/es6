function EmenyBullet() {
    //子弹飞行的速度
    var speedY=20;
    //子弹的大小
    this.width=11;
    this.height=11;

    //子弹的坐标
    this.bulletY;
    this.bulletX;
    //子弹的图片元素
     var bullet;

    this.init=function (game,x,y) {
        //创建图片元素
        bullet = document.createElement('img')
        //设置位置
        bullet.style.position="absolute";
        this.bulletY =y-this.height;
        this.bulletX=x-this.width/2;
        bullet.style.left=this.bulletX+"px";
        bullet.style.top=this.bulletY+"px";

        //设置子弹的图片
        bullet.src="./img/enemyBullet.png";
        bullet.style.width=this.width+"px";
        bullet.style.height=this.height+"px";
        //添加到游戏盒子里面
        game.appendChild(bullet);

    }

    this.run=function () {
        this.bulletY = this.bulletY+speedY;
        bullet.style.top=this.bulletY+"px";
    }
    
    this.isDestroy=function () {
        if(this.bulletY>700+this.height){
            return true;
        }
        else{
            return false;
        }
    }
    
    this.destroy=function () {

        bullet.remove();

    }
    
}