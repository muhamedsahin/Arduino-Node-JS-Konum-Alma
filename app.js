const { SerialPort } = require('serialport')
const port = new SerialPort({
  path: 'COM10',
  baudRate: 9600,
  autoOpen: false,
})

port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message)
    }
    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on')
    port.on('readable', function () {
        console.log('Data:', port.read().toString())
      })
  })
  
  // The open event is always emitted
  port.on('open', function() {
    // open logic
  })