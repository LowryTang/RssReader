var http = require('http'),
    url = require('url'),
    BufferHelper = require('../util/bufferhelper'),
    iconv = require('iconv-lite'),
    xml2js = require('xml2js');

var service = {};

service.get = function (params, callback) {
    http.get(params, function (res) {
        console.log('STATUS: ' + res.statusCode);
        var buffer = new BufferHelper();
        var parser = xml2js.Parser();
        res.on('data', function (chunk) {
            buffer.add(chunk);
        }).on('end', function () {
            console.log("request end");
            var buf = buffer.toBuffer();
            var str = iconv.decode(buf, 'GBK');
            parser.parseString(str, function (err, data) {
                console.log(data);
                callback(null, data);
            });
        });
    }).on('error', function (e) {
        callback(e)
        console.log(e.message);
    });
}

module.exports = service;
