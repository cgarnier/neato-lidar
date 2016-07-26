const chai = require('chai')
const assert = chai.assert

const LidarMeasure = require('../lib/LidarMeasure')

let warningSample = new Uint8Array([0xD8, 0x40, 0x60, 0x00])
let invalidSample = new Uint8Array([0xD8, 0x88, 0x60, 0x00])
let sample = new Uint8Array([0xD8, 0x24, 0x60, 0x00])

let signalStrength = 96
let distance = 9432

describe('LidarMeasure flags', () => {
  it('should decode a warning measure when bit 2 of byte 2 is set', () => {
    let m = new LidarMeasure(warningSample)
    assert.isTrue(m.warning)
  })
  it('should decode an invalid measure when bit 1 of byte 2 is set', () => {
    let m = new LidarMeasure(invalidSample)
    assert.isTrue(m.invalid)
  })
})

describe('LidarMeasure decode', () => {
  let lm
  before(() => {
    lm = new LidarMeasure(sample)
  })

  it('should decode the right distance', () => {
    assert.equal(lm.distance, distance)
  })

  it('should decode the right signal strength', () => {
    assert.equal(lm.signalStrength, signalStrength)
  })
})
