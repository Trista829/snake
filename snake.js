// 自调用函数---小蛇的
(function () {
    // 存放小蛇的每个身体部分
    var elements = [];
    // 创建小蛇的构造函数
    function Snake(width, height, direction) {
        // 小蛇的每个部分的宽，高
        this.width = width || 20;
        this.height = height || 20;
        // 小蛇的身体
        this.body = [{
                x: 3,
                y: 2,
                color: "red"
            }, //头
            {
                x: 2,
                y: 2,
                color: "orange"
            }, //尾巴
            {
                x: 1,
                y: 2,
                color: "orange"
            } //尾巴
        ];
        this.direction = direction || "right";
    }
    // 为原型添加方法--小蛇的初始化
    Snake.prototype.init = function (map) {
        remove();
        // 循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            // body数组中的每个元素都是一个对象
            var obj = this.body[i];
            // 创建div
            var div = document.createElement("div");
            // 把div添加到map中
            map.appendChild(div);
            // 为div添加样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            // 横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            // 背景颜色
            div.style.backgroundColor = obj.color;
            // 把div添加到数组elements中--目的为了删除
            elements.push(div);
        }
    };
    // 为原型添加方法--小蛇动起来
    Snake.prototype.move = function (food, map) {
        // 改变小蛇尾巴的坐标值
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 判断方向--改变小蛇头的坐标值
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        // 判断是否吃到
        // 小蛇的横纵坐标
        var headX = this.body[0].x * this.width;
        var headY = this.body[0].y * this.height;
        // 食物的横纵坐标
        var foodX = food.x;
        var foodY = food.y;
        // 判断小蛇头坐标是否和食物坐标相同
        if (headX == foodX && headY == foodY) {
            // 获取小蛇的最后的尾巴
            var last = this.body[this.body.length - 1];
            // 把最后一个尾巴赋值一份加到body中
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            })
            // 把食物删除并重新初始化
            food.init(map);
        }
    }
    // 删除小蛇的私有函数
    function remove() {
        // // elements中有这个食物
        // for (var i = 0; i < elements.length; i++) {
        //     var ele = elements[i];
        //     // 找到这个子元素的父级元素，删除这个子元素（地图上的食物）
        //     ele.parentNode.removeChild(ele);
        //     // 删除数组中的子元素
        //     // elements.pop(ele);
        //     elements.splice(i, 1);
        // }

        // 到循环，先删除蛇尾，再删除蛇头
        // 获取数组
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];
            // 找到这个子元素的父级元素，删除这个子元素（地图上的食物）
            ele.parentNode.removeChild(ele);
            // 删除数组中的子元素
            // elements.pop(ele);
            elements.splice(i, 1);
        }

    }
    // 把Snake暴露给window，外部可以使用
    window.Snake = Snake;
}());