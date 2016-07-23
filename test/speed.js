const fs = require('fs')
const path = require('path')
const SerialPort = require('serialport')

const LidarPacket = require('../lib/index.js').LidarPacket
const LidarMeasure = require('../lib/index.js').LidarMeasure

const serial = new SerialPort('/dev/ttyS0', {
  baudrate: 115200,
  parser: SerialPort.parsers.byteDelimiter([0xfa])
  //parser: SerialPort.parsers.byteLength(22)
})

serial.on('open', function (err) {
  console.log('serial is open', err)
})

serial.on('data', function (data) {

  data = [0xFA].concat(data.slice(0, 21))
  console.log('data: ', data
    .map( (x) => x.toString(16))
    .join(':')
  )
})
