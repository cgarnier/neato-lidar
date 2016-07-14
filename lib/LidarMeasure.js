
class LidarMeasure {
  constructor (data, index = 0) {
    if (data.length !== 4)
      throw {error: 'Expecting 4 length data'}

    this.index = index
    this.distance = 0
    this.invalidFlag = false
    this.warningFlag = false
    this.signalStrength = 0
    this.errorCode = null

    this.parse(data)
  }

  parse (data) {
    this.index = this.parseIndex(data)
    this.distance = this.parseDistance(data)
    this.invalidFlag = this.parseInvalidFlag(data)
    this.warningFlag = this.parseWarningFlag(data)
    this.signalStrength = this.parseSignalStrength(data)
    this.errorCode = this.parseErrorCode(data)
  }

  toString () {
    return [
      'LidarMeasure[',
      '\tindex: ', this.index, ', \n'
      '\tdistance: ', this.distance, ', \n'
      '\tinvalidFlag: ', this.invalidFlag, ', \n'
      '\twarningFlag: ', this.warningFlag, ', \n'
      '\tsignalStrength: ', this.signalStrength, ', \n'
      ']'
    ]
  }

  parseErrorCode (data) {
    /* When invalid flag is set, error code is byte 0 */
    if (!parseInvalidFlag()) return null
    return data[0]
  }

  parseInvalidFlag (data) {
    
    return data[1] >> 7 === 1
  }

  parseWarningFlag (data) {
    return ((data[1] & 0x40) >> 6) === 1
  }

  parseDistance (data) {
    return ((data[1] & 0x3F) << 8) + data[0]
  }

  parseSignalStrength (data) {
    return (data[3] << 8) + data[2]
  }
}

module.exports = LidarMeasure
