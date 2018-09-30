function fn(callback){//回调函数：获取异步操作的结果
	setTime(function(){
		//var callback = function(data){console.log(data)}

		var data = 'hello'

		callback(data) 

	},1000)
}

//若需要获取一个函数中的异步操作的结果，则必须通过回调函数来获取
fn(function(data){
	console.log(data)
})




$.get('sasa?foo=bar',function(data){

})
$.ajax({
	url:'sasa',
	type:'get',
	data: {
		foo : 'bar'
	},
	//使用者负责传递，封装者需要去调用
	success: function(){

	}
})

