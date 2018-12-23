$(function () {
    // 面向对象编程
    var index = new Index();

    // 初始化区域滑动
    index.muiScroll();

    // 设置菜单栏
    index.getService();

    // 菜单更多事件绑定
    index.munuMore();

    // 获取商品数据
    index.getmoneyctrl();

    // 返回顶部
    index.backTop()


})

// 这里要把原型的改造放在入口函数的外面，这样，当dom树加载未完毕，入口函数里的函数还没调用，原型已经构造好了。
// dom树加载完毕后，入口函数里的函数被调用，这样才不会报错

// 构造函数
function Index() {

};

Index.prototype = {

    // 所有链接的域名
    baseURL: "http://localhost:9090",
    // 区域滑动初始化
    muiScroll: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },

    // 获取功能栏
    getService: function () {
        var that = this;
        $.ajax({
            type: "get",
            url: that.baseURL + "/api/getindexmenu",
            success: function (data) {

                var html = template("menuTpl", data);
                $("#main .serviceFun ul").html(html);                
                
            }
        })
    },

    // 点击更多，菜单栏展现更多
    munuMore: function () {
        var flag = 0;
        $("#main .more").on("tap", function () {

            if (flag == 0) {
                $("#main .serviceFun ul").animate({
                    height: 372
                }, 1000);
    
                $("#main .more .fa-sort-desc").css({
                    display: "none"
                })
                $("#main .more .fa-sort-asc").css({
                    display: "block"
                })
                flag = 1;
            }else {
                $("#main .serviceFun ul").animate({
                    height: 248
                }, 1000);
    
                $("#main .more .fa-sort-desc").css({
                    display: "block"
                })
                $("#main .more .fa-sort-asc").css({
                    display: "none"
                })

                flag = 0;
            }
            
        });
        


    },

    //获取商品数据 
    getmoneyctrl: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + "/api/getmoneyctrl",
            type: "get",
            success: function (data) {
                console.log(data);
                var html = template("shangpinTpl", data);
                // console.log(html);
                $("#main .zhekou .content ul").html(html);
                
            }
        })
    },

    // 返回顶部
    backTop: function () {
        $("#main .back-top").on("tap", function() {
            
            // $("#main .all").css({
            //     transform: "translate3d(0px, 0px, 0px)"
            // })

            
        })
    }
}