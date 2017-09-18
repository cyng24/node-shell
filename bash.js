var commands = require('./commands');
// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line

process.stdin.on('data', function (data, done) {
  var done = function(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }  
var pipeArray = data.toString().trim().split(/\s*\|\s*/g); // remove the newline, any amount of whitespace, pipe, any amount of whitespace
var cmd = pipeArray[0].split(' ')
if(pipeArray.length == 1){
    commands[cmd[0]](cmd.slice(1), done);
}  
else{
    commands[cmd[1]](cmd[0], done);
}
});

// cat bash.js | head
// pipeArray = ["cat bash.js", "head"];
// cmd = ["cat", "bash.js"]
// commands[bash.js](cat, done);
// commands[head](cat bash.js, done);