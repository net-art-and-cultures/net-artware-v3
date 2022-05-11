window.tools.sprinkles = {
  name: 'sprinkles',
  icon: '/images/sprinkles.png',
  state: {
    selected: false,
    mousePressed: false,
    sprinkles: 1
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.sprinkles = Math.random() * 10 + 10
      e.ctx.resetTransform()
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        for (let i = 0; i < e.state.sprinkles; i++) {
          e.ctx.setTransform(1, 0.2, 0.8, 1, 0, 0)
          e.ctx.fill()
          const radius = Math.random() * 5
          const px = e.mouse.x + (Math.random() * 10 - 5)
          const py = e.mouse.y + (Math.random() * 20 - 10)
          e.ctx.setTransform(1, 0.2, 0.1, 1, 0, 0)
          e.ctx.beginPath()
          e.ctx.moveTo(e.mouse.x, e.mouse.y)
          e.ctx.arc(px, py, radius / 5, radius / 10, Math.PI, 90, Math.PI / 4)
          //  e.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
          // e.ctx.lineTo(px, py)
          // e.ctx.closePath()
          e.ctx.fill()
          e.ctx.resetTransform()
        }
      }
    }
  }
}
