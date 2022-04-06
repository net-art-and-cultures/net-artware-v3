const express = require('express')
const app = express() // create a server app with the express library
const port = 8000 // port number for server

// path to "back end" server-side REST API
const REST_API = require('./server-side/rest-api.js')
app.use(REST_API)

// path to static "front end" client-side files
app.use(express.static(`${__dirname}/client-side`))

// run the server, it automatically starts listening for requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}, CTRL + C to shutdown`)
})
