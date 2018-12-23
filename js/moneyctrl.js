$(function () {
    var moneyctrl = new Moneyctrl();

    moneyctrl.getmoneyctrl();

    moneyctrl.muiDownUpInit();

    moneyctrl.jumpLink();
})

// 面向对象
function Moneyctrl() {

}

// 原型
Moneyctrl.prototype = {
    baseURL: "http://localhost:9090",
    pageId: 1,

    // 初始化下拉刷新
    muiDownUpInit: function () {
        var that = this;

        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        that.pageId = 1;
                        $.ajax({
                            url: that.baseURL + "/api/getmoneyctrl",
                            data: {
                                pageid: that.pageId
                            },
                            success: function (data) {
                                var html = template("shangpinListTpl", data);
                                $("#main .main-main .all ul").html(html);
                                console.log(data);
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                mui('#refreshContainer').pullRefresh().refresh(true);
                            }
                        })
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                    height: 50,//可选.默认50.触发上拉加载拖动距离
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        that.pageId++;
                        $.ajax({
                            url: that.baseURL + "/api/getmoneyctrl",
                            data: {
                                pageid: that.pageId
                            },
                            success: function (data) {
                                console.log(data);
                                
                                

                                // 判断数据完了没有
                                if (data.result.length > 0) {
                                    var html = template("shangpinListTpl", data);
                                    $("#main .main-main .all ul").append(html);
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();

                                }else {
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        })
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    },

    // 获取数据
    getmoneyctrl: function () {
        var that = this;
        $.ajax({
            url: that.baseURL + "/api/getmoneyctrl",
            data: {
                pageid: that.pageId
            },
            success: function (data) {
                var html = template("shangpinListTpl", data);
                $("#main .main-main .all ul").html(html);
                console.log(data);

            }
        })
    },

    // a链接点击跳转
    jumpLink: function() {
        $("#main .shangpin").on("tap", "a", function() {
            location = $(this).attr("href");
        })
    }
}