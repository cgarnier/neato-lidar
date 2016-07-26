'use strict'

const LidarMeasure = require('./LidarMeasure')

class LidarPacket {
  constructor (data) {
    if ( !(data instanceof Uint8Array))
      throw new TypeError('data must be a Uint8Array')

    if( data.length !== 22 )
      throw new RangeError('Expecting data length equal to 22')

    this.data = data

    if (!this.checksumValid()) {
      throw new Error('data is corrupted (CRC)')
    }
    this.index = 0
    this.speed = 0
    this.measures = []

    this.parseSpeed ()
    this.parseIndex ()
    this.parseMeasures ()
  }

  checksumValid () {
    let chk32 = Array(10).fill()
      .map((_, t) => this.data[2 * t] + (this.data[ 2 * t+1] << 8))
      .reduce((a, b) => (a << 1) + b, 0)

    let checksum = ((chk32 & 0x7FFF) + ( chk32 >> 15 )) & 0x7FFF
    let chk = (this.data[21] << 8) | this.data[20]

    return checksum === chk
  }
  parseSpeed () {
    this.speed = ((this.data[3] << 8 ) | this.data[2]) / 64.0
  }

  parseIndex () {
    this.index = this.data[1] - 0xA0
  }

  parseMeasures () {
    this.measures = [0, 1, 2, 3]
      .map( (i) => new LidarMeasure(
        this.data.slice(4 + i * 4, 8 + i * 4),
        this.index * 4 + i
      ))
  }

  toString () {
    return [
      'LidarPacket[',
      '\tindex: ', this.index, ', \n',
      '\tspeed: ', this.speed, ', \n',
      '\tmeasures: ', this.measures, ', \n',
      ']'
    ].join('')
  }
}

module.exports = LidarPacket
