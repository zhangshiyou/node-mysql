var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
// var users = require('./routes/users');
var getInfo = require('./routes/getInfo');
var zengjia = require('./routes/zengjia');
var passKey = require('./routes/passKey');
var interface = require('./routes/interface');

var app = express();

app.use(session({
	resave: true, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'zdasdasdasdadasdadaasdda',
	name : "token",
	rolling:true
}));
// view engine setup
console.log(path.join(__dirname, 'views')+"获取地址")
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(function (req, res, next) {
	console.log(JSON.stringify(req.session)+"home")
	console.log(req.url.split("/")+"_________火球")
	next()
	// if(req.originalUrl == "/"){
	// 	next()
	// }
	// else{
	// 	if (req.session.token) {  // 判断用户session是否存在    
	//     	next();  
	//   	} else {  
	// 	    // var arr = req.url.split('/');  
	// 	    // for (var i = 0, length = arr.length; i < length; i++) {  
	// 	    //   	arr[i] = arr[i].split('?')[0];  
	// 	    // }  
		  
	// 	    // // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截  
	// 	    if (req.originalUrl == "/") {  
	// 	      	next();  
	// 	    } else {  
	//      		var tt=new Date().getTime();
	// 	      	// req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径  
	// 	      	res.redirect("/");    
	// 	    }  
	//   	}  
	//  	console.log(JSON.stringify(req.session.token)+"首页获取token")
	//  	// next();
	// }
})
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/getInfo', getInfo);
app.use('/interface', zengjia);
app.use('/login', index);
// app.use('/getInfo_1', index);
// app.use('/getInfo_1', passKey);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
