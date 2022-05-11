window.options.colorPallet = {
  name: 'color pallet',
  run: function (e) {
    const element = document.createElement('div')
    element.innerHTML = `
      <style>
        .pallet {
          position: relative;
          bottom: 7px;
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
          padding: 10px;
        }
        input[type="button"] {
          width: 25px;
          height: 25px;
          margin: 0 0 0 5px;
          border: 2px solid black;
          border-radius: 50%;
        }
        input[type="button"]:hover {
          border-color: grey;
        }

      </style>


      <div class="pallet" style="display: grid;">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">
        <input type="button">

      </div>
    `
    const colors = [
      'rgb(255, 255, 255)', // white
      'rgb(0, 0, 0)', // black
      'rgb(255, 0, 0)', // red
      'rgb(255, 111, 0)', // orange
      'rgb(255, 247, 0)', // yellow
      'rgb(53, 189, 22)', // green
      'rgb(0, 255, 212)', // cyan
      'rgb(0, 145, 255)', // blue
      'rgb(187, 0, 255)', // purple
      'rgb(255, 89, 177)' // pink
    ]
    element.querySelectorAll('input[type="button"]').forEach((btn, i) => {
      btn.style.backgroundColor = colors[i]
      btn.addEventListener('click', () => {
        e.ctx.strokeStyle = colors[i]
        e.ctx.fillStyle = colors[i]
      })
    })

    return element
  }
}
