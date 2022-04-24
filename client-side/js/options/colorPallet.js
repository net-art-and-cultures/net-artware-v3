window.options.colorPallet = {
  name: 'color pallet',
  run: function (e) {
    const element = document.createElement('div')
    element.innerHTML = `
      <style>
        .pallet {
          display: block;
          grid-template-columns: repeat(1, 1fr);
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
        input:hover {
          border-color: grey;
        }
        #white {background-color: white;}
        #black {background-color: black;}
        #red {background-color: rgb(255, 0, 0);}
        #orange {background-color: rgb(255, 111, 0);}
        #yellow {background-color: rgb(255, 247, 0);}
        #green {background-color: rgb(53, 189, 22);}
        #cyan {background-color: rgb(0, 255, 212);}
        #blue {background-color: rgb(0, 145, 255);}
        #purple {background-color: rgb(187, 0, 255);}
        #pink {background-color: rgb(255, 89, 177);}
      </style>

      <div class="pallet">
        <input type="button" id="white">
        <input type="button" id="black">
        <input type="button" id="red">
        <input type="button" id="orange">
        <input type="button" id="yellow">
        <input type="button" id="green">
        <input type="button" id="cyan">
        <input type="button" id="blue">
        <input type="button" id="purple">
        <input type="button" id="pink">
      </div>
    `
    const white = element.querySelector('#white')
    white.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(255, 255, 255)'
      e.ctx.fillStyle = 'rgb(255, 255, 255)'
    })
    const black = element.querySelector('#black')
    black.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(0, 0, 0)'
      e.ctx.fillStyle = 'rgb(0, 0, 0)'
    })
    const red = element.querySelector('#red')
    red.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(255, 0, 0)'
      e.ctx.fillStyle = 'rgb(255, 0, 0)'
    })
    const orange = element.querySelector('#orange')
    orange.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(255, 111, 0)'
      e.ctx.fillStyle = 'rgb(255, 111, 0)'
    })
    const yellow = element.querySelector('#yellow')
    yellow.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(255, 247, 0)'
      e.ctx.fillStyle = 'rgb(255, 247, 0)'
    })
    const green = element.querySelector('#green')
    green.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(53, 189, 22)'
      e.ctx.fillStyle = 'rgb(53, 189, 22)'
    })
    const cyan = element.querySelector('#cyan')
    cyan.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(0, 255, 212)'
      e.ctx.fillStyle = 'rgb(0, 255, 212)'
    })
    const blue = element.querySelector('#blue')
    blue.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(0, 145, 255)'
      e.ctx.fillStyle = 'rgb(0, 145, 255)'
    })
    const purple = element.querySelector('#purple')
    purple.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(187, 0, 255)'
      e.ctx.fillStyle = 'rgb(187, 0, 255)'
    })
    const pink = element.querySelector('#pink')
    pink.addEventListener('click', () => {
      e.ctx.strokeStyle = 'rgb(255, 89, 177)'
      e.ctx.fillStyle = 'rgb(255, 89, 177)'
    })

    return element
  }
}
