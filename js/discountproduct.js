$(function () {
    var discountproduct = new Discountproduct();

    var id = discountproduct.getSearchParam("productid");

    discountproduct.getdiscountproduct(id);

    discountproduct.muiDownUpInit();
})

function Discountproduct() {

}

Discountproduct.prototype =  {
    baseURL: "http://localhost:9090",

    // 初始化
    muiDownUpInit: function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },

    // 获取地址栏参数
    getSearchParam: function (paramName) {
        var search = location.search.substr(1).split("&");
        for (var i = 0; i < search.length; i++) {
            if (paramName == search[i].split("=")[0]) {
                return search[i].split("=")[1];
            }
        }
    },

    // 获取数据
    getdiscountproduct: function (id) {
        var that = this;
        $.ajax({
            url: that.baseURL + "/api/getdiscountproduct",
            data: {
                productid: id
            },
            success: function (data) {
                console.log(data);
                var html = template("productTpl", data);
                console.log(html);
                $(".product").html(html);
                $(".comment").html(data.result[0].productComment);
                
            }
        })
    }
}