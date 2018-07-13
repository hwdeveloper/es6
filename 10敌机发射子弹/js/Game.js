class Game {

    constructor() {
        this.initArguments();
        this.initGame();
        this.initMap();
        this.initPlayer();
        this.initEmeny();

    }

    initArguments() {
        this.width = 480;
        this.height = 700;
        //敌机
        this.emenyNum = 2;
        this.emenys = [];
    }

    initGame() {
        this.game = document.createElement('div');
        //设置游戏盒子的大小
        this.game.style.width = this.width + "px";
        this.game.style.height = this.height + "px";

        this.game.style.position = "relative";
        this.game.style.overflow = "hidden";

        this.game.style.backgroundColor = "#111222";
        //设置居中
        this.game.style.margin = "auto";

        document.body.appendChild(this.game);
    }

    initMap() {
        //创建游戏地图对象
        this.map = new Map(this.game);
    }

    initPlayer() {
        //创建飞机
        this.player = new Plyaer(this.game, this.width, this.height);
    }

    initEmeny() {

        for (let i = 0; i < this.emenyNum; i++) {
            // 创建敌机
            let emeny = new Emeny(this.game);
            this.emenys.push(emeny);
        }

    }

    run() {
        this.map.run();
        this.player.run();
        let that = this;

        this.emenys.forEach(function (emeny) {
            emeny.run();
            //如果碰撞到任何一个子弹就飞机销毁
            if (emeny.collision(that.player.bullets)) {
                emeny.setBoom();
            }
        })

    }

    onkeypress(keyCode) {
        this.player.onkeypress(keyCode);
    }
}