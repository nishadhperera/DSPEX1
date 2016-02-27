/*
This is the client side javascript code for the calculator application
*/

var operators; // stores operators
var operands;  // stores operands
var result;
var cachedResults = []; // stores cached results
var calSteps;   // stores steps of calculation
var cacheSize;  // stores cache size
var msgsToServer;   // stores the count of messages sent to server

function toServer(n1, n2, op) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:8081" + "?arg1=" + encodeURIComponent(n1) + "&arg2=" + encodeURIComponent(n2) + "&op=" + encodeURIComponent(op), false);
    xmlhttp.send(null);
    var fromServer =  xmlhttp.responseText;
    return fromServer;
}

function arrangeData(){
    msgsToServer = 0;
    result = 0;
    operators = [];
    operands = [];
    calSteps = [];

    var data = document.getElementById("input").value;
    var separators = [' ', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];   // delimiters for parsing the input
    operands = data.split(new RegExp(separators.join('|'), 'g'));     // get the operands into an array

    var x = data.split("");
    var index = 0;
    for	(i = 0; i < x.length; i++) {
        if (x[i] == "+") {
            operators[index] = x[i];
            index++;
        } else if (x[i] == "-") {
            operators[index] = x[i];
            index++;
        } else if (x[i] == "*") {
            operators[index] = x[i];
            index++;
        } else if (x[i] == "/") {
            operators[index] = x[i];
            index++;
        }
    }
    //console.log("Operands: "+operands.toString());
    //console.log("Operators: "+operators.toString());
    calculate();
}
function calculate(){
    var counter = 0;
    while(operands.length > 1){
        var n1 = operands.shift();
        var n2 = operands.shift();
        var op = operators.shift();
        //console.log(counter);
        //console.log(n1);
        //console.log(op);
        //console.log(n2);
        //console.log("----------------");
        var simplified = simplify(n1, n2, op);
        console.log("Simplified = "+simplified);
        if(!simplified){
            result = toServer(n1, n2, op);
            msgsToServer++;
        }
        //console.log("cached data: "+n1 + op + n2 + "=" + result);
        cachedResults.unshift(n1 + op + n2 + "=" + result);    // storing results in cache
        calSteps.push(n1 + op + n2 + "=" + result);         // storing results in calculation steps
        operands.unshift(result);
        //console.log("Operands.size: "+operands.length);
        cachedResults = cachedResults.splice(0,cacheSize);  // limiting the cache size to the defines value
        //console.log("cache size: "+cachedResults.length);
    }
    document.getElementById("result").value = result;
    printData("calculationSteps","Calculation steps :",calSteps);
    printData("history","Cached Results :",cachedResults);
    console.log("Cache size: "+cacheSize);
    console.log("Messages to Server: "+msgsToServer);
}

function printData(ElementID, InitialText, arr){
    document.getElementById(ElementID).innerHTML = "";
    var node = document.createElement("P");
    var textnode = document.createTextNode(InitialText);
    node.appendChild(textnode);
    document.getElementById(ElementID).appendChild(node);

    for	(i = 0; i < arr.length; i++){
        if(arr[i] != null) {
            var node = document.createElement("P");
            var textnode = document.createTextNode("" + arr[i]);
            node.appendChild(textnode);
            document.getElementById(ElementID).appendChild(node);
        }
    }
}

function simplify(n1, n2, op){
    //console.log("------ Simplification Called ------");
    var simplified = false;
    var order12 = n1+op+n2;
    var order21 = n2+op+n1;
    //console.log("order12 = "+n1+op+n2);
    //console.log("order21 = "+n2+op+n1);
    for	(i = 0; i < cachedResults.length; i++){
        //console.log("Inside simplifying loop: "+cachedResults[i]);
        var str = cachedResults[i].split("=")
        if (order12 == str[0]){
            result = str[1];
            //console.log("Matched: "+order12+" & "+str[0]);
            simplified = true;
            break;
        }else if(order21 == str[0] && (op == "+" || op == "*")){
            result = str[1];
            //console.log("Matched: "+order21+" & "+str[0]);
            simplified = true;
            break;
        }else{
            simplified = false;
            //console.log("Not simplifiable");
        }
    }
    return simplified;
}

function cacheLimit(){
    cacheSize = new Number(document.getElementById("cacheVal").value);
    console.log("Cache size: "+cacheSize);
}