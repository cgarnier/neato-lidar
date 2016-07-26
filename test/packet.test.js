const chai = require('chai')
const assert = chai.assert

const LidarPacket = require('../lib/LidarPacket')
const LidarMeasure = require('../lib/LidarMeasure')

var sample = new Uint8Array([
  0xFA, // fanion
  0xB1, // index
  0x6B, 0x4C, // speed
  0xD8, 0x40, 0x60, 0x00,  // measure 1
  0xD1, 0x00, 0x0B, 0x01,  // measure 2
  0xCC, 0x00, 0xD4, 0x02,  // measure 3
  0xC8, 0x00, 0x77, 0x02,  // measure 4
  0x29, 0x27 // CRC
])
let index = 17;
let measuresIndexes = [index * 4, index * 4 + 1, index * 4 + 2, index * 4 + 3]
let speed = 305.671875

describe('LidarPacket exceptions', () => {
  it('should raise TypeError when data is not a Uint8Array', () => {
    assert.throws(() => new LidarPacket('0xdfdfdf'), TypeError)
  })
  it('should raise RangeError when data is not a 22 length Uint8Array', () => {
    assert.throws(() => new LidarPacket([0xfa, 0xaa]), TypeError)
  })
  it('should raise an Error when it s corrupted (CRC missmatch)', () => {
    let corrupted = sample.slice()
    corrupted[21] = 0xAA
    assert.throws(() => new LidarPacket(corrupted), Error)
  })
})

describe('LidarPacket decode', () => {
  let lp
  before(() => {
    lp = new LidarPacket(sample)
  })

  it('should decode the right index', () => {
    assert.equal(lp.index, index)
  })

  it('should decode the right speed', () => {
    assert.equal(lp.speed, speed)
  })

  it('should decode the right indexes for its measures', () => {
    [0, 1, 2, 3].forEach((i) => assert.equal(lp.measures[i].index, measuresIndexes[i]))
  })

})
