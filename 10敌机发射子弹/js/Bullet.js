class Bullet {
    constructor(game, x, y) {
        //子弹飞行的速度
        this.speedY = 20;
        //子弹的大小
        this.width = 14;
        this.height = 27;

        //创建图片元素
        this.bullet = document.createElement('img')
        //设置位置
        this.bullet.style.position = "absolute";
        this.bulletY = y - this.height;
        this.bulletX = x - this.width / 2;
        this.bullet.style.left = this.bulletX + "px";
        this.bullet.style.top = this.bulletY + "px";

        //设置子弹的图片
        this.bullet.src = "./img/bullet.png";
        this.bullet.style.width = this.width + "px";
        this.bullet.style.height = this.height + "px";
        //添加到游戏盒子里面
        game.appendChild(this.bullet);
    }

    run() {
        this.bulletY = this.bulletY - this.speedY;
        this.bullet.style.top = this.bulletY + "px";
    }

    isDestroy() {
        if (this.bulletY < -this.height) {
            return true;
        }
        else {
            return false;
        }
    }

    destroy() {
        this.bullet.remove();
    }

}