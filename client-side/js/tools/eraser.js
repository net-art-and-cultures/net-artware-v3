window.tools.eraser = {
  name: 'eraser',
  icon: '/images/eraser.png',
  state: {
    selected: false,
    mousePressed: false
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.prevMouse = { x: null, y: null }
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        const mouse = e.app.eventToMouse(e)
        const px = e.state.prevMouse.x || e.mouse.x
        const py = e.state.prevMouse.y || e.mouse.y
        e.ctx.setStrokeColor(0, 0, 0, 0)
        e.ctx.beginPath()
        e.ctx.moveTo(mouse.x, mouse.y)
        e.ctx.lineTo(px, py)
        e.ctx.closePath()
        e.ctx.stroke()
      }
    }
  }
}
