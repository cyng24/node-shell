var fs = require('fs');
var request = require('request');

module.exports = {
    pwd: function(stdin, filename, done){
        done(process.cwd(), stdin);
    },
    date: function(stdin, filename, done){
        var nowDate = new Date();
        done(nowDate.toString(), stdin);
    },
    ls: function(stdin, filename, done){
        var result = "";
        fs.readdir('.', function(err, files) {
            if (err) throw err;   
            files.forEach(function(file) {
               result += (file.toString() + "\n");
            })
            done(result, stdin);
        })
    },
    echo: function(stdin, filename, done){
        done(filename.join(' '), stdin);
    },
    cat: function(stdin, filename, done){
        fs.readFile(filename.toString(), function(err, contents){
            if (err) throw err;
            done(contents.toString(), stdin);
        })
    },
    head: function(stdin, filename, done){
        fs.readFile(filename.toString(), function(err, contents){
            if (err) throw err;
            done(contents.toString().split('\n').slice(0,5).join('\n'), stdin);
        })
    },
    tail: function(stdin, filename, done){
        fs.readFile(filename.toString(), function(err, contents){
            if (err) throw err;
            var array = contents.toString().split('\n');
            done(array.slice(array.length-5,array.length).join('\n'), stdin);
        })
    },
    curl: function(stdin, filename, done){
        request(filename.toString(), function(error, response, body){
            var result = "";
            result += 'error: ' + error + '\n';
            if(response){
                result += 'statusCode: ' + response.statusCode + '\n';
            }    
            result += 'body: ' + body;
            done(result, stdin);
        })
    }
}