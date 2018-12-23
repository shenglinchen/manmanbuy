$(function() {
    var productDetails = new ProductDetails();
    var productId = productDetails.getSearchParam("productId");

    productDetails.getproduct(productId);

    productDetails.getComment(productId);

    productDetails.muiDownUpInit();

})

function ProductDetails () {

}

ProductDetails.prototype = {
    baseURL: "http://localhost:9090",

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

    // 下拉刷新初始化
    muiDownUpInit: function () {
        var that = this;
        mui.init({
            pullRefresh : {
              container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function() {
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              }
            }
          });
    },

    // 获取商品信息
    getproduct: function(id) {
        var that = this;
        
        
        $.ajax({
            url: that.baseURL + "/api/getproduct",
            data: {
                productid: id
            },
            success: function (data) {
                console.log(data);
                
                var html = template("detailTpl", data);

                $("#main .main-main .detail").html(html);
                $(".from").html(data.result[0].bjShop);
                
                $.ajax({
                    url: that.baseURL + "/api/getcategorybyid",
                    data: {
                        categoryid: data.result[0].categoryId
                    },
                    success: function(data) {
                        $(".back").html(data.result[0].category).attr("href", "productList.html?categoryid=" + data.result[0].categoryId)
                        
                    }
                })
                
            }
        })

    },
    // 获取评论
    getComment: function (id) {
        var that = this;

        $.ajax({
            url: that.baseURL + "/api/getproductcom",
            data: {
                productid: id
            },
            success: function (data) {
                var html = template("commentTpl", data);
                $("#main .comment .content ul").html(html);
                
            }
        })
    }
}