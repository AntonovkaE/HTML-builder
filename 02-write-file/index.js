const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const EventEmitter = require('events');

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Хотите что-нибудь ввести?\n');

stdin.on('data', data => {
  if (data == 'exit\n') {
    console.log(
      '\nУдачи!'
    );
    process.exit();
  }
  output.write(data.toString())
})

process.on('SIGINT', () => {
  console.log(
    '\nУдачи!'
  );
  process.exit();
});


