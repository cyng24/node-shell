var commands = require('./commands');
// Output a prompt
process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line

process.stdin.on('data', function (data, done) {
  var done = function(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
  }  
var cmd = data.toString().trim().split(/\s*\|\s*/g); // remove the newline, any amount of whitespace, pipe, any amount of whitespace
var cmds = cmd[0].split(' ')  
commands[cmds[0]](cmds.slice(1), done);
});