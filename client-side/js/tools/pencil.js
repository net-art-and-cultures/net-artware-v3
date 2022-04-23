window.tools.pencil = {
  name: 'pencil',
  icon: '/images/pencil-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    prevMouse: { x: null, y: null }
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
      // if this tool is selected AND the mouse is pressed
      if (e.state.selected && e.state.mousePressed) {
        // const mouse = app.eventToMouse(e)
        const px = e.state.prevMouse.x || e.mouse.x
        const py = e.state.prevMouse.y || e.mouse.y
        // draw a line
        e.ctx.beginPath()
        e.ctx.moveTo(e.mouse.x, e.mouse.y)
        e.ctx.lineTo(px, py)
        e.ctx.closePath()
        e.ctx.stroke()
        // update prevMouse coordinates
        e.state.prevMouse = { x: e.mouse.x, y: e.mouse.y }
      }
    }
  }
}
