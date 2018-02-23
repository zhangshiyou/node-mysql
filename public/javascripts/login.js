$(".commit-btn").click(function(){
	var nick=$(".nick").val();
	var pwd=$(".pwd").val();
	if(nick==""){
		alert("请输入昵称")
		return;
	}
	if(pwd==''){
		alert("请输入密码")
		return;
	}
	var data={
		nick:nick,
		pwd:pwd
	}
	$.ajax({
		url:"/getInfo/signup",
		type:'post',
		dataType:"json",
		data:data,
		success:function(s){
			if(s.status==0){
				window.location.href="http://127.0.0.1:3000/second"
			}
		},
	})
})
$("input[type='submit']").click(function(e){
	var nick=$(".nick").val();
	var pwd=$(".pwd").val();
	if(nick=='' || pwd==""){
		alert("请输入昵称或者密码")
		e.preventDefault();
		return
	}

})