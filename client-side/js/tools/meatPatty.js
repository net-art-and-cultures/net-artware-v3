/* global app */
window.tools.meatPatty = {
  name: 'meat patty',
  icon: '/images/meatPatty-icon.png',
  state: {
    selected: false,
    mousePressed: false
  },
  events: {
    mousedown: function () {
      this.state.mousePressed = true
    },
    mouseup: function () {
      this.state.mousePressed = false
    },
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
          console.log(newColor)
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
  }
}
