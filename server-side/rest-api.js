const axios = require('axios')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc')
const stub = ClarifaiStub.grpc()
const metadata = new grpc.Metadata() // used to authenticate
metadata.set('authorization', 'Key d9c28c50aab0499cb6c8c413b3f264d4') // API key from emris' Clarafai acct food-test application
const apiKey = '756c19d994a3497a82093e3b4bbe91fe' // Spoontacular API key

router.use(bodyParser.json({ limit: '50mb' }))

module.exports = router

router.post('/api/data-url', async (req, res) => {
  // we can get access to the image data sent by the client via: req.body.dataURL
  // the dataURL is all the pixel data from the canvas encoded in "base64"
  // base64 is a very common way of encoding raw data in a string
  // console.log(req.body.dataURL)

  const canvas = req.body.dataURL.split('base64,')[1]
  const clarafaiData = {
    // This is the model ID of Food Recognition Model: https://www.clarifai.com/models/ai-food-recognition
    model_id: 'bd367be194cf45149e75f01d59f77ba7',
    inputs: [{ data: { image: { base64: canvas } } }]
  } // image data from canvas encoded in base64

  function createSpoonURL (ingredients, num) {
    let url = 'https://api.spoonacular.com/recipes/findByIngredients'
    url += `?ingredients=${ingredients.join(',+')}`
    url += `&number=${num}`
    url += `&apiKey=${apiKey}`
    return url
  }

  async function getRecipies (ingredients, numRecipies) {
    const recURL = createSpoonURL(ingredients, numRecipies)
    // console.log(recURL)
    // I need to only add a couple of ingredients to the request url
    const json = await axios.get(recURL)
    return json // return recipies
  }

  async function getRecipeByID (id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    const json = await axios.get(url)
    return json
  }

  async function getIngredients (err, response) {
    if (err) {
      console.log('Error: ' + err)
      res.json({ staus: 'error', error: err })
      return
    }
    if (response.status.code !== 10000) {
      const message = ('Received failed status: ' + response.status.description + '\n' + response.status.details)
      console.log(message)
      res.json({ staus: 'error', error: message })
      return
    }
    console.log('Predicted concepts, with confidence values:')
    const outputs = [] // where food predictions will go
    for (const c of response.outputs[0].data.concepts) {
      console.log(c.name + ': ' + c.value)
      if (c.value > 0.8) { outputs.push(c.name) }
    }

    // then get recipies
    const rec = await getRecipies(outputs, 2)

    for (let i = 0; i < rec.data.length; i++) {
      const recID = await getRecipeByID(rec.data[i].id)
      rec.data[i].sourceURL = recID.data.sourceUrl
    }

    res.json({ status: 'success', data: rec.data })
  }

  stub.PostModelOutputs(clarafaiData, metadata, getIngredients)// https://github.com/Clarifai/clarifai-nodejs-grpc
})
