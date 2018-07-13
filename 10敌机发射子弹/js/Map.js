class Map {

    constructor(game) {

        //每个图片的大小
        this.imgW = 480;
        this.imgH = 100;

        this.imags = ['./img/bg__01.png', './img/bg__02.png', './img/bg__03.png', './img/bg__04.png', './img/bg__05.png', './img/bg__06.png', './img/bg__07.png', './img/bg__08.png'];
        this.maps = [];

        let length = this.imags.length;
        for (let i = 0; i < length; i++) {
            //创建图片元素
            let buffer = document.createElement('img');
            //设置大小
            buffer.style.width = this.imgW + "px";
            buffer.style.height = this.imgH + "px";
            //设置图片的来源
            buffer.src = this.imags[i];
            //把图片原始放到数组
            this.maps[i] = {img: buffer, imgX: 0, imgY: (i - 1) * 100};
            //设置位置
            this.maps[i].img.style.position = "absolute";
            //  maps[i].img.style.left=maps[i].imgX+"px";
            this.maps[i].img.style.top = this.maps[i].imgY + "px";
            game.appendChild(this.maps[i].img);
        }
    }

    run() {
        this.maps.forEach(function (map) {
            map.imgY = map.imgY + 1;
            if (map.imgY >= 700)
                map.imgY = -100;
            map.img.style.top = map.imgY + "px";
        });
    }
}