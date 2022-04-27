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
        const a = e.mouse.x - e.state.prevMouse.x
        const b = e.mouse.y - e.state.prevMouse.y
        let d1 = Math.sqrt((a * a) + (b * b))
        console.log(d1)
        if (d1 > 15) {
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
          const d2 = 7
          const dx = (d2 / Math.sqrt(1 + (slope * slope)))
          const dy = slope * dx
          const pdx = (d2 / Math.sqrt(1 + (perpSlope * perpSlope)))
          const pdy = perpSlope * pdx
          const perpPoint1 = {
            x: pdx + midPoint.x,
            y: pdy + midPoint.y,
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
            x: dx + perpPoint1.x,
            y: dy + perpPoint1.y
          }
          perpPoint1.subPoint2 = {
            x: -dx + perpPoint1.x,
            y: -dy + perpPoint1.y
          }
          const perpPoint2 = {
            x: -pdx + midPoint.x,
            y: -pdy + midPoint.y,
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
            x: dx + perpPoint2.x,
            y: dy + perpPoint2.y
          }
          perpPoint2.subPoint2 = {
            x: -dx + perpPoint2.x,
            y: -dy + perpPoint2.y
          }
          console.log(e.state.prevMouse,
            `Current mouse = {${e.mouse.x}, ${e.mouse.y}}`,
            slope,
            perpSlope,
            midPoint,
            perpPoint1,
            perpPoint2
          )
          // now that we have all of the points, we can start drawing curves
          // the spine
          e.ctx.strokeStyle = 'rgb(227, 190, 109)'
          e.ctx.beginPath()
          e.ctx.moveTo(e.state.prevMouse.x, e.state.prevMouse.y)
          e.ctx.lineTo(e.mouse.x, e.mouse.y)
          e.ctx.stroke()
          // the spiral
          e.ctx.strokeStyle = 'rgb(232, 221, 88)'
          e.ctx.beginPath()
          e.ctx.moveTo(perpPoint1.subPoint2.x, perpPoint1.subPoint2.y)
          e.ctx.bezierCurveTo(
            perpPoint1.subPoint2.x, perpPoint1.subPoint2.y,
            perpPoint1.x, perpPoint1.y,
            midPoint.x, midPoint.y
          )
          e.ctx.bezierCurveTo(
            midPoint.x, midPoint.y,
            perpPoint2.x, perpPoint2.y,
            perpPoint2.subPoint1.x, perpPoint2.subPoint1.y
          )
          e.ctx.stroke()
          // sets current mouse cords as previous mouse cords.
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
