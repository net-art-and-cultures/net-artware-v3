const path = require('path')
const express = require('express')
const app = express() // create a server app with the express library
const port = 8000 // port number for server

// path to "back end" server-side REST API
const REST_API = require('./server-side/rest-api.js')
app.use(REST_API)

// path to static "front end" client-side files
const path2site = path.join(__dirname, './client-side')
app.use(express.static(path2site))

// run the server, it automatically starts listening for requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
})
