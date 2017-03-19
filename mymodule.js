// mymodule
module.exports = function(dir, ext, callback) {
	var fs = require("fs");
	var path = require("path");
	var arr = new Array();
	fs.readdir(dir, function(err, list) {
		if(err)
			return callback(err);
		for(var i = 0; i<list.length; i++) {
			var item = path.extname(list[i]) === "." + ext ? true : false;
			if(item)
				arr.push(list[i]);
		}
		callback(null, arr);
	});
};