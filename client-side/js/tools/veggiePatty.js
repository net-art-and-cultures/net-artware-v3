window.tools.veggiePatty = {
  name: 'meat patty',
  icon: '/images/veggiePatty-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    mousePosition: { x: null, y: null },
    colorStop: true
  },
  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
      e.state.colorStop = false

      if (e.state.selected) {
        e.state.mousePosition.x = e.mouse.x
        e.state.mousePosition.y = e.mouse.y
        // defines the colors to blend through
        // red, pink, brown and black
        const colors = [
          [53, 189, 22],
          [211, 219, 204],
          [102, 41, 0],
          [0, 0, 0]
        ]
        // Declaring the texture image
        const img = new window.Image()
        img.src = '/images/patty-texture.png'
        // blends the color given with the one after it
        function blendedColor (firstColor, bPercentage) {
          const newColor = [
            (1 - bPercentage) * colors[firstColor][0] + bPercentage * colors[firstColor + 1][0],
            (1 - bPercentage) * colors[firstColor][1] + bPercentage * colors[firstColor + 1][1],
            (1 - bPercentage) * colors[firstColor][2] + bPercentage * colors[firstColor + 1][2]
          ]
          return 'rgb(' + newColor[0] + ', ' + newColor[1] + ',' + newColor[2] + ')'
        }

        let baseColor = 0
        let beat = 0
        // Changes the color of the patty
        function cook () {
          const fps = 1000 / 30
          const timeout = setTimeout(cook, fps)
          // Stops the color changes when mouse is let go
          if (window.tools.veggiePatty.state.colorStop) {
            clearTimeout(timeout)
          }
          // Creates a blend value
          let percentage = beat * 0.02
          beat++
          // When the blend value reaches 100%,
          // resets and selects the next color
          if (percentage >= 1) {
            beat = 0
            if (baseColor !== 2) {
              baseColor++
            } else { // Stops the Animation when Patty is Black
              clearTimeout(timeout)
            }
          }
          // Seting 'percentage' again to prevent flickering
          percentage = beat * 0.02
          // Draws the patty shape
          e.ctx.beginPath()
          e.ctx.fillStyle = blendedColor(baseColor, percentage)
          e.ctx.arc(e.mouse.x, e.mouse.y, e.ctx.lineWidth, 0, Math.PI * 2, true)
          e.ctx.fill()
          // Draws the texture over the shape
          e.ctx.drawImage(
            // image source
            img,
            // x position
            e.mouse.x - e.ctx.lineWidth,
            // y position
            e.mouse.y - e.ctx.lineWidth,
            // width
            e.ctx.lineWidth * 2,
            // height
            e.ctx.lineWidth * 2)
          e.ctx.globalCompositeOperation = 'source-over'
        }
        cook()
      }
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      if (e.state.selected) {
        e.state.colorStop = true
      }
    }
  }
}
