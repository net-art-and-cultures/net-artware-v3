window.tools.spiralNoodle = {
  name: 'spiral Noodle',
  icon: '/images/spiralNoodle-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    prevMouse: { x: null, y: null },
    getPrevMouse: true
  },
  events: {
    mousedown: function (e) {
      e.state.mousePressed = true
      if (e.state.getPrevMouse === true) {
        e.state.getPrevMouse = false
        e.state.prevMouse = { x: e.mouse.x, y: e.mouse.y }
        console.log('potatoe')
      }
      console.log(e.state.getPrevMouse)
    },
    mouseup: function (e) {
      e.state.mousePressed = false
      e.state.prevMouse = { x: null, y: null }
      e.state.getPrevMouse = true
    },
    mousemove: function (e) {
      // if this tool is selected AND the mouse is pressed
      if (e.state.selected && e.state.mousePressed) {
        if (e.state.getPrevMouse === true) {
          e.state.getPrevMouse = false
          e.state.prevMouse = { x: e.mouse.x, y: e.mouse.y }
        }
        // finds the distance between mouse cords and the previous cords
        let d1 = Math.sqrt(
          e.mouse.x - e.state.prevMouse.x,
          e.mouse.y - e.state.prevMouse.y
        )
        if (isNaN(d1)) {
          d1 = Math.sqrt(
            e.state.prevMouse.x - e.mouse.x,
            e.state.prevMouse.y - e.mouse.y
          )
        }
        console.log(d1)
        if (d1 > 5) {
          console.log(e.state.getPrevMouse)
          // finds our first slope
          const slope = (e.mouse.x - e.state.prevMouse.x) / (e.mouse.y - e.state.prevMouse.y)
          // finds perpendicular slope
          const perpSlope = -1 / slope
          // finds our midpoint
          const midPoint = {
            x: (e.mouse.x + e.state.prevMouse.x) / 2,
            y: (e.mouse.y + e.state.prevMouse.y) / 2
          }
          // finds two points a distance away from mid point using
          // the perpendicular slope.
          const d2 = 3
          const perpPoint1 = {
            x: ((d2 / 2) * (1 / (Math.sqrt(1 + (perpSlope * perpSlope))))) + midPoint.x,
            y: ((d2 / 2) * (perpSlope / (Math.sqrt(1 + (perpSlope * perpSlope))))) + midPoint.y,
            subPoint1: {
              x: null,
              y: null
            },
            subPoint2: {
              x: null,
              y: null
            }
          }
          perpPoint1.subPoint1 = {
            x: ((d2 / 2) * (1 / (Math.sqrt(1 + (slope * slope))))) + perpPoint1.x,
            y: ((d2 / 2) * (slope / (Math.sqrt(1 + (slope * slope))))) + perpPoint1.y
          }
          perpPoint1.subPoint2 = {
            x: ((-d2 / 2) * (1 / (Math.sqrt(1 + (slope * slope))))) + perpPoint1.x,
            y: ((-d2 / 2) * (slope / (Math.sqrt(1 + (slope * slope))))) + perpPoint1.y
          }
          const perpPoint2 = {
            x: ((-d2 / 2) * (1 / (Math.sqrt(1 + (perpSlope * perpSlope))))) + midPoint.x,
            y: ((-d2 / 2) * (perpSlope / (Math.sqrt(1 + (perpSlope * perpSlope))))) + midPoint.y,
            subPoint1: {
              x: null,
              y: null
            },
            subPoint2: {
              x: null,
              y: null
            }
          }
          perpPoint2.subPoint1 = {
            x: ((d2 / 2) * (1 / (Math.sqrt(1 + (slope * slope))))) + perpPoint2.x,
            y: ((d2 / 2) * (slope / (Math.sqrt(1 + (slope * slope))))) + perpPoint2.y
          }
          perpPoint2.subPoint2 = {
            x: ((-d2 / 2) * (1 / (Math.sqrt(1 + (slope * slope))))) + perpPoint2.x,
            y: ((-d2 / 2) * (slope / (Math.sqrt(1 + (slope * slope))))) + perpPoint2.y
          }
          console.log(e.state.prevMouse,
            `Current mouse = {${e.mouse.x}, ${e.mouse.y}}`,
            midPoint,
            perpPoint1,
            perpPoint2
          )
          e.state.getPrevMouse = true
        }
        // draw a line
        // e.ctx.beginPath()
        // e.ctx.moveTo(e.mouse.x, e.mouse.y)
        // e.ctx.lineTo(px, py)
        // e.ctx.closePath()
        // e.ctx.stroke()
        // update prevMouse coordinates
        // e.state.prevMouse = { x: e.mouse.x, y: e.mouse.y }
      }
    }
  }
}
