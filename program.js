/* hello world
console.log("HELLO WORLD");*/

/* baby steps
var num = 0;
for(var i=2; i<process.argv.length; i++) {
	num += +process.argv[i];
}
console.log(num);*/

/* my first i/o
var fs = require("fs");
console.log(fs.readFileSync(process.argv[2]).toString().split("\n").length - 1);*/

/* my first async i/o
var fs = require("fs");
fs.readFile(process.argv[2], "utf8", function doneReading(err, data) {
	console.log(data.split("\n").length - 1);
});*/

/* filtered ls
var fs = require("fs");
var path = require("path");
fs.readdir(process.argv[2], function(err, list) {
	for(var i = 0; i<list.length; i++) {
		var item = path.extname(list[i]) === "." + process.argv[3] ? true : false;
		if(item)
			console.log(list[i]);
	}
});*/

/* make it modular
var mymodule = require("./mymodule.js");
mymodule(process.argv[2], process.argv[3], function(err, list) {
	if(err)
		console.log(err);
	for(var i=0; i<list.length; i++) {
		console.log(list[i]);
	}
});*/

/* http client
var http = require("http");
http.get(process.argv[2], function(response) {
	response.on("data", function(data) {
		console.log(data);
	}).setEncoding("utf8");
});*/

/* http collect
var http = require("http");
var string = "";
http.request(process.argv[2], function (response) {
	response.setEncoding("utf8");
	response.on("data", function(data) {
		string += data;
	})
	response.on("end", function() {
		console.log(string.length);
		console.log(string);
	});
}).end();*/

/* juggling async
var http = require("http");
var i = 2;
getData();
function getData() {
	var string = "";
	http.get(process.argv[i], function(response) {
		response.on("data", function(data) {
			string += data;
		}).setEncoding("utf8");
		response.on("end", function() {
			console.log(string);
			if(i < process.argv.length) {
				i++;
				getData();
			}
		});
	});
}*/

/* time server
var net = require("net");
var server = net.createServer(function(socket) {
	var date = new Date();
	var write = date.getFullYear() + "-" +
		(date.getMonth()+1 < 10 ? "0" : "") + (date.getMonth() + 1) + "-" +
		(date.getDate() < 10 ? "0" : "") + date.getDate() + " " +
		(date.getHours() < 10 ? "0" : "") + date.getHours() + ":" +
		(date.getMinutes() < 10 ? "0" : "") + date.getMinutes() + "\n";
	socket.write(write);
	socket.end();
});
server.listen(process.argv[2]);*/

/* http file server
var http = require("http");
var fs = require("fs");
var server = http.createServer(function(request, response) {
	var rs = fs.createReadStream(process.argv[3]);
	rs.pipe(response);
});
server.listen(process.argv[2]);*/

/* http uppercaser
var http = require("http");
var server = http.createServer(function (req, res) {
	var string = "";
	if(req.method === "POST") {
		req.on("data", function(data) {
			string += data;
		});
		req.on("end", function() {
			string = string.toUpperCase();
			res.write(string);
			res.end();
		});
	}
});
server.listen(process.argv[2]);*/

// http json api server
var http = require("http");
var server = http.createServer(function (req, res) {
	var url = require("url").parse(req.url, true);
	var date = new Date(url.query.iso);
	var obj;
	if(url.pathname === "/api/parsetime") {
		obj = {"hour" : date.getHours(),
		"minute" : date.getMinutes(),
		"second" : date.getSeconds()
	}
	} else if(url.pathname === "/api/unixtime") {
		obj = {"unixtime" : date.getTime()};
	}
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.write(JSON.stringify(obj));
	res.end();
});
server.listen(process.argv[2]);