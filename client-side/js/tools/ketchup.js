window.tools.ketchup = {
  name: 'ketchup',
  icon: '/images/ketchup.png',
  state: {
    selected: false,
    mousePressed: false,
    drops: 5
  },

  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.drops = Math.random() * 5 + 5
    },
    mousemove: function (e) {
      if (e.state.selected && e.state.mousePressed) {
        for (let i = 0; i < e.state.drops; i++) {
          const radius = Math.random() * 5 + 5
          const x = e.mouse.x + (Math.random() * 10 - 5)
          const y = e.mouse.y + (Math.random() * 20 - 5)
          e.ctx.beginPath()
          e.ctx.arc(x, y - 10, radius, radius - 20, Math.PI / 4, 45, Math.PI)
          e.ctx.fillStyle = 'rgba(161, 11, 0,0.5)'
          e.ctx.fill()
          e.ctx.closePath()
        }
      }
    }
  }
}
