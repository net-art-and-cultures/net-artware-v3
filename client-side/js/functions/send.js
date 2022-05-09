window.functions.send = {
  name: 'send to server',
  type: 'File',
  run: async function (e) {
    // here we store a base64 encoded image, this is all of the
    // raw pixel data from the canvas encoded as a string, aka "data url"
    const dataURL = e.canvas.toDataURL()
    // here we create an object for our HTTP POST request,
    // it contains the type of HTTP request we want to create (POST)
    // as well as the necessary request headers (explaining the data we're gonna send is JSON)
    // && also the data itself (ie. body), in our case just the dataURL in a JSON object
    const opts = {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dataURL })
    }
    // adding new line to test
    // we'll use fetch to create that POST request to our server
    // sending it to the "/api/data-url" endpoint defined in the REST API
    const req = await window.fetch('/api/data-url', opts)
    // here we assume the REST API will respond with a JSON object
    // && we're logging that JSON object to the client-side's web console
    const res = await req.json()
    console.log('from send: ')
    console.log(res)

    // creating recipie element to add to document
    const main = document.createElement('div')
    for (let i = 0; i < res.data.length; i++) {
      const imgDiv = document.createElement('div')
      const img = document.createElement('img')
      const textDiv = document.createElement('div')
      const title = document.createElement('a')
      main.classList.add('container')
      img.classList.add('imgDiv')
      textDiv.classList.add('textDiv')

      // adding content to elmts
      img.src = res.data[i].image
      imgDiv.appendChild(img)
      const linkText = document.createTextNode(res.data[i].title)
      title.appendChild(linkText)
      title.title = res.data[i].title
      title.href = res.data[i].sourceURL
      textDiv.appendChild(title)
      main.appendChild(imgDiv)
      main.appendChild(textDiv)
      const recipeDiv = document.getElementById('recipes')
      recipeDiv.append(main)
    }
  }
}
