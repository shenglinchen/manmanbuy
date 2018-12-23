$(function () {
    var inlanddiscount = new Inlanddiscount();

    inlanddiscount.getinlanddiscount();

    inlanddiscount.muiDownUpInit();

    inlanddiscount.jumpLink();
})

function Inlanddiscount() {

}

Inlanddiscount.prototype = {
    baseURL: "http://localhost:9090",

    // 初始化下拉刷新
    muiDownUpInit: function () {
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        setTimeout(function() {
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                        }, 1000);
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              }
            }
        });
    },

    // 获取数据
    getinlanddiscount: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + "/api/getinlanddiscount",
            success: function (data) {
                var html = template("shangpinTpl", data);
                $("#main .all ul").html(html);
                console.log(data);
                

            }
        })
    },

    // 点击跳转
    jumpLink: function() {
        $("#refreshContainer").on("tap", "a", function() {
            location = $(this).attr("href");
        })
    }
}

