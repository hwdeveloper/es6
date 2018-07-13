function Game() {
    var width= 480;
    var height = 700;
    //游戏盒子
    var game;
    //游戏地图
    var map;
    //创建飞机
    var player;
    //敌机
    var emenyNum=2;
    var emenys=[];
    this.init=function () {
        this.initGame();
        this.initMap();
        this.initPlayer();
        this.initEmeny();

    }

    this.initGame=function () {
        game = document.createElement('div');
        //设置游戏盒子的大小
        game.style.width=width+"px";
        game.style.height=height+"px";

        game.style.position="relative";
        game.style.overflow="hidden";

        game.style.backgroundColor="#111222";
        //设置居中
        game.style.margin="auto";

        document.body.appendChild(game);
    }
    this.initMap=function () {
        //创建游戏地图对象
        map = new Map();
        //初始化
        map.init(game);
    }

    this.initPlayer =function () {
        //创建飞机
        player = new Plyaer();
        //初始化
        player.init(game,width,height);
    }

    this.initEmeny=function () {

        for(var i=0;i<emenyNum;i++){
            // 创建敌机
           var emeny = new Emeny();
            //初始化
            emeny.init(game);
            emenys.push(emeny);
        }

    }

    this.run=function () {
        map.run();
        player.run();

        emenys.forEach(function (emeny) {
            emeny.run();
            //如果碰撞到任何一个子弹就飞机销毁
            if(emeny.collision(player.bullets)){
                emeny.setBoom();
            }
        })

    }

    this.onkeypress=function (keyCode){
        player.onkeypress(keyCode);
    }
}