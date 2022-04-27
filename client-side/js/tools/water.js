window.tools.water = {
  name: 'water',
  icon: '/images/water.png',
  state: {
    selected: false,
    mousePressed: false,
    size: 15
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.size += 3
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        // const mouse = e.app.eventToMouse(e)
        const px = e.state.prevMouse.x || e.mouse.x
        const py = e.state.prevMouse.y || e.mouse.y
        const radius = e.state.size
        e.ctx.strokeStyle = 'blue'
        e.ctx.beginPath()
        e.ctx.arc(py, px, radius, radius - 10, Math.pi, 90, Math.pi)
        e.ctx.fillStyle = 'blue'
        e.ctx.fill()
        e.ctx.closePath()
        e.ctx.stroke()
      }
    }
  }
}
