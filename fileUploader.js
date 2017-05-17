var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var path = require("path");
var mime = require("mime");

var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'mytoken.json';


var authorize = function(credentials, fileName, callback) {
  var auth = new googleAuth();
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      console.log(err)
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client, fileName);
    }
  });
}



var uploadFile = function(auth, fileName) {
  console.log(fileName)
  var drive = google.drive({ version: 'v3', auth: auth });

  drive.files.create({
    resource: {
      name: path.basename(fileName),
      mimeType: mime.lookup(fileName)
    },
    media: {
      mimeType: mime.lookup(fileName),
      body: fs.readFileSync(fileName,"utf-8")
    }
  },function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }else {
      console.log(response);
    }
  });
}

module.exports.upload = function(fileName){
    fs.readFile("key.json", function(err, content){
    if(err){
      logger.log("error",err.message)
    }else{
      authorize(JSON.parse(content),fileName, uploadFile);
    }
  })

}
