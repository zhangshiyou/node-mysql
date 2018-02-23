var express = require('express');
var router = express.Router();
var con=require('../schemes/connection');
/* GET users listing. */
router.get('/getInfo_1', function(req, res, next) {
    var ssss;
    con({sql:'SELECT * FROM money'}).then(function(data) {
        res.render('./user/user_1', { title: '我是传过来的值',cont:data });
    }).catch(function(err){})
});

module.exports = router;
