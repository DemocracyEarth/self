# self Mobile
This mobile application was made with [ionicframework v1](https://ionicframework.com)

<p align="center">
  <img src="/docs/img/self-login-process.gif" width="400">
</p>

## Build my own APK

To build your own app distribution, follow these steps:

### Setup
check [ionic v1 getting started](https://ionicframework.com/docs/v1/getting-started/)

0. **Install Framework**

    Install [Node.js 6.x LTS](http://nodejs.org/)

    Install cordova and ionic

    ```bash
    $ npm install -g cordova ionic
    ```
    Follow the [Android](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) and [iOS](http://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html) platform guides to install required tools for iOS and Android development.

0. **Start a project**

    Create an Ionic project using tabs template

    ```bash
    $ ionic start myApp tabs
    ```    

0. **Copy self project and add plugin**

    replace `myApp/www` with `mobile/www` content and type:

    ```bash
    $ cd myApp
    $ cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner.git
    ```    

0. **Run it**

    While in myApp directory, for android type:

    ```bash
    $ ionic platform add android
    $ ionic build android
    ```

    For iOS type:
    ```bash
    $ ionic platform add ios
    $ ionic build ios
    ```

    See log information to find your compiled apk, should be something like `/platforms/android/build/outputs/apk/android-debug.apk`

### Known Issues

#### Problem with Android 6.0.1
if you have installed the latest java version, you will change:

in `platforms/android/AndroidManifest.xml` current version to `<uses-sdk android:minSdkVersion="14" android:targetSdkVersion="22" />`

in `platforms/android/prodject.properties` current version to `target=android-22`

check [phonegap issue 139](https://github.com/phonegap/phonegap-plugin-barcodescanner/issues/139)

#### Ionic build error
if ionic doesn't work, try with cordova: `cordova build android`
