window.onload = () => {
    lunBo();
}/*页面加载时要执行的函数*/
function lunBo() {
    //1.获取ul
    var cur_ul = document.getElementById('banner')
    // 2.创建一个数组实例
    var arr = new Array();

    // 用js来创建li、img元素，有多少张图片要轮播就循环多少次
    for (i = 1; i <= 3; i++) {
        // 创建li元素
        var cur_li = document.createElement('li')
        // 创建img元素
        var cur_img = document.createElement('img')
        // 给img元素设置src、width、height属性
        // 这里src是轮播图的路径
        // 在img文件夹下的图片命名为1.jpg、2.jpg、3.jpg....才可以这样写
        cur_img.src = 'picture/' + i + '.jpg';
        cur_img.style.width = '600px';
        cur_img.style.height = '280px';
        // 把img元素插入到创建的li里面
        cur_li.appendChild(cur_img);
        // 然后在把li插入到ul里面
        cur_ul.appendChild(cur_li);
        // 然后给ul元素设置事件，鼠标移进来停止轮播
        cur_ul.onmouseenter = function () {
            // 停止setInterval执行的代码
            clearInterval(timer)
        }
        // 鼠标移出ul又继续轮播图片
        cur_ul.onmouseleave = function () {
            // 指定时间执行代码
            timer = setInterval(get_next, 2000)
        }
        // 当创建完一个li（li里已经有img元素）就把li添加到arr数组里
        // arr里存的li 相当于一个对象，在其他地方在把arr里的li取出来，还是指向原来那个，并不是一个新的li
        // 相当于对象的浅拷贝，指针指向问题
        arr.push(cur_li)
    }

    // 因为所写的轮播图是中间图片放大大，左右两边图片正常，所以要进行下面的操作
    // 如果你只需要那种一张张图片轮播，即没有左右两边的轮播图，可以去掉下面代码
    // 我们要三张图片进行展示， 左 中 右
    var len = arr.length - 1;
    imgLocation();

    // 封装轮播图函数
    // 然后开始进行轮播，原理就是换arr里的li元素的位置，越靠后的li元素z-index越大
    // z-index越大，就会叠在其他li元素上面，所以换arr里的li位置就可以实现轮播
    function get_next() {
        var give_up = arr[arr.length - 1];//获取arr数值里最后一个li元素
        arr.pop();//删除掉最后一个li元素
        arr.unshift(give_up);//最后把最后一个元素插入到arr数组的前面
        // 然后重新给arr数组里的li元素设置z-index和scale
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.zIndex = 1;
            arr[i].style.transform = 'scale(1)';
        }
        // 这步就是展示arr的后两张图片，和前一个步骤的一样
        imgLocation();
    }


    // 用js创建左箭头
    var pre_img = document.createElement('img');
    pre_img.src = 'picture/左箭头.jpg';//左箭头图片
    pre_img.style.position = 'absolute';
    pre_img.style.top = "30px";
    pre_img.style.left = "-400px";
    pre_img.style.margin = "0";
    pre_img.style.zIndex = "100";
    cur_ul.appendChild(pre_img);

    // 用js创建右箭头
    var next_img = document.createElement('img')
    next_img.src = 'picture/右箭头.jpg';//右箭头的图片
    next_img.style.position = 'absolute';
    next_img.style.top = "30px";
    next_img.style.right = "-400px";
    next_img.style.margin = "0";
    next_img.style.zIndex = "100";
    cur_ul.appendChild(next_img);

    // 给左箭头点击绑定事件
    pre_img.onclick = function () {
        get_pre();
    }
    // 右箭头的作用就是向前轮播一直图片，和我们上面写的get_next()方法要实现的功能一样，直接引用
    next_img.onclick = function () {
        get_next();
    }

    // 左箭头的绑定事件 和get_next()思路一样，就是要改一下就行。
    // 先取出arr数组第一个li，在把这个li放到最后即可
    function get_pre() {
        var give_up = arr[0];
        arr.shift();//取出来最后一张图片
        arr.push(give_up);//把最后一张图片放到第一张
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.zIndex = 1;
            arr[i].style.transform = 'scale(1)'
        }
        imgLocation();
    }

    function imgLocation() {
        // 这是取得左边图片并调整位置
        arr[len - 2].style.left = '-200px';
        // 这是取得中间图片并调整位置
        arr[len - 1].style.left = '200px';
        // 这是取得右边图片并调整位置
        arr[len].style.left = '600px';
        // 然后中间图片调用scale使其变大
        arr[len - 1].style.transform = 'scale(1.3)';
        // 使中间图片覆盖两边图片
        arr[len - 1].style.zIndex = "2";
    }
}