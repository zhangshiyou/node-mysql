var express = require('express');
var router = express.Router();
var node_xlsx = require("node-xlsx");
var con=require('../schemes/connection');
var fs=require("fs");
var path=require("path");
var formidable = require('formidable');  
var getInfaso=require("./zengjia");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '登录'});
});
router.get('/second', function(req, res, next) {
  res.render('second', { title: 'secondPage' });
  console.log(__dirname+"=====================>>")
});
router.get('/getInfo', function(req, res, next) {
  res.render('./user/user', { title: 'secondPage' });
});
router.get('/signUp', function(req, res, next) {
  res.render('./singUp/signUp', { title: '注册' });
});
router.get('/getInfo_1', function(req, res, next) {
  	var ssss;
    con({sql:'SELECT * FROM money'}).then(function(data) {
		res.render('./user/user_1', { title: '我是传过来的值',cont:data });
    }).catch(function(err){})
});
router.get('/lorem', function(req, res, next) {
	res.render('lorem', { title: '我是传过来的值'});
});
router.get('/iframe', function(req, res, next) {
	res.render('iframe', { title: '我是传过来的值'});
});
router.get('/upload', function(req, res, next) {
	res.render('./uploadData/upload', { title: '导入数据'});
});
router.post('/login', function(req, res, next) {
		var nick=req.body.nick;
		var pwd=req.body.pwd;
		var sql="SELECT * FROM ZSY_USER";
		con({sql:sql}).then(function(data){
			var datas=data;
			var ss=[];
			if(datas.length>0){
				for(var s=0;s<datas.length;s++){
					ss.push(datas[s].userName);
				}
			}
			for(var a=0;a<datas.length;a++){
				if(datas[a].userName==nick && datas[a].pwd==pwd){
					res.cookie("token",nick, {maxAge: 600000,httpOnly: false});
					console.log(JSON.stringify(req.session)+"输出session");
					if(req.cookies.token !== null){
    					req.token=req.cookies.token;
    					req.session.token = {username:nick,pwd:pwd};
    					console.log(req.cookies.token+"asdasd")
  					}
					res.redirect("/second");
					res.end();
					return
				}
			}
			res.render('index',{err:true});
			res.end();
		}).catch(function(err){})
});
router.post('/singup', function(req, res, next) {
  	var nick=req.body.nick;
	var pwd=req.body.pwd;
	var sql="SELECT * FROM ZSY_USER";
	con({sql:sql}).then(function(data){
		return data;
	}).then(function(ds){
		var insertS='INSERT INTO ZSY_USER (userName,pwd) VALUES ("'+nick+'","'+pwd+'");';
		if(ds.status==0){
			con({sql:insertS}).then(function(d){
				res.redirect("/");
				res.end();
			}).catch(function(err){})
			return
		}
		var sql="SELECT COUNT(userName) FROM zsy_user WHERE userName='"+nick+"';";
		con({sql:sql}).then(function(data){
			if(data[0]['COUNT(userName)']==0){
				con({sql:insertS}).then(function(d){
					console.log("------------------->>>>>>>>>"+d+"------------------>>>>>>>>>>>")
					if(d.code=="ER_DATA_TOO_LONG"){
						res.render("./singUp/signUp",{err:"密码太长",title:"注册"})
					}else{
						res.redirect("/");
						res.end();
					}
				}).catch(function(err){})
				return
			}
			res.json({code:"notPass"});
			res.end();
		}).catch(function(err){})
	}).catch(function(err){})
});
router.post('/canSingup', function(req, res, next) {
  	var nick=req.body.nick;
	var pwd=req.body.pwd;
	var sql="SELECT COUNT(userName) FROM zsy_user WHERE userName='"+nick+"';";
	con({sql:sql}).then(function(data){
		console.log(data[0]['COUNT(userName)'])
		if(data[0]['COUNT(userName)']==0){
			// res.setHeader('Set-Cookie', [ 'mycookie1=sdf'],{ 
			// 	domain: '.example.com',
			// 	path: '/', 
			// 	// expires:new Date(Date.now + 900000)
			// 	maxAge:900000
			// });
			req.session.user = "user";
			// res.cookie('cart', { items: [1,2,3] }, { maxAge: 900000 });
			console.log(JSON.stringify(req.session)+"======>session")
			console.log(JSON.stringify(res.cookie)+"======>cookie")
			// res.cookie('cart_1', { items: [1,2,3] }, { maxAge: 900000 });
			res.json({code:"pass"});
			// res.json({code:data});
			res.end();
			return
		}
		console.log(req.cookies)
		res.json({code:"notPass"});
		res.end();
	}).catch(function(err){})
});
router.post('/parseExl', function(req, res, next) {
	var form = new formidable.IncomingForm();  
    form.encoding = 'utf-8';  
    form.uploadDir = path.join(__dirname,'../excel');  
    form.keepExtensions = true;//保留后缀  
    form.maxFieldsSize = 2*1024*1024;  
    form.parse(req,function(err,fields,files){
    	if(err){
    		console.log('文件上传错误！');  
        	return ;  
    	}
    	// 上传时input的name属性
    	var filename = files.schoolsName.name;  
    	console.log(filename)
    	var nameArray = filename.split('.');  
     	var type = nameArray[nameArray.length-1];  
     	var name=nameArray[0]
    	var date = new Date();  
        var time = '_' + date.getFullYear()+"_"+date.getMonth()+"_" +date.getDay()+"_" + date.getHours() +"_"+ date.getMinutes();  
    	var avatarName = name + time +  '.' + type;  
    	var newPath = form.uploadDir +"\\"+ avatarName ; 
    	var oldPath= files.schoolsName.path
    	console.log(newPath)
    	fs.renameSync(oldPath,newPath);
    	var obj = node_xlsx.parse(newPath);  
    	// 只解析以第一sheet的数据
    	var firstSheet=obj[0].data;
    	var insertS;
    	var vals=[];
    	for(var s=1;s<firstSheet.length;s++){
    		vals.push("('"+firstSheet[s][3]+"','"+firstSheet[s][2]+"','"+firstSheet[s][1]+"')")
    	}
    	// 不在循环里面操作数据库。
    	insertS="INSERT INTO schools (shoolName,level,jz_Year) VALUES"+vals.join(",");
    	console.log(insertS)
    	con({sql:insertS}).then(function(d){
    		console.log(d)
			res.end();
			
		}).catch(function(err){})
    	// res.redirect("/");
    })
});
module.exports = router;
