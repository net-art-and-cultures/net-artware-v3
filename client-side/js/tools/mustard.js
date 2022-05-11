window.tools.mustard = {
  name: 'mustard',
  icon: '/images/mustard.png',
  state: {
    selected: false,
    mousePressed: false,
    drops: 1
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.drops = Math.random() * 1 + 10
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        for (let i = 0; i < e.state.drops; i++) {
          const radius = Math.random() * 5 + 3
          const x = e.mouse.x + (Math.random() * 15 - 10)
          const y = e.mouse.y + (Math.random() * 15 - 8)
          e.ctx.beginPath()
          e.ctx.arc(x, y - 10, radius, radius - 20, Math.PI, 0, Math.PI / 2)
          e.ctx.fillStyle = 'rgba(219, 162, 4, 0.2)'
          e.ctx.fill()
          e.ctx.closePath()
        }
      }
    }
  }
}
