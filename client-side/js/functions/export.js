/* global app */
window.functions.export = {
  name: 'export',
  type: 'File',
  run: function () {
    const url = app.canvas.toDataURL()
    const a = document.createElement('a')
    a.setAttribute('download', 'artware.png')
    a.setAttribute('href', url)
    a.click()
    a.remove()
  }
}
