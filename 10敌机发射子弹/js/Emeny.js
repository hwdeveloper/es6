class Emeny {

    constructor(buffer) {
        //敌机飞行的速度
        this.speedX = 2;
        this.speedY = 5;
        //敌机的宽度和高度
        this.emenyW = 37;
        this.emenyH = 28;

        this.EMENY_NORMAL = 0;
        this.EMENY_BOOM = this.EMENY_NORMAL + 1;
        this.state = this.EMENY_NORMAL;


        this.index = -1;
        this.booms = ['./img/boom_01.png', './img/boom_02.gif', './img/boom_03.gif', './img/boom_04.gif', './img/boom_05.gif', './img/boom_06.png'];


        this.fireIndex = 0;

        this.emenyBullets = [];

        this.game = buffer;
        //创建敌机
        this.emeny = document.createElement('img');
        //设置位置
        this.emeny.style.position = "absolute";
        this.setPosition();
        //把敌机加到游戏盒子
        this.game.appendChild(this.emeny);
    }


    setPosition() {
        //随机位置
        this.emenyX = Math.floor(Math.random() * (480 - this.emenyW));
        this.emenyY = -Math.floor(Math.random() * 400);
        this.emeny.style.left = this.emenyX + "px";
        this.emeny.style.top = this.emenyY + "px";
        //随机敌机的类型
        this.type = Math.floor(Math.random() * 2);

        if (this.type == 0) {
            this.emeny.src = "./img/enemy1.png";
        } else {
            this.emeny.src = "./img/enemy2.png";
        }
        this.emenyW = 37 + Math.floor(Math.random() * 20);
        this.emenyH = 28 + Math.floor(Math.random() * 10);
        this.emeny.style.width = this.emenyW + "px";
        this.emeny.style.height = this.emenyH + "px";
        //敌机水平方向
        if (Math.floor(Math.random() * 2) == 0) {
            this.speedX = this.speedX + Math.floor(Math.random() * 20);
            this.speedX = -this.speedX;
        }
    }

    collision(bullets) {
        let isCollision = false;
        let that = this;
        bullets.forEach(function (bullet) {
            //检测主机发出的子弹是否和敌机发出的子弹有碰撞

            that.emenyBullets.forEach(function (emenyBullet) {
                if (emenyBullet.bulletX < (bullet.bulletX + bullet.width) &&
                    (emenyBullet.bulletX + emenyBullet.width) > bullet.bulletX &&
                    (emenyBullet.bulletY + emenyBullet.height) > bullet.bulletY) {
                    //让子弹消失
                    emenyBullet.bulletY = 701 + emenyBullet.height;
                }
            })

            //检测主机发出的子弹是否和敌机有碰撞
            if (that.emenyX < (bullet.bulletX + bullet.width) &&
                (that.emenyX + that.emenyW) > bullet.bulletX &&
                (that.emenyY + that.emenyH) > bullet.bulletY) {
                //让子弹消失
                bullet.bulletY = -bullet.height - 1;
                isCollision = true;
                return;
            }
        })
        return isCollision;
    }

    run() {

        switch (this.state) {
            case this.EMENY_NORMAL:
                this.fly();
                this.fire();
                break;
            case this.EMENY_BOOM:
                this.explosion();
                break;
        }
    }


    fly() {
        //运动
        this.emenyY = this.emenyY + this.speedY;
        if (this.emenyY > 800) {
            this.setPosition();
        }
        this.emenyX = this.emenyX + this.speedX;
        if (this.emenyX < 0) {
            this.emenyX = 0;
            this.speedX = -this.speedX;
        }
        if (this.emenyX > 480 - this.emenyW) {
            this.emenyX = 480 - this.emenyW;
            this.speedX = -this.speedX;
        }
        this.emeny.style.left = this.emenyX + "px";
        this.emeny.style.top = this.emenyY + "px";
    }

    explosion() {
        this.index++;
        if (this.index >= 6) {
            this.state = this.EMENY_NORMAL;
            this.index = -1;
            this.setPosition();
        } else {
            this.emeny.src = this.booms[this.index];
        }
    }


    fire() {
        this.fireIndex++;
        if (this.fireIndex % 30 == 0) {
            let emenyBullet = new EmenyBullet(this.game, this.emenyX + this.emenyW / 2, this.emenyY + this.emenyH);
            this.emenyBullets.push(emenyBullet);
        }

        for (let i = 0; i < this.emenyBullets.length; i++) {
            this.emenyBullets[i].run();
            //判断子弹是否飞出屏幕，如果飞出屏幕就销毁
            if (this.emenyBullets[i].isDestroy()) {
                this.emenyBullets[i].destroy();
                this.emenyBullets.slice(i, 1);
            }
        }

    }


    setBoom() {
        this.state = this.EMENY_BOOM;
    }
}