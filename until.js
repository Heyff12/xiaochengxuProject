var glob = require('glob');
// 获取入口文件
exports.entry = (function() {
    var entry = {};
    glob.sync('./test/src/js/home/*').forEach(function(name) {
    	//console.log(name);
        var n = name.slice(19, name.length - 3);
        entry[n] = name;
    });
    //console.log(entry);
    return entry;
})();