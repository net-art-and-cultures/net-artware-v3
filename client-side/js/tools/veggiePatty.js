/* global app */
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
      this.state.mousePressed = true
      this.state.colorStop = false

      if (this.state.selected) {
        const mouse = app.eventToMouse(e)
        this.state.mousePosition.x = mouse.x
        this.state.mousePosition.y = mouse.y
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
        img.src = '/images/meatPatty-texture.png'
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
          app.ctx.beginPath()
          app.ctx.fillStyle = blendedColor(baseColor, percentage)
          app.ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2, true)
          app.ctx.fill()
          // Draws the texture over the shape
          app.ctx.drawImage(img, mouse.x - 50, mouse.y - 50)
          app.ctx.globalCompositeOperation = 'source-over'
        }
        cook()
      }
    },
    mouseup: function () {
      this.state.mousePressed = false
      if (this.state.selected) {
        this.state.colorStop = true
      }
    }
  }
}
