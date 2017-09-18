var commands = require('./commands');
// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line

process.stdin.on('data', function (data, done) {
  var done = function(output, boolean = false) {
    if (!boolean){
        process.stdout.write(output);
        process.stdout.write('\nprompt > ');
    }
    else {
        return output
    }
  }  
var cmdList = data.toString().trim().split(/\s*\|\s*/g); // remove the newline, any amount of whitespace, pipe, any amount of whitespace
var cmd= cmdList[0].split(' ');
if(cmdList.length == 1){
    commands[cmd[0]](stdin = false, cmd.slice(1), done);
}  
else{
    var pipedIn = commands[cmd[0]](stdin = true, cmd.slice(1), done);
    commands[cmdList[1]](stdin, pipedIn, done);
}
});

// cat bash.js | head
// cmdList = ["cat bash.js", "head"];
// cmd = ["cat", "bash.js"];
// pipedIn = all that text;
// commands[head](all that text)