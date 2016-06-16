/**
 * 模块工具类，用来初始化各模块视图、自定绑定事件以及其他辅助功能等
 * @class Utils
 */
Utils = function() {

}

Utils.prototype.captureMouse = function(_this) {
	var cursorX, cursorY;

	document.onmousemove = function(e){
		cursorX = e.pageX;
		cursorY = e.pageY;
	}
	return {x: cursorX, y: cursorY};
	
}
 
/**
 * Utils 类实例[全局]
 * @attribute utils
 */
utils = new Utils();
 
/**
 * 判断当前对象是否为空
 * @method isEmpty
 * @param {Object} obj
 * @return {Boolean} empty 当为 null,undefined,"" 将返回true
 */
window.isEmpty = function(obj) {
	return (obj == null || typeof obj == "undefined" || obj.length == 0)
}
 
/**
 * 判断当前对象是否非空
 * @method isNotEmpty
 * @param {Object} obj
 * @return {Boolean}  
 */
window.isNotEmpty = function(obj) {
	return !isEmpty(obj);
}
 
/**
 * 判断是否为函数
 * @method isFunc
 * @param {Object} fun
 * @return {Boolean}
 */
window.isFunc = function(fun) {
	return (fun != null && typeof fun == "function");
}
 
/**
 * 判断不是函数
 * @method isNotFunc
 * @param {Object} fun
 * @return {Boolean}
 */
window.isNotFunc = function(fun) {
	return !isFunc(fun);
}
 
/**
 * 判断 cur 是否为 type 类型
 * @method typeOf
 * @param {Object} cur
 * @param {String} type
 * @example
 * 	typeOf("Hello","string");//将返回true
 * @return {Boolean}
 */
window.typeOf = function(cur, type) {
	if (typeof type != "string")
		return false;
	return typeof cur == type;
}
 
/**
 * 判断是否为数组
 * @method isArray
 * @param {Object} array
 * @return {Boolean}
 */
window.isArray = function(array) {
	return isNotEmpty(array) && className(array) == "Array"
}
 
/**
 * 判断不是数组
 * @method isNotArray
 * @param {Object} arr
 * @return {Boolean}
 */
window.isNotArray = function(arr) {
	return !isArray(arr);
}
 
/**
 * 获取当前模块名
 * @method className
 * @param {Object} obj
 * @example
 *  className(g_utils);//返回 "Utils"
 * @return
 */
window.className = function(obj) {
	if (obj && obj.constructor && obj.constructor.toString) {
		var arr = obj.constructor.toString().match(/function\s*(\w+)/);
		if (arr && arr.length == 2) {
			obj.clazz = arr[1]
			return arr[1];
		}
	}
	return undefined;
}
 
/**
 * 判断两个对象是否为相同的类
 * @method isSameClass
 * @param {Object} cur
 * @param {Object} cur2
 * @return {Boolean}
 */
window.isSameClass = function(cur, cur2) {
	if (isNotEmpty(cur) && isNotEmpty(cur2)) {
		return className(cur) == className(cur2);
	}
	return false;
}
 
/**
 * 判断两个对象为不同类
 * @method isDifClass
 * @param {Object} cur
 * @param {Object} cur2
 * @return {Boolean}
 */
window.isDifClass = function(cur, cur2) {
	return !isSameClass(cur, cur2);
}
 
/**
 * 以 window.open 方式打开弹窗
 * @method openwindow
 * @param {String} url
 * @param {String} name
 * @param {Number} iWidth
 * @param {Number} iHeight
 */
window.openwindow = function(url, name, iWidth, iHeight) {
	var url; // 转向网页的地址;
	var name; // 网页名称，可为空;
	var iWidth; // 弹出窗口的宽度;
	var iHeight; // 弹出窗口的高度;
	var iTop = (window.screen.availHeight - 30 - iHeight) / 2; // 获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; // 获得窗口的水平位置;
	window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}
 
/**
 * 返回 true 且啥也不处理的回调函数，用于{{#crossLink "Dialog"}}{{/crossLink}}中设置无所作为的按钮的事件
 * @method doNothing
 * @example
 * 	dialog.get("confrim2",doNothing,doNow);//doNow 为回调函数
 * @return {Boolean}
 */
window.doNothing = function() {
	return true;
}
 
/**
 * 更新浏览器地址栏链接地址
 * @method updateUrl
 * @param {String} url
 */
window.updateUrl = function(url) {
	if (window.history && window.history.pushState) {
		window.history.pushState(null, url, url);
	}
};
 
/**
 * 判断当前是否处在iframe中
 * @method isIframe
 * @return {Boolean}
 */
window.isIframe = function() {
	return top.location != self.location;
}
 
/**
 * 判断当前不处在iframe中
 * @method isIframe
 * @return {Boolean}
 */
window.isNotIframe = function() {
	return !isIframe();
};
 
/**
 * 利用数组的join构造字符串，提高字符串拼接效率
 * @method buildString
 * @param arguments {String|Number}
 * @return {String} 拼接后的字符串
 */
window.buildString = function(){
	var str = [];
	for(var i=0;i<arguments.length;i++){
		str[i] = arguments[i];
	}
	return str.join("");
};
 
window.console = window.console || {};
 
console.log || (console.log = typeof opera != "undefined" ? opera.postError : function(msg) {
});
 
/*---IE Extend---*/
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elt /* , from */) {
		var len = this.length >>> 0;
 
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);
		if (from < 0)
			from += len;
 
		for (; from < len; from++) {
			if (from in this && this[from] === elt)
				return from;
		}
		return -1;
	};
}
 
ConsoleUtils = (function(){
	var open = false;
	function ConsoleUtils(op){
		open = op;
	}
	ConsoleUtils.prototype.toggle = function(){
		open = !open;
	};
	ConsoleUtils.prototype.open = function(){
		open = true;
	}
	ConsoleUtils.prototype.close = function(){
		open = false;
	}
	ConsoleUtils.prototype.log = function(msg){
		if(open)
			console.log(msg);
	}
	return ConsoleUtils;
})();
 
Console = new ConsoleUtils(false);