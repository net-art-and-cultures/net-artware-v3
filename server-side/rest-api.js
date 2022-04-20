const axios = require('axios')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc')
const stub = ClarifaiStub.grpc()
const metadata = new grpc.Metadata() // used to authenticate
metadata.set('authorization', 'Key d9c28c50aab0499cb6c8c413b3f264d4') // API key from emris' Clarafai acct food-test application

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

  const canvas = req.body.dataURL.split('base64,')[1]

  stub.PostModelOutputs( // copied from: https://github.com/Clarifai/clarifai-nodejs-grpc
    {
      // This is the model ID of Food Recognition Model: https://www.clarifai.com/models/ai-food-recognition
      model_id: 'bd367be194cf45149e75f01d59f77ba7',
      inputs: [{ data: { image: { base64: canvas } } }] // image data from canvas encoded in base64
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log('Error: ' + err)
        return
      }

      if (response.status.code !== 10000) {
        console.log('Received failed status: ' + response.status.description + '\n' + response.status.details)
        return
      }

      console.log('Predicted concepts, with confidence values:')
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ': ' + c.value)
      }
    }
  )

  // ...and eventually we would send some data back to the client
  // ...like this...
  res.json({ status: 'success' })
})

module.exports = router
