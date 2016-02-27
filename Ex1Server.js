var http = require("http");
var url = require("url");


http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type":"text/plain", "Access-Control-Allow-Origin":"*"});

    var params = url.parse(request.url,true).query;

    var a = decodeURIComponent(params.arg1);
    var b = decodeURIComponent(params.arg2);
    var op = decodeURIComponent(params.op);

    console.log(params);
    var numA = new Number(a);
    var numB = new Number(b);

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