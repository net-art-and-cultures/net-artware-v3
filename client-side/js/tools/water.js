window.tools.water = {
  name: 'water',
  icon: '/images/water.png',
  state: {
    selected: false,
    mousePressed: false,
    drops: 15
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.drops = Math.random() * 10 + 5
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        // const mouse = e.app.eventToMouse(e)
        for (let i = 0; i < e.state.drops; i++) {
          const radius = Math.random() * 10 + 5
          const x = e.mouse.x + (Math.random() * 35 - 10)
          const y = e.mouse.y + (Math.random() * 30 - 10)
          e.ctx.beginPath()
          e.ctx.arc(x, y, radius, radius - 10, Math.PI, 90, Math.PI)
          e.ctx.fillStyle = 'rgba(0, 0, 255, 0.1)'
          e.ctx.fill()
          e.ctx.closePath()
        }
      }
    }
  }
}
