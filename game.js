 // 自调用函数--游戏对象
 (function () {
     // 因为定时器中的this是window，要获取游戏对象中的this要用that代替
     var that = null;
     // 创建游戏构造函数
     function Game(map) {
         this.food = new Food();
         this.snake = new Snake();
         this.map = map;
         that = this;
     }
     // 为原型对象添加方法--初始化(使小蛇和食物显示出来 )
     Game.prototype.init = function () {
         // 食物初始化
         this.food.init(this.map);
         // 小蛇初始化
         this.snake.init(this.map);
         // 小蛇动起来--在后面写不在这里，使可以改变方向
         // setInterval(function(){
         //     that.snake.move(that.food,that.map);
         //     that.snake.init(that.map);
         // },150);
         this.runSnake(this.food, this.map);
         this.bindkey();
     }
     // 为原型对象添加方法--小蛇动起来
     Game.prototype.runSnake = function (food, map) {
         var timeId = setInterval(function () {
             // 定时器里面的this是指window，可用bind()改变指向
             this.snake.move(food, map);
             this.snake.init(map);
             // 横坐标的最大值
             var maxX = map.offsetWidth / this.snake.width;
             // 纵坐标的最大值
             var maxY = map.offsetHeight / this.snake.height;
             // 小蛇的头的坐标
             var headX = this.snake.body[0].x;
             var headY = this.snake.body[0].y;
             // 判断是否撞墙
             if (headX >= maxX || headX < 0) {
                 clearInterval(timeId);
                 alert("游戏结束");
             }
             if (headY >= maxY || headY < 0) {
                 clearInterval(timeId);
                 alert("游戏结束");

             }
         }.bind(that), 100);
     };
     // 为原型对象添加方法--设置用户按键，改变小蛇运动方向
     Game.prototype.bindkey = function () {
         document.addEventListener("keydown", function (e) {
             // 这里的this是指document
             // 获取按键的值
             switch (e.keyCode) {
                 case 37:
                     this.snake.direction = "left";
                     break;
                 case 38:
                     this.snake.direction = "top";
                     break;
                 case 39:
                     this.snake.direction = "right";
                     break;
                 case 40:
                     this.snake.direction = "bottom";
                     break;
             }
         }.bind(that), false);
     };
     window.Game = Game;
 }());