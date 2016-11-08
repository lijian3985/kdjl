


console.log("Sss");
//选择器，ID和类选择器
function $(select){
		var select = select ;
		var result = [];
		var claName = null ;
		if(select.charAt(0)=="#"){
			select = select.slice(1);
			return document.getElementById(select);
		}
		else if(select.charAt(0)=="."){
			select = select.slice(1);
			if(document.getElementsByClassName){
				return document.getElementsByClassName(select) ;
			}
			else{			
				var all = document.getElementsByTagName("*");
				for(var i = 0,len = all.length;i<len;i++){
					claName = (all[i]).className ;
					claName = claName.split(" ");
					for(var j=0,len2 = claName.length;j<len2;j++){
						if(claName[j]==select){
							result.push(all[i]);
							break;
						}
					}
				}
			}
			return result;
		}
	}
//获取样式	
function getStyle(obj,attr,bool){
	var result = null ;
	if(obj.currentStyle){
		result = obj.currentStyle[attr] ;
	}
	else{
		result = getComputedStyle(obj,false)[attr] ;
	}
	if(bool){
		return result ;
	}
	else{
		result = result.replace("px","");
		return result ;
	}
}



//  创建运动对象函数
//使用说明：
//传入参数为一个对象，模型为:
/*{
	ele:dom元素,
	attr:改元素要运动的属性,
	init:改属性初始状态,
	endP:末态,
	v:改变速度, 	有方向
	a:加速度,
	func:回调函数	
	}
*/
// 还函数返回一个对象,所带的属性为：
//运动的定时器，初始状态，当前状态，末态，速度，加速度;开始运动的方法；
function createMove(arg){
	var obj = {};
	obj.ele = arg.ele;
	obj.attr = arg.attr;
	obj.init = arg.init;
	obj.nowP = obj.init;
	obj.endP = arg.endP;
	obj.v = arg.v;
	obj.a = arg.a;
	obj.timer = null;
	obj.func = arg.func;		
	obj.begin = function(){
		// var s = this.endS - this.init;
		if(obj.attr = "opacity"){
			
			obj.timer = setInterval(function(){

				//0.速度改变
				changeV() ;

				//1.改变样式
				changeP() ;

				//2.把样式设置为改变后的样式
				obj.ele.style.opacity = obj.nowP ;
				
				//3.判断是否应该停止
				if(Math.abs((obj.nowP-obj.init))>=Math.abs((obj.endP-obj.init))){
					//清除定时器
					clearInterval(obj.timer);

					//把样式设置为this.endP的样式
					obj.ele.style.opacity = obj.endP;

					//把定时器设为空
					obj.timer = null ;

					//执行回调函数
					obj.func();
				}			
			},1);			
		}
	}

	//计算出当前速度
	var changeV = function(){
		obj.v +=obj.a;
	}
	// 计算出当前位置
	var changeP = function(){
		obj.nowP +=obj.v;
		if(obj.v == 0){

		}
	}
	return obj ;
}