﻿var http = require("http");
var url = require("url");


http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain", "Access-Control-Allow-Origin":"*"});
    var params = url.parse(request.url,true).query;

    console.log(params);

    var a = params.number1;
    var b = params.number2;
    var op = params.operation;

    var numA = new Number(a);
    var numB = new Number(b);

    if (op=="+") {
        var r = new Number(numA + numB);
    }else if (op=="-") {
        var r = new Number(numA - numB);
    }else if (op=="*") {
        var r = new Number(numA * numB);
    }else {
        var r = new Number(numA / numB);
    }

    var res = numA+ " " +op+ " " +numB+ " = " +r;

    response.write(res);
    response.end();
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');