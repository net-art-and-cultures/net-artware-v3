window.functions.clear = {
  name: 'clear',
  type: 'clear',
  run: function (e) {
    const canvas = e.document.getElementById('canvas')
    const ctx = e.canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}
