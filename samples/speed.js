const SerialPort = require('serialport')
const LidarPacket = require('../lib/index.js').LidarPacket

const serial = new SerialPort('/dev/ttyS0', {
  baudrate: 115200,
  parser: SerialPort.parsers.byteDelimiter([0xfa])
})

serial.on('open', () => {
  console.log('serial is open')
})

let timer = new Date().getTime() - 2000
serial.on('data', (data) => {
  data = new Uint8Array([0xFA].concat(data.slice(0, 21)))
  if (timer + 2000 < new Date().getTime()) {
    let lp
    try {
      lp = new LidarPacket(data)
      timer = new Date().getTime()
      console.log(lp.speed + 'rpm')
    } catch (e) {
      console.log(e)
    }
  }
})
