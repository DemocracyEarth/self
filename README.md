# self
Self Identity Management for CryptoID Logins

## How it works

- graphic

- Explanation

## How to Test

0. **Open server demo**

    Open the [server demo](https://bcidlogin.herokuapp.com/) to get a QR code login or follow [these steps](server/REAMDE.md) to configure your own server.

    server demo url: https://bcidlogin.herokuapp.com/

    Or use the demo server code to include this feature in your login process.

0. **Install the Mobile App**

    Download the APK from `apk/` or follow [these steps](mobileapp/README.md) to build your own application.

0. **Load the App & Scan**

    Open the app, in the **Identity tab**  complete your data: first name, last name, email.

    Then scan the server demo QR code with the **Scan Acces QR code** in the **Login tab**.

    You will get:
    * a callback URL: this is where the mobile app will send your user information.
    * an asociation id: this is the name to identify where you are trying to login.
    * a token: this is a unique random token to validate your attempt to login.
    * a **login button**

0. **Confirm Login**

    Once all the data from previous step is valid, you can proceed to login.

0. **Login Success**

    you will see a login success message in your mobile app and your user information in the server demo web page, which means that the server gets your data.

## Next Steps

### Add crypto key to validate user login
* `<Mobile>` add a single crypto-key (public key and private key).
* `<Mobile>`  send public key to the server
* `<Server>` process public key and encrypt mathematical operation to validate ownership. Send encrypted message to mobile and save mathematical result.
* `<Mobile>`  receive encrypted message, decrypted, process mathematical operation and send the response to the server
* `<Server>` validate mathematical result, send login-ok to mobile application and send login-ok to web client associated with QR code token.

### Add multiple keys to mobile user wallet
* add multiple crypto-keys with description and profile data associated.
