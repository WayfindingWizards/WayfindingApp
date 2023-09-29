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
2. `npm -i`
3. ```npm install react-native node @azesmway/react-native-unity```
4. Change into the `android` directory
5. Add a file called `local.properties` inside the `android` folder and add this line:

    ``` sdk.dir = path to sdk ```

    > On Windows, if you installed Android Studio the path to the SDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk`. Use double backslashes to separate path components in the `local.properties` file, e.g. `sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk`

6. Find the file called `build.gradle` inside the `android` folder and make sure this line shows the correct ndk version (download from android studio):
   
    ```ndkVersion = "21.3.6528147"```

7. Go to `C:\Users\<your username>\Documents\GitHub\WayfindingApp\android\settings.gradle` and add the following code to file (if not present):
   
    ```include ':app', ':react-native-unity-view', ':unityLibrary'```
	```project(':unityLibrary').projectDir = new File('../UnityExportLib/unityLibrary')```

8. Go to `C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\unityLibrary\src\main` and delete the code inside of the `<intent-filter>` and the `<intent-filter>` (if it is there):

    ```</intent-filter> ... </intent-filter>```

9. Go to `C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\unityLibrary\build.gradle` and ensure that the following is present:
    
    ```ndkVersion = "21.3.6528147"```
    ``` ```
	>```flatDir {```
    >```    dirs "${project(':unityLibrary').projectDir}/libs"```
    >```}```
    
10. Go to `C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\local.properties` and make sure the path to the sdk and ndk lead to those installed by android studio:

    ``` sdk.dir = path to sdk ```

    >On Windows, if you installed Android Studio the path to the SDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk`. Use double backslashes to separate path components in the `local.properties` file, e.g. `sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk`

    ``` ndk.dir = path to ndk ```    

    >On Windows, if you installed Android Studio the path to the NDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk\ndk\ndk version`. Use double backslashes to separate path components in the `local.properties` file, e.g. `ndk.dir = C://Users//student//AppData//Local//Android//Sdk//ndk//21.3.6528147`

11. Go to `C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\unityLibrary\symbols` and unzip `arm64-v8a`,`armeabi-v7a`,`x86`, and `x86_64` to the symbols folder.
    
    > These files were too large for GitHub to accept normally

12. While still in the `android` directory: `gradlew.bat clean`
13. `gradlew.bat assembleDebug`

## Usage

1. Switch to the root of the project in a command prompt.
2. `npx react-native start`
3. Press `A` to launch on Android. 

If using a device emulator, start the emulator manually first.
