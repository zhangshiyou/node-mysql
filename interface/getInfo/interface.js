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
router.post('/zengjia',function(req, res) {
    var cash = req.body;
    var cash_1 = cash.cash;
    var bank_1 = cash.bank;
    // console.log(cash_1,bank)
    if(cash_1=="" || bank_1 == ""){
        res.json({stat:8888});
        return
    }
    var insertS='INSERT INTO money_from (cash,bank) VALUES ("'+cash_1+'","'+bank_1+'");';
    console.log(insertS)
    con({sql:insertS}).then(function(data) {
        console.log(data)
        res.json(data);
        res.end();
    }).catch(function(err){
        console.log(err)
    })

})
module.exports = router;