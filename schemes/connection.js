var mysql = require('mysql');
var extend=require("node.extend")
function conn(settings){
	var defaultSetting_1={
		host: 'localhost',
      	user: 'root',
      	password: 'root',
      	lib:'tables',
      	sql:""
	}
	var defaultSetting=extend(defaultSetting_1,settings); 
	var promise=new Promise(function(resolve,reject){
		var mysql = require('mysql');
	    var connection = mysql.createConnection({
	      host: defaultSetting.host,
	      user: defaultSetting.user,
	      password: defaultSetting.password
	    });
			// con();
	    connection.connect();
	    connection.query("USE "+defaultSetting.lib);
	    connection.query(defaultSetting.sql, function (err, results, fields) { 
	        if (err) { 
	        	resolve(err);
	            reject(err); 
	        }else {
	            if(results.length > 0) {
	                resolve(results);
	            }else {
	                resolve({status: 00000});
	            }           
	        } 
	      } 
	    );
	    connection.end(); 
	});
	return promise;
}
module.exports=conn;