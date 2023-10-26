import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
setUpdateIntervalForType(SensorTypes.accelerometer, 250);
setUpdateIntervalForType(SensorTypes.gyroscope, 250);

const accel = {
    x: 0,
    y: 0,
    z: 0,
    timestamp: 0,
  };

const gyro = {
    x: 0,
    y: 0,
    z: 0,
    timestamp: 0,
  };


const updateAccelerometerData = accelerometer.subscribe(({ x, y, z, timestamp }) =>{
    accel.x = x;
    accel.y = y;
    accel.z = z;
    accel.timestamp = timestamp;

    console.log("accelerometer:", "x:", x, "y:", y, "z:", z, "timestamp:", timestamp);
});

const updateGyroscopeData = gyroscope.subscribe(({ x, y, z, timestamp }) =>{
    gyro.x = x;
    gyro.y = y;
    gyro.z = z;
    gyro.timestamp = timestamp;

    console.log("gyroscope:", "x:", x, "y:", y, "z:", z, "timestamp:", timestamp);
});

export function getAccelerometerData() {
    return accel;
};

export function getGyroscopeData() {
    return gyro;
};
