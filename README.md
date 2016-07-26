# neato-lidar

[![Build Status](https://travis-ci.org/cgarnier/neato-lidar.svg?branch=master)](https://travis-ci.org/cgarnier/neato-lidar)

A lib to decode a salvaged neato lidar.


## Install

```bash
npm install --save neato-lidar
```

## Usage

```javascript
const SerialPort = require('serialport')
const LidarPacket = require('../lib/index.js').LidarPacket

const serial = new SerialPort('/dev/ttyS0', {
  baudrate: 115200,
  parser: SerialPort.parsers.byteDelimiter([0xfa])
})

serial.on('open', function (err) {
  console.log('serial is open', err)
})

serial.on('data', function (data) {
  data = new Uint8Array([0xFA].concat(data.slice(0, 21)))

  try {
    let lp = new LidarPacket(data)
    lp.measures
      .filter((m) => !m.invalid)
      .forEach((m) => console.log(m.index + '° -> ' + m.distance + 'mm'))
  } catch (e) {
    console.error(e)
  }
})
```

## Samples
  * [Read speed](https://github.com/cgarnier/neato-lidar/blob/feature/serial-tests/samples/speed.js)
  * [Read angles and distances](https://github.com/cgarnier/neato-lidar/blob/feature/serial-tests/samples/distances.js)
