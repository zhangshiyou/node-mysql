var canSubmit=true;
$(".lorem").click(function(){
	$('.lorem').blur(function(){
		var v=$(this).val();
		if(v==""){
			alert("请输入昵称");
			return
		}
		var data={nick:v}
		$.ajax({
			url:"./canSingup",
			type:'post',
			dataType:"json",
			data:data,
			success:function(s){
				if(s.code=="notPass"){
					alert("昵称被注册过了");
					canSubmit=false;
				}
				if(s.code=="pass"){
					canSubmit=true;
				}
			},
		})
	})
})
$(".submit").click(function(e){
	if(canSubmit){
		var nick=$(".lorem").val()
		var pwd=$("input[name='pwd']").val();
		if(nick==""){
			e.preventDefault();
			alert("请输入昵称")
			return 
		}
		if(pwd==""){
			e.preventDefault();
			alert("请输入密码")
			return
		}
	}else{
		alert("昵称被注册过了")
		e.preventDefault();
	}
})