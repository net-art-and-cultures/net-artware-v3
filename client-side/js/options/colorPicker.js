window.options.colorPicker = {
  name: 'Color Picker',
  state: {
    defaultColor: '#000000'
  },
  run: function (e) {
    const ele = document.createElement('div')
    ele.innerHTML = `
    <style>
      input[type="color"] {
        position: relative;
        top: 20px;
        height: 50px;
      }
    </style>

    <label for="colorPicker">Custom:</label>
    <input type="color" value="#ffffff" id="colorPicker">
    `

    const colorPicker = ele.querySelector('#colorPicker')
    colorPicker.value = this.state.defaultColor
    colorPicker.addEventListener('change', updateAll, false)

    function updateAll (event) {
      // Converts the Hex code from the input to RGB for the ctx
      const hexWithHash = colorPicker.value.slice(1)
      const aRgbHex = hexWithHash.match(/.{1,2}/g)
      const aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
      ]
      const rgbString = `rgb(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]})`

      e.ctx.fillStyle = rgbString
      e.ctx.strokeStyle = rgbString
    }
    return ele
  }
}
