const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,  '../public');
var app = express();

var port = process.env.PORT || 9090;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
