# WayfindingApp

## Overview

The Wayfinder App is a mobile application to assist students, faculty, and visitors in navigating MNSU's campus through an indoor positioning system supported by BLE Beacons

## Prerequisites 

* Unity version 2021.3.22f1
* React Native
* Android Studio or Xcode (depending on what OS you're working with)
* Node.js

## Android Installation
1. Clone the WayfindingApp and UnityModel repos into the directory of your choice: 
	- https://github.com/WayfindingWizards/WayfindingApp.git 
	- https://github.com/WayfindingWizards/UnityModel.git 

2. open a command line at the root of the WayfindingApp project

3. run the command "npm i" to see if npm is good and up to date: 
	- result should be: ```found 0 vulnerabilities``` and will provide you a notice if there are updates to any npm packages. 

4. Install React Native Unity with the following command:
	- ```"npm install react-native node @azesmway/react-native-unity"``` 

5. Install React Native Sensors with the following command: 
   	- ```npm install react-native-sensors --save``` 

6. Change into the 'android' directory found in the WayfindingApp folder 
	- ```cd C:\Users\<username>\Documents\GitHub\WayfindingApp\android``` 

7. Create a file called 'local.properties' inside the android folder

8. open local.properties in your IDE of choice and add the following: 
	- sdk.dir = *path to sdk* 
	- On Windows, if you installed Android Studio the path to the SDK is usually C:\Users\<your username>\AppData\Local\Android\Sdk. Use double backslashes to 	  separate path components in the local.properties file, e.g. `sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk` 

9. Go to C:\Users\<username>\Documents\GitHub\WayfindingApp\android and find the file called build.gradle inside the android folder and make sure this line shows the correct ndk version(download from android studio):  
	- ndkVersion = "21.3.6528147" 
	- *To download the NDK, open Android Studio app. Open the ‘More Actions’ dropdown menu to select ‘SDK Manager’. In the ‘SDK Tools’ tab scroll down until 	  you see ‘NDK (side by side)’ then select the NDK version 21.3.6528147. Click apply in the bottom right corner click the Apply button and wait for the 	  ndk to download. 

10. Go to C:\Users\<username>\Documents\GitHub\GitHub\WayfindingApp\android, find the settings.gradle inside the android folder, and replace the line 'include ':app' ' with: 
	- include ':app', ':react-native-unity-view', ':unityLibrary'

11. Go to C:\Users\<username>\Documents\GitHub\WayfindingApp\unity\builds\android\unityLibrary\src\main and find the AndroidManifest.xml file and delete the code inside of the "<intent-filter>" and the <intent-filter>:
	- </intent-filter> ... </intent-filter> 

12. Go to C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\unityLibrary and find build.gradle file, once there ensure that the following is present: 
	- ndkVersion = "21.3.6528147" 

13. Go to C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\local.properties and make sure the path to the sdk and ndk lead to those installed by android studio: 
	- sdk.dir = path to sdk
	- ndk.dir = path to ndk
	- On Windows, if you installed Android Studio the path to the SDK is usually C:\Users\<your username>\AppData\Local\Android\Sdk. Use double backslashes to 	  separate path components in the local.properties file, e.g. sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk 
	- On Windows, if you installed Android Studio the path to the NDK is usually C:\Users\<your username>\AppData\Local\Android\Sdk\ndk\ndk version. Use 
	  double backslashes to separate path components in the local.properties file, e.g. ndk.dir = 	C:\\Users\\student\\AppData\\Local\\Android\\Sdk\\ndk\\21.3.6528147 

14. Go to C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\unityLibrary\symbols and unzip 'arm64-v8a', 'armeabi-v7a,x86', and 'x86_64' inside the symbols folder (These are a part of the Unity model and were too large for GitHub to accept normally)

15. In your command prompt, change into the WayfindingApp\android directory and run the following command:
	- ```gradlew.bat clean``` 
 
16. In the same Wayfinding\android directory, run the command:
	- ```gradlew.bat assembleDebug```

## Exporting Unity Model to Application (Fresh Export)

1. Go to `unity/builds/android` in the file manager and delete the previous files
2. In unity, go to `Edit` > `prefrences`
3. Click `External tools` and scroll down to `NDK` and `SDK`
4. Uncheck the box that says it will use the NDK and SDK installed by Unity. Then click browse and set path to the sdk and ndk lead to those installed by android studio:
    ``` sdk.dir = path to sdk ```

    >On Windows, if you installed Android Studio the path to the SDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk`. Use double backslashes to separate path components in the `local.properties` file, e.g. `sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk`

    ``` ndk.dir = path to ndk ```    

    >On Windows, if you installed Android Studio the path to the NDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk\ndk\ndk version`. Use double backslashes to separate path components in the `local.properties` file, e.g. `ndk.dir = C://Users//student//AppData//Local//Android//Sdk//ndk//21.3.6528147`
5. In unity, go to `File` > `build settings`
6. Under `Platform`, click `Android`
7. Make sure the `Export Project` box is checked
8. Click on `Player settings`
9. In `Other Settings`, scroll down to `Configuration`
10. Make sure the following target architectures are marked: `ARMv7`,`ARM64`,`x86 (Chrome OS)`, `x86-64 (Chrome OS)`
11. Make sure the changes were applied, then go back to the `build settings` window
12. Click the `Export` Button
13. Go to `unity/builds/android` and export
14. Go to `...\WayfindingApp\unity\builds\android\unityLibrary\src\main\AndroidManifest.xml` and delete the intent filters `</intent-filter> ... </intent-filter>`
    > removing the intent filter will prevent the Unity app from being a separate entry point on the device. If you leave the intent filter, both the React Native app and the Unity app might appear as separate apps on the device screen.
15. Go to `...\WayfindingApp\unity\builds\android\unityLibrary\build.gradle` and add the following:
    ```ndkVersion = "21.3.6528147" ```
16. Go to `C:\Users\<your username>\Documents\GitHub\WayfindingApp\unity\builds\android\local.properties` and make sure the path to the sdk and ndk lead to those installed by android studio: (this step should have been fixed by #4)
    ``` sdk.dir = path to sdk ```

    >On Windows, if you installed Android Studio the path to the SDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk`. Use double backslashes to separate path components in the `local.properties` file, e.g. `sdk.dir = C:\\users\\student\\AppData\\Local\\Android\\Sdk`

    ``` ndk.dir = path to ndk ```    

    >On Windows, if you installed Android Studio the path to the NDK is usually `C:\Users\<your username>\AppData\Local\Android\Sdk\ndk\ndk version`. Use double backslashes to separate path components in the `local.properties` file, e.g. `ndk.dir = C://Users//student//AppData//Local//Android//Sdk//ndk//21.3.6528147`
17. Open the command prompt and navigate to the `android` folder of the WayfindingApp. Use something like:
    ```cd  C:\Users\<student>\GitHub\WayfindingApp\android```
18. While still in the `android` directory: `gradlew.bat clean`
19. Then, `gradlew.bat assembleDebug`

## After Making Changes to the Unity Model
1. In unity, go to `File` > `build settings`
2. Under `Platform`, click `Android`
3. Make sure the `Export Project` box is checked
4. Click the `Export` Button
5. Go to `unity/builds/android` and export
6. Open the command prompt and navigate to the `android` folder of the WayfindingApp.
    Use something like: ```cd  C:\Users\<student>\GitHub\WayfindingApp\android```
7. Then, `gradlew.bat assembleDebug`
8. When this finishes, Switch to the root of the project in a command prompt with `cd ..`
9. Then, `npx react-native start`
10. Press `A` to launch on Android. 

## iOS Installation
1. Install Xcode from the App Store 

2. Clone the WayfindingApp and UnityModel repos into the directory of your choice: 
	- https://github.com/WayfindingWizards/WayfindingApp.git 
	- https://github.com/WayfindingWizards/UnityModel.git 

3. Install Homebrew by running this line in a terminal: 
	- ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"```

4. Where it says, “Next Steps:”, copy, paste, and run those 2 lines in the same terminal 

5. In the same terminal, install node and watchman by running these commands: 
	- ```Brew install node```
	- ```Brew install watchman```

6. Open Xcode and navigate to Xcode > Settings > Locations, and make sure the ‘Command Line Tools’ option has the latest version of Xcode selected 

7. Install CocoaPods on your computer by running these commands in the terminal: 
	- ```Echo ‘eval $(/opt/homebrew/bin/brew shellenv)”’ >>/Users/”YOUR USER FOLDER”/.zprofile```
	- *note: change “YOUR USER FOLDER” to your username, also note that this command won’t show anything in the terminal 
	- Restart your terminal after the previous command before running the next 2 
	- ```Eval “$(/opt/homebrew/bin/brew shellenv)”``` 
	- ```Brew install cocoapods```

9. Install CocoaPods to the WayfindingApp’s iOS folder by running this command in a terminal inside the iOS folder: 
	- ```Pod install```

10. Go to the WayfindingApp project directory, open a terminal, and run the command: 
	- ```Npm install```
	- In order to open the project in Xcode, open WayFindingApp > ios > AwesomeProject.xcworkspace  
	- You will need to sign the project using your Apple ID for it work on iOS devices:
 		- In Xcode, under targets, select ‘AwesomeProject’, navigate to the ‘Signing & Capabilities’ tab. Under ‘Signing’ select the 'Team Identifier’ 			  dropdown menu and click ‘Add an account’.

11. To run the app at any time, go to the WayfindingApp/iOS project directory, open a terminal, and run the command: 
- ```Npm run ios``` 

