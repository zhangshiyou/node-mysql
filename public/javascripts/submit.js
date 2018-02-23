$(".asd").click(function(){
	var cash=$(".cash").val()
	var bank=$(".bank").val()
	console.log(cash,bank)
	$.ajax({
		url:"/interface/zengjia",
		type:'post',
		dataType:"json",
		data:{cash:cash,bank:bank},
		success:function(){

		}
	})
})