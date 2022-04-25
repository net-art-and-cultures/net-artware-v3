window.options.strokeWeight = {
  name: 'stroke weight',
  run: function (e) {
    const ele = document.createElement('div')
    ele.innerHTML = `
      <style>
        .pencil-options {
          position: relative;
          top: 4px;
          padding: 10px;
        }
      </style>

      <div class="pencil-options">
        <input type="range" min="1" max="100" value="${e.ctx.lineWidth}">
      </div>
    `

    const slider = ele.querySelector('input')
    slider.addEventListener('input', () => {
      e.ctx.lineCap = 'round'
      e.ctx.lineJoin = 'round'
      e.ctx.lineWidth = slider.value
    })

    return ele
  }
}
