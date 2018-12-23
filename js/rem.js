rem();

// 配置页面的根字号
function rem() {
	// 设计高375px，根字号100px
	var designWidth = 375;
	var designFont = 100;
	// 获取页面宽度
	var htmlWidth = document.documentElement.offsetWidth; 
	// 页面的根元素
	var htmlFont = htmlWidth / (designWidth / designFont) + "px";
	document.documentElement.style.fontSize = htmlFont;
}

