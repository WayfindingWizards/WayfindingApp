//version 2
import { accelerometer, gravity, magnetometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { combineLatest } from "rxjs";
import { map } from 'rxjs/operators';

const interval = 500; // in milliseconds
let previousTimestamp = 0;
let initialAcceleration = { x: 0, y: 0, z: 0 }; //acceleration before sensor read
let acceleration = { x: 0, y: 0, z: 0 }; // current acceleration from sensor read
//let initialVelocity = { x: 0, y: 0, z: 0 }; //velocity before accounting for acceleration
let velocity = { x: 0, y: 0, z: 0 }; //current velocity
let speed = 0;
//let magnetometerReading = { X: 0, Y: 0, Z: 0, time: 0 };

setUpdateIntervalForType(SensorTypes.accelerometer, interval);
setUpdateIntervalForType(SensorTypes.gravity, interval);
//setUpdateIntervalForType(SensorTypes.magnetometer, interval);

const userAccelerationStream = combineLatest(accelerometer, gravity).pipe(
    map(([accelerometerValue, gravityValue]) => ({
        accelerometer: accelerometerValue,
        gravity: gravityValue,
    }))
);

const accelSubscription = userAccelerationStream.subscribe(event => {
    acceleration = {
        x: Math.trunc((event.accelerometer.x - event.gravity.x) * 10) / 10,  // keep 1 decimal place
        y: Math.trunc((event.accelerometer.y - event.gravity.y) * 10) / 10,  
        z: Math.trunc((event.accelerometer.z - event.gravity.z) * 10) / 10
    };

    if (previousTimestamp) {
        const timeInterval = (event.accelerometer.timestamp - previousTimestamp) / 1000; // Convert to seconds

        // Calculate velocity using time interval
        velocity = {
            // x: initialVelocity.x + acceleration.x * timeInterval, //initialVelocity.x + acceleration.x * timeInterval
            // y: initialVelocity.y + acceleration.y * timeInterval,
            // z: initialVelocity.z + acceleration.z * timeInterval, //acceleration (m/s/s) * time (s) = velocity (m/s)

            x: 0.5 * (initialAcceleration.x + acceleration.x) * timeInterval, //trapezoid rule used to estimate velocity
            y: 0.5 * (initialAcceleration.x + acceleration.x) * timeInterval, 
            z: 0.5 * (initialAcceleration.x + acceleration.x) * timeInterval, //acceleration (m/s/s) * time (s) = velocity (m/s)
            // was: initialVelocity.y + 0.5 * (initialAcceleration.x + acceleration.x) * timeInterval
        };

        initialAcceleration = { //set initialAcceleration for the next calculation
            x: acceleration.x,
            y: acceleration.y,
            z: acceleration.z,
        };
        //speed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z); //take away direction from velocity using pythagorean theorem (a^2 + b^2 = c^2)
        speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y + velocity.z * velocity.z); //3d pythagorean theorem (a^2 + b^2 + c^2 = d^2)
        speed = speed / 25; //speed was too fast in Unity (User GameObject position changed faster than the real user would)
        speed = Math.trunc(speed * 1000000) / 1000000, //make sure to avoid overflow errors in Unity

        console.log('Acceleration:', acceleration);
        console.log('Velocity:', velocity);
        console.log('Speed:', speed);

        //initialVelocity = velocity; //update initialVelocity for the next calculation
    }

    previousTimestamp = event.accelerometer.timestamp;
});

// const magnetSubscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>
//   magnetometerReading = { //set initialAcceleration for the next calculation
//     X: x,
//     Y: y,
//     Z: z,
//     time: timestamp,
//   }
// );

export function getAccelerometerData() {
    return acceleration;
};

export function getVelocityData() {
    return velocity;
};

export function getSpeedData() {
    return speed;
};

// export function getMagnetData() {
//     return magnetometerReading;
// };


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
