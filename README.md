# WayfindingApp

## Overview

Wayfinder is a mobile application to assist students, faculty, and visitors in navigating MNSU's campus through an indoor positioning system supported by BLE Beacons

## Prerequisites 

* Unity version 2021.3.22f1
* React Native
* Android Studio
* Node

## Installation

1. Open the command line at the root of the project
1. `npm -i`
1. ```npm install react-native node @azesmway/react-native-unity```
2. Change into the `android` directory
3. Add a file called `local.properties` inside the `android` folder and add this line:

    ``` sdk.dir = path to sdk ```

    > On Windows, if you installed Android Studio the path to the SDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk`. Use double backslashes to separate path components in the `local.properties` file, e.g. `sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk`)


1. While still in the `android` directory: `gradlew.bat clean`
1. `gradlew.bat assembleDebug`

## Usage

1. Switch to the root of the project in a command prompt.
1. `npx react-native start`
1. Press `A` to launch on Android. 

If using a device emulator, start the emulator manually first.
