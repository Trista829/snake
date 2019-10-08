// 创建食物对象
// (function(){

// })();
// 自调用函数---食物的
(function () {
    // 创建一个数组，保存每个小方块食物
    var elements = [];
    // 食物就是一个对象，有宽，高，颜色，横纵坐标，先定义构造函数，然后创建对象
    function Food(width, height, color, x, y) {
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || "green";
        this.x = x || 0;
        this.y = y || 0;
    };
    // 删除食物的私有函数remove
    function remove() {
        // elements中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            // 找到这个子元素的父级元素，删除这个子元素（地图上的食物）
            ele.parentNode.removeChild(ele);
            // 删除数组中的子元素
            // elements.pop(ele);
            elements.splice(i, 1);
        }
    }
    // 为原型添加初始化的方法（作用：在页面上显示这个食物）
    Food.prototype.init = function (map) {
        // 先删除原有元素
        remove();
        // 创建div;
        var div = document.createElement("div");
        // 把div加到map中
        map.appendChild(div);
        // 为食物添加样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        // 横纵坐标应该随机生成
        // 先脱离文档流
        div.style.position = "absolute";
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        // 把div加到elements数组中
        elements.push(div);

    }
    // 把Food暴露给window，外部可以使用
    window.Food = Food;

}());