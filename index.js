var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Middleware for handling file uploads
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Multer configuration for file uploads
const upload = multer({ dest: 'upload/' }); // Save files to the "uploads" directory

// Default route
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// File upload endpoint
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded!' });
  }

  const file = req.file;

  console.log("file : " + file);
  console.log("file.originalname : " + file.originalname);
  console.log("file.mimetype : " + file.mimetype);
  console.log("file.size : " + file.size);
  // Send file details in JSON response
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size // Size in bytes
  });
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
