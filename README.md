# File uploader

uploads a file to google drive.

# setup
  * download the client_key as json from [here](https://console.developers.google.com) using dev.englishteacher@gmail.com.
  * copy the key in this dir as key.json.
  * run `npm install` to install dependencies.
  * run `npm start` to start the server.
  * In a different terminal (same dir) run `npm generateToken`
  * Use the given url to generate refresh code. The server log's a code.
  * enter that code in other terminal and your access token will be saved.
  * Now you can visit to `localhost:8080` and upload a file.