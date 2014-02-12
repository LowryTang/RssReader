var http = require('http'),
    url = require('url'),
    BufferHelper = require('../utilizes/bufferhelper'),
    iconv = require('iconv-lite'),
    xml2js = require('xml2js');

module.exports = service;

var service = {};

service.get = function (params, callback){
	this.http.get(params, function (res){
	  console.log('STATUS: ' + res.statusCode);
  	var buffer = new BufferHelper();
    var parser = xml2js.Parser();
		res.on('data', function (chunk) {
  	 	buffer.add(chunk);
	  }).on('end', function (){
	  	var buf = buffer.toBuffer();
	  	var str = iconv.decode(buf,'GBK');
      parser.parseString(str, function(err, data){
        console.log(data);
        callback(null, data);  
      });
	  });
	}).on('error',function(e){
    callback(e)
		console.log(e.message);
	});
}