var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var con=require('../schemes/connection');

var router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser())
router.use(session({
    secret: 'blog'
}))

/* GET users listing. */
router.use(function timeLog(req,res,next) {
    var _user = req.session.user;
    if(_user) {
        //router.locals.user = user;
    }
    next();
});
//查询
router.post('/signup',function(req, res) {
    con({sql:'SELECT * FROM money'}).then(function(data) {
        res.json(data);
        res.end();
    }).catch(function(err){})

})


module.exports = router;
