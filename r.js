require('dotenv').config();

const express = require('express');

const path = require('path');
const app = express(); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname ));
const PORT = process.env.PORT || 3000;
process.env.NODE_NO_WARNINGS = '1';
app.use(express.static(path.join(__dirname)));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the script and image on '/hit'
app.get('/hit', (req, res) => {
  const script = `
    <script>
      if (window.screen && window.screen.width && window.screen.height) {
        screenWidth = window.screen.width;
        screenHeight = window.screen.height;
        xhr = new XMLHttpRequest();
        xhr.open('POST', '/screen-resolution');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ width: screenWidth, height: screenHeight, navig: navigator }));
      } 
    </script>
    <img src="bd.jpg" alt="bd image">
  `;
  res.send(script);
});

// Receive the screen resolution data on '/screen-resolution'
app.post('/screen-resolution', (req, res) => {
  console.log('Screen resolution data:', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
