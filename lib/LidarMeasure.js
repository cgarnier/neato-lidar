
'use strict'

class LidarMeasure {
  constructor (data, index = 0) {

    if (!(data instanceof Uint8Array))
      throw new TypeError('data should be a Uint8Array')

    if (data.length !== 4)
      throw new RangeError('Expeting 4 bytes')

    this.data = data
    this.index = index
    this.distance = 0
    this.invalidFlag = false
    this.warningFlag = false
    this.signalStrength = 0
    this.errorCode = null

    this.parse(data)
  }

  parse () {
    this.distance = this.parseDistance()
    this.invalid = this.parseInvalidFlag()
    this.warning = this.parseWarningFlag()
    this.signalStrength = this.parseSignalStrength()
    this.errorCode = this.parseErrorCode()
  }

  toString () {
    return [
      '\n\tLidarMeasure[', '\n',
      '\t\tindex: ', this.index, ', \n',
      '\t\tdistance: ', this.distance, ', \n',
      '\t\tinvalidFlag: ', this.invalidFlag, ', \n',
      '\t\twarningFlag: ', this.warningFlag, ', \n',
      '\t\tsignalStrength: ', this.signalStrength, ', \n',
      ']'
    ].join('')
  }

  parseErrorCode () {
    /* When invalid flag is set, error code is byte 0 */
    if (!this.parseInvalidFlag()) return null
    return this.data[0]
  }

  parseInvalidFlag () {
    return this.data[1] >> 7 === 1
  }

  parseWarningFlag () {
    return ((this.data[1] & 0x40) >> 6) === 1
  }

  parseDistance () {
    return ((this.data[1] & 0x3F) << 8) | this.data[0]
  }

  parseSignalStrength () {
    return (this.data[3] << 8) | this.data[2]
  }
}

module.exports = LidarMeasure
