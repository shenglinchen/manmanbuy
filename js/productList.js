$(function () {
    var productList = new ProductList();
    // 初始化滚动区域
    productList.muiDownUpInit();

    // 获取参数
    console.log(productList.getSearchParam("categoryid"));

    productList.getShangpins();

    // 链接跳转
    $("#main .all").on("tap", "a", function(){
        location = $(this).attr("href");        
    })
})

function ProductList() {

}

ProductList.prototype = {
    baseURL: "http://localhost:9090",
    pageid: 1,
    muiGundongInit: function() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },

    // 获取地址栏参数
    getSearchParam: function (paramName) {
        var search = location.search.substr(1).split("&");
        var searchParam = {};
        for(var i = 0; i < search.length; i++) {
            if (paramName == search[i].split("=")[0]) {
                return search[i].split("=")[1];
            }
        }
    },

    // 获取二级分类商品
    getShangpins: function () {
        var that = this;
        var id = that.getSearchParam("categoryid");
        $.ajax({
            url: that.baseURL + "/api/getproductlist",
            type: "get",
            data: {
                categoryid: id,
                pageid: that.pageid
            },
            success: function(data) {
                console.log(data);
                var html = template("shangpinTpl", data);
                // console.log(html);
                $("#main .main-main .all ul").html(html);
                
            }
        })

        $.ajax({
            url: that.baseURL + "/api/getcategorybyid",
            data: {
                categoryid: id 
            },
            success: function(data) {
                console.log(data);
                
                $(".back").html(data.result[0].category)                
            }
        })
    },

    // 初始化下拉刷新上拉加载
    muiDownUpInit: function () {
        var that = this;
        var id = that.getSearchParam("categoryid");
        mui.init({
            pullRefresh : {
              container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    $.ajax({
                        url: that.baseURL + "/api/getproductlist",
                        type: "get",
                        data: {
                            categoryid: id,
                            pageid: 1
                        },
                        success: function(data) {
                            console.log(data);
                            var html = template("shangpinTpl", data);
                            // console.log(html);
                            $("#main .main-main .all ul").html(html);
                            that.pageid = 0;
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                            mui('#refreshContainer').pullRefresh().refresh(true);

                            
                        }
                    })

                    // 
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              },
              up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:false,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function() {
                    ++that.pageid;
                    $.ajax({
                        url: that.baseURL + "/api/getproductlist",
                        type: "get",
                        data: {
                            categoryid: id,
                            pageid: that.pageid
                        },
                        success: function(data) {
                            console.log(data);
                            console.log(that.pageid);
                            
                            var html = template("shangpinTpl", data);
                            // console.log(html);
                            if (data.result.length > 0) {
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
    }
    


}