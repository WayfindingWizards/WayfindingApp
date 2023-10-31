//version 2
import { accelerometer, gravity, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { combineLatest } from "rxjs";
import { map } from 'rxjs/operators';

const interval = 500;
let previousTimestamp = 0;
let acceleration = { x: 0, y: 0, z: 0 }; // current acceleration from sensor read
let initialVelocity = { x: 0, y: 0, z: 0 }; //velocity before accounting for acceleration
let velocity = { x: 0, y: 0, z: 0 }; //current velocity

setUpdateIntervalForType(SensorTypes.accelerometer, interval);
setUpdateIntervalForType(SensorTypes.gravity, interval);

const userAccelerationStream = combineLatest(accelerometer, gravity).pipe(
    map(([accelerometerValue, gravityValue]) => ({
        accelerometer: accelerometerValue,
        gravity: gravityValue,
    }))
);

const subscription = userAccelerationStream.subscribe(event => {
    acceleration = {
        x: event.accelerometer.x - event.gravity.x,
        y: event.accelerometer.y - event.gravity.y,
        z: event.accelerometer.z - event.gravity.z,
    };

    if (previousTimestamp) {
        const timeInterval = (event.accelerometer.timestamp - previousTimestamp) / 1000; // Convert to seconds

        // Calculate velocity using time interval
        velocity = {
        x: initialVelocity.x + acceleration.x * timeInterval, //initialVelocity.x + acceleration.x * timeInterval
        y: initialVelocity.y + acceleration.y * timeInterval,
        z: initialVelocity.z + acceleration.z * timeInterval, //acceleration (m/s/s) * time (s) = velocity (m/s)
        };

        // console.log('Acceleration:', acceleration);
        // console.log('Velocity:', velocity);

        initialVelocity = velocity; //update initialVelocity for the next calculation
    }

    previousTimestamp = event.accelerometer.timestamp;
});

export function getAccelerometerData() {
    return acceleration;
};

export function getVelocityData() {
    return velocity;
};

// version 1
// import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
// setUpdateIntervalForType(SensorTypes.accelerometer, 250);
// setUpdateIntervalForType(SensorTypes.gyroscope, 250);

// const accel = {
//     x: 0,
//     y: 0,
//     z: 0,
//     timestamp: 0,
//   };

// const gyro = {
//     x: 0,
//     y: 0,
//     z: 0,
//     timestamp: 0,
//   };


// const updateAccelerometerData = accelerometer.subscribe(({ x, y, z, timestamp }) =>{
//     accel.x = x;
//     accel.y = y;
//     accel.z = z;
//     accel.timestamp = timestamp;

//     console.log("accelerometer:", "x:", x, "y:", y, "z:", z, "timestamp:", timestamp);
// });

// const updateGyroscopeData = gyroscope.subscribe(({ x, y, z, timestamp }) =>{
//     gyro.x = x;
//     gyro.y = y;
//     gyro.z = z;
//     gyro.timestamp = timestamp;

//     console.log("gyroscope:", "x:", x, "y:", y, "z:", z, "timestamp:", timestamp);
// });

// export function getAccelerometerData() {
//     return accel;
// };

// export function getGyroscopeData() {
//     return gyro;
// };
