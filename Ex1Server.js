/*
This is the server side code for the calculator application
*/

var http = require("http");
var url = require("url");


http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain", "Access-Control-Allow-Origin":"*"});

    var params = url.parse(request.url,true).query; // parse the incoming message from client

    var a = decodeURIComponent(params.arg1);    // input number 1 for calculation
    var b = decodeURIComponent(params.arg2);    // input number 2 for calculation
    var op = decodeURIComponent(params.op);     // input operation for calculation

    console.log(params);
    var numA = new Number(a);   // creating a number from input 1
    var numB = new Number(b);   // creating a number from input 2

    if (op == "+") {
        var r = new Number(numA + numB);
    }else if (op=="-") {
        var r = new Number(numA - numB);
    }else if (op=="*") {
        var r = new Number(numA * numB);
    }else {
        var r = new Number(numA / numB);
    }

    response.write(String(r));
    response.end();
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');