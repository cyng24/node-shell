var fs = require('fs');
var request = require('request');

module.exports = {
    pwd: function(filename, done){
        done(process.cwd());
    },
    date: function(filename, done){
        var nowDate = new Date();
        done(nowDate.toString());
    },
    ls: function(stdin, filename, done){
        var result = "";
        fs.readdir('.', function(err, files) {
            if (err) throw err;   
            files.forEach(function(file) {
               result += (file.toString() + "\n");
            })
            done(result);
        })
    },
    echo: function(filename, done){
        done(filename.join(' '));
    },
    cat: function(filename, done){
        fs.readFile(filename.toString(), function(err, contents){
            if (err) throw err;
            done(contents.toString());
        })
    },
    head: function(stdin, filename, done){
        if(stdin){done(stdin)};
        fs.readFile(filename.toString(), function(err, contents){
            if (err) throw err;
            done(contents.toString().split('\n').slice(0,5).join('\n'));
        })
    },
    tail: function(filename, done){
        fs.readFile(filename.toString(), function(err, contents){
            if (err) throw err;
            var array = contents.toString().split('\n');
            done(array.slice(array.length-5,array.length).join('\n'));
        })
    },
    curl: function(filename, done){
        request(filename.toString(), function(error, response, body){
            var result = "";
            result += 'error: ' + error + '\n';
            if(response){
                result += 'statusCode: ' + response.statusCode + '\n';
            }    
            result += 'body: ' + body;
            done(result);
        })
    }
}