var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var morgan = require('morgan')
var fileUploader = require("./fileUploader");


app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('tiny'))

var saveFileLocaly = function(req, res){
  var fileName;
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '/uploads');
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.keepExtensions = true;

  form.on('file', function(field, file) {
    fileName = path.join(form.uploadDir, file.name)
    fs.rename(file.path, fileName);
  });

  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function() {
    fileUploader.upload(fileName);
    res.end('success');
  });

  form.parse(req);
}


app.get('/', function(req, res){res.sendFile(path.join(__dirname, 'views/index.html'));});
app.get('/outhCallback',function(req, res){
  console.log("Use this code to create token:- ",res.req.query.code);
  res.redirect("/");
})
app.post('/upload', function(req, res){saveFileLocaly(req ,res);});

var server = app.listen(8080, function(){
  console.log('Server listening on port 8080');
});
