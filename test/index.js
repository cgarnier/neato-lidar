const fs = require('fs')
const path = require('path')
const SerialPort = require('serialPort')

const LidarPacket = require('../lib/index.js').LidarPacket
const LidarMeasure = require('../lib/index.js').LidarMeasure

const serial = new SerialPort('/dev/ttyS0', {baudrate: 57600})

serial.on('open', () => {
  console.log('serial is open')
})

serial.on('data', (data) => {
  console.log('data: ', data)
})

seral

exit(0)
let rows = fs.readFileSync(path.join(__dirname, './serial-dump.log'), {encoding: 'UTF-8'})
  .split("\n")
  .slice(500, 600)
  .map( (r) => r.match(/.{1,2}/g) )
  .map( (r) => r ? r.map( (x) => x ? parseInt(x, 16) : nope) : [])
  .map( (r) => new Uint8Array(r))

let packets
  packets = rows
    .map( (r) => {

      try {
        return new LidarPacket(r)
      }
      catch (e) {
        console.log('Error')
        return null
      }
    })



console.log(packets.toString())
//console.log(new LidarMeasure (new Uint8Array([0x11, 0xef, 0x77, 0x38]) ))
