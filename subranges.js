const fs = require('fs');
const calcWindows = require('./calcWindows');

fs.readFile('input.txt', 'utf8', function(err, contents) {
  const lines = contents.split('\n');
  const k = parseInt(lines[0].split(' ')[1]);
  const data = lines[1].split(' ').map(function(str) {
    return parseInt(str);
  });

  const results = calcWindows(data, k).join('\n')
  fs.writeFile('output.txt', results, (err) => {
      if (err) throw err;
      console.log(`Output saved to output.txt`);
  });
});
