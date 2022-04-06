const axios = require('axios')
const express = require('express')
const router = express.Router()

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

module.exports = router
