const express = require('express'); 
const app = express();
const { SerialPort } = require('serialport')
const port = new SerialPort({
  path: 'COM10',
  baudRate: 9600,
  autoOpen: false,
})
app.use(express.static(__dirname + '/views'));
let portRead = "";
let lan = "";
let lon = "";
let hız = "";
port.open(function (err) {
    if (err) {
      return console.log('Error opening port: ', err.message)
    }
    app.listen(3000)

    app.set('views', './views');
    app.set('view engine', 'ejs');
    // Because there's no callback to write, write errors will be emitted on the port:
    port.write('main screen turn on')
    port.on('readable', function () {
      portRead = port.read().toString();
        console.log('Data:', portRead)
        
        function splitStr(portRead) {
      
          // Function to split string
          var string = portRead.split(",");
          lan= string[0];
          lon= string[1];
          hız= string[2];
        }
        splitStr(portRead);  
        console.log("lan:"+lan);
        console.log("lon:"+lon); 
        console.log("Hız:"+hız); 

     

        app.get('', (req, res) => {
        res.render('index', { lan: lan, lon: lon,hız: hız})
      })
      })
  })
  
  // The open event is always emitted
  port.on('open', function() {
    // open logic
  })
