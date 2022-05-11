window.functions.clear = {
  name: 'clear',
  type: 'File',
  run: function (e) {
    const context = e.canvas.getContext('2d')
    e.ctx.clearRect(0, 0, context.canvas.width, context.canvas.height)
  }
}
