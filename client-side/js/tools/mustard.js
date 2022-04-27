window.tools.mustard = {
  name: 'mustard',
  icon: '/images/mustard.png',
  state: {
    selected: false,
    mousePressed: false,
    size: 10
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.size += 1
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        // const mouse = e.app.eventToMouse(e)
        const px = e.state.prevMouse.x || e.mouse.x
        const py = e.state.prevMouse.y || e.mouse.y
        const radius = e.state.size
        e.ctx.strokeStyle = 'yellow'
        e.ctx.beginPath()
        e.ctx.ellipse(py, px, radius, radius - 10, Math.pi, 90, Math.pi)
        e.ctx.fillStyle = 'yellow'
        e.ctx.fill()
        e.ctx.closePath()
        e.ctx.stroke()
      }
    }
  }
}
