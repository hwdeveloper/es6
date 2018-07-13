function Map() {

    //每个图片的大小
    var imgW=480;
    var imgH=100;

    var imags=['./img/bg__01.png','./img/bg__02.png','./img/bg__03.png','./img/bg__04.png','./img/bg__05.png','./img/bg__06.png','./img/bg__07.png','./img/bg__08.png'];
    var maps=[];
    this.init=function (game) {

        var length = imags.length;
        for(var i=0;i<length;i++){
            //创建图片元素
            var buffer = document.createElement('img');
            //设置大小
            buffer.style.width=imgW+"px";
            buffer.style.height=imgH+"px";
            //设置图片的来源
            buffer.src=imags[i];
            //把图片原始放到数组
            maps[i]={img:buffer,imgX:0,imgY:(i-1)*100};
            //设置位置
            maps[i].img.style.position="absolute";
          //  maps[i].img.style.left=maps[i].imgX+"px";
            maps[i].img.style.top=maps[i].imgY+"px";
            game.appendChild( maps[i].img);
        }
    }
    
    this.run=function () {
        maps.forEach(function (map) {
            map.imgY=map.imgY+1;
            if(map.imgY>=700)
                map.imgY=-100;
            map.img.style.top=map.imgY+"px";
        });
    }
}