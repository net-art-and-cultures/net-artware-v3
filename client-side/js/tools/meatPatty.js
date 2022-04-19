/* global app */
window.tools.meatPatty = {
  name: 'meat patty',
  icon: '/images/meatPatty-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    mousePosition: { x: null, y: null },
    colorStop: false
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
          [255, 71, 71],
          [232, 192, 173],
          [102, 41, 0],
          [0, 0, 0]
        ]
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
          if (window.tools.meatPatty.state.colorStop) {
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
    /*
    click: function (e) {
      if (this.state.selected) {
        const mouse = app.eventToMouse(e)
        const px = mouse.x
        const py = mouse.y
        // defines the colors to blend through
        // red, pink, brown and black
        const colors = [
          [255, 71, 71],
          [232, 192, 173],
          [102, 41, 0],
          [0, 0, 0]
        ]
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
        for (let i = 0; i <= 9; i++) {
          if (i === 3) {
            baseColor = 1
            beat = 0
          }
          if (i === 6) {
            baseColor = 2
            beat = 0
          }
          const percentage = beat * 0.25
          app.ctx.fillStyle = blendedColor(baseColor, percentage)
          app.ctx.fillRect(px + (i * 25), py, 25, 25)
          beat++
        }
      }
    }
    */
  }
}
