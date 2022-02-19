//Load HTTP module
const express = require('express');
const fs = require('fs');
const http = require("http");
const path = require('path');
const hostname = '127.0.0.1';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.set('views', path.join(__dirname, 'public/pages'));
app.set('view engine', 'ejs');

app.listen(
  port,
  () => console.log('Server started on port ' + port)
)

app.get(`/gallery`, (req, res) => {
  console.log("get /gallery");
  res.render('gallery', {
    gallery_images: gallery_images.sort((a, b) => 0.5 - Math.random())
  }
  );
});


function filenamesWithAlts(files) {
  list = [];
  for (const file of files) {
list.push({
    'filename': encodeURIComponent(file),
    'alt': file.split('.')[0] });

  }
return list;
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname + 'public/img')));

var gallery_images = [];
fs.readdir("public/img/gallery", function(err, files) {
  if (files !== undefined) {
      gallery_images = filenamesWithAlts(files);
  }
});
