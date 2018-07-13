function Emeny() {

    //敌机的位置
    var emenyX;
    var emenyY;
    //敌机飞行的速度
    var speedX=2;
    var speedY=5;
    //敌机的宽度和高度
    var emenyW=37;
    var emenyH=28;
    //敌机的类型
    var type;
    //图片元素
    var emeny;
    //游戏盒子
    var game;
    this.init=function (buffer) {
        game=buffer;
        //创建敌机
        emeny = document.createElement('img');
        //设置位置
        emeny.style.position="absolute";
        this.setPosition();
        //把敌机加到游戏盒子
        game.appendChild(emeny);

    }
    
    this.setPosition=function () {
        //随机位置
        emenyX = Math.floor(Math.random()*(480-emenyW));
        emenyY = -Math.floor(Math.random()*400);
        emeny.style.left=emenyX+"px";
        emeny.style.top=emenyY+"px";
        //随机敌机的类型
        type = Math.floor(Math.random()*2);

        if(type==0){
            emeny.src="./img/enemy1.png";
        }else{
            emeny.src="./img/enemy2.png";
        }
        emenyW=37+Math.floor(Math.random()*20);
        emenyH=28+Math.floor(Math.random()*10);
        emeny.style.width=emenyW+"px";
        emeny.style.height=emenyH+"px";
        //敌机水平方向
        if(Math.floor(Math.random()*2)==0){
            speedX=speedX+Math.floor(Math.random()*20);
            speedX = -speedX;
        }
    }
    
    this.collision=function (bullets) {
        var isCollision=false;
        bullets.forEach(function (bullet) {
            //检测主机发出的子弹是否和敌机发出的子弹有碰撞


            emenyBullets.forEach(function (emenyBullet) {
                if(emenyBullet.bulletX<(bullet.bulletX+bullet.width)&&
                    (emenyBullet.bulletX+emenyBullet.width)>bullet.bulletX&&
                    (emenyBullet.bulletY+emenyBullet.height)>bullet.bulletY){
                    //让子弹消失
                    emenyBullet.bulletY=701+emenyBullet.height;
                }
            })

            //检测主机发出的子弹是否和敌机有碰撞
            if(emenyX<(bullet.bulletX+bullet.width)&&
                (emenyX+emenyW)>bullet.bulletX&&
                (emenyY+emenyH)>bullet.bulletY){
                //让子弹消失
                bullet.bulletY=-bullet.height-1;
                isCollision=true;
                return;
            }
        })
        return isCollision;
    }
    
    this.run=function () {

        switch(state){
            case EMENY_NORMAL:
                this.fly();
                this.fire();
                break;
            case EMENY_BOOM:
                this.explosion();
                break;
        }
    }

    const EMENY_NORMAL=0;
    const EMENY_BOOM=EMENY_NORMAL+1;
    let state=EMENY_NORMAL;
    
    this.fly=function () {
        //运动
        emenyY = emenyY+speedY;
        if(emenyY>800){
            this.setPosition();
        }
        emenyX = emenyX+speedX;
        if(emenyX<0){
            emenyX=0;
            speedX=-speedX;
        }
        if(emenyX>480-emenyW){
            emenyX=480-emenyW;
            speedX=-speedX;
        }
        emeny.style.left=emenyX+"px";
        emeny.style.top=emenyY+"px";
    }
    var index=-1;
    var booms=['./img/boom_01.png','./img/boom_02.gif','./img/boom_03.gif','./img/boom_04.gif','./img/boom_05.gif','./img/boom_06.png'];
    this.explosion=function () {
        index++;
        if(index>=6){
            state=EMENY_NORMAL;
            index=-1;
            this.setPosition();
        }else{
            emeny.src=booms[index];
        }
    }

    var fireIndex=0;

   var emenyBullets=[];
    this.fire=function () {
        fireIndex++;
        if(fireIndex%30==0){
            var emenyBullet = new EmenyBullet();
            emenyBullet.init(game,emenyX+emenyW/2,emenyY+emenyH);
           emenyBullets.push(emenyBullet);
        }

        for(var i=0;i<emenyBullets.length;i++){
            emenyBullets[i].run();
            //判断子弹是否飞出屏幕，如果飞出屏幕就销毁
            if(emenyBullets[i].isDestroy()){
                emenyBullets[i].destroy();
                emenyBullets.slice(i,1);
            }
        }

    }
    
    
    this.setBoom=function () {
        state=EMENY_BOOM;
    }
}