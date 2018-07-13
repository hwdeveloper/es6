class Plyaer {


    constructor(buffer, bgW1, bgH1) {

        this.bullets = [];

        this.PLAYER_UP = 119;
        this.PLAYER_DOWN = 115;
        this.PLAYER_LEFT = 97;
        this.PLAYER_RIGHT = 100;
        this.PLAYER_FIRE = 32;

        this.width = 75;
        this.height = 50;
        this.speedX = 10;
        this.speedY = 10;
        this.time = 0;

        this.game = buffer;
        this.bgW = bgW1;
        this.bgH = bgH1;
        this.playerX = (this.bgW - this.width) / 2;
        this.playerY = this.bgH - this.height;
        //创建图片元素
        this.player = document.createElement('img');
        //设置位置
        this.player.style.position = "absolute";
        this.player.style.left = this.playerX + "px";
        this.player.style.top = this.playerY + "px";
        //设置图片的来源
        this.player.src = "./img/player.png";
        this.player.style.width = this.width + "px";
        this.player.style.height = this.height + "px";
        //把飞机添加到游戏盒子里面
        this.game.appendChild(this.player);

    }


    run() {

        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].run();
            if (this.bullets[i].isDestroy()) {

                //把子弹里面的图片元素销毁
                this.bullets[i].destroy();
                //销毁子弹数组里面的子弹
                this.bullets.splice(i, 1);
            }
        }

        this.time++;
        if (this.time % 10 == 0)
            this.fire();

    }


    onkeypress(keyCode) {
        switch (keyCode) {
            case this.PLAYER_UP:
                this.moveUp();
                break;
            case this.PLAYER_DOWN:
                this.moveDown();
                break;
            case this.PLAYER_LEFT:
                this.moveLeft();
                break;
            case this.PLAYER_RIGHT:
                this.moveRight();
                break;
            case this.PLAYER_FIRE:
                this.fire();
                break;
        }
    }

    moveUp() {
        this.playerY = this.playerY - this.speedY;
        if (this.playerY < 200)
            this.playerY = 200;
        this.player.style.top = this.playerY + "px";
    }

    moveDown() {
        this.playerY = this.playerY + this.speedY;
        if (this.playerY > this.bgH - this.height)
            this.playerY = this.bgH - this.height;
        this.player.style.top = this.playerY + "px";
    }

    moveLeft() {
        this.playerX = this.playerX - this.speedX;
        if (this.playerX < 0)
            this.playerX = 0;
        this.player.style.left = this.playerX + "px";
    }

    moveRight() {
        this.playerX = this.playerX + this.speedX;
        if (this.playerX > this.bgW - this.width)
            this.playerX = this.bgW - this.width;
        this.player.style.left = this.playerX + "px";
    }

    fire() {
        var bullet = new Bullet(this.game, this.playerX + this.width / 2, this.playerY);
        this.bullets.push(bullet);
    }

}