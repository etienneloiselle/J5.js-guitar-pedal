var five = require("johnny-five");
var easymidi = require('easymidi');
var board = new five.Board();

// Set up a new output.
var output = new easymidi.Output('nodemidi 2');

board.on("ready", function() {

  var outputsList = easymidi.getOutputs();
  console.log("output --- " + outputsList);

  // Create a new `button` hardware instance.
  var button = new five.Button({
      pin: 12,
    isPullup: true
    });

  button.on("press", function() {
    output.send('noteon', {
      note: 36,
      velocity: 127,
      channel: 3
    });
   
  });

  button.on("release", function() {
    output.send('noteoff', {
      note: 36,
      velocity: 127,
      channel: 3
    });
  });


});

board.on("exit", function() {
  output.close();
});