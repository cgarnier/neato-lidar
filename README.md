# neato-lidar

A lib to decode a salvaged neato lidar.


## Install

```
npm install --save neato-lidar
```

## Usage

```
const LidarPacket = require('neato-lidar').LidarPacket
const LidarMeasure = require('neato-lidar').LidarPacket

let bytes = /* A 22 length Uint8Array coming from serial */

let packet = new LidarPacket(bytes)
```
