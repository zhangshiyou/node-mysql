$(".sss").click(function(){
	$.ajax({
		url:"/getInfo/signup",
		type:'post',
		dataType:"json",
		data:{},
		success:function(){

		}
	})
})