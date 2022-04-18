const axios = require('axios')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

// Example REST API "end point"
router.get('/api/random-dog', async (req, res) => {
  // get a random dog image from https://dog.ceo
  const json = await axios.get('https://dog.ceo/api/breeds/image/random')
  // if we got back data...
  if (json.data.status === 'success') {
    res.json({ img: json.data.message }) // ...send it back in respsone...
  } else { // ...if not...
    res.json({ error: 'oops! sorry no data' }) // ...send back error message.
  }
})

router.post('/api/data-url', async (req, res) => {
  // we can get access to the image data sent by the client via: req.body.dataURL
  // the dataURL is all the pixel data from the canvas encoded in "base64"
  // base64 is a very common way of encoding raw data in a string
  // (instead of base2, aka binary, or base16 aka hexadecimal, etc)
  console.log(req.body.dataURL)

  // ...here we would do stuff with that data
  // ...like send it to clarifai

  // ...and eventually we would send some data back to the client
  // ...like this...
  res.json({ status: 'success' })
})

module.exports = router
