# self
Self Identity Management for CryptoID Logins.

No more intermediation: Identity owned by the user.

## How it works

> Nakamoto, as all mornings opens his favorite website, clicks the login button and something new happens, a QR code appears in the place where the email and password used to be.

>...Lets do the graphic first, then continue with the story.

<p align="center">
  <img src="/docs/img/self-login-process.jpg" width="700">
</p>


> Now the story

> ...

## How to Test

0. **Open server demo**

    Open the [server demo](https://selfdemo.herokuapp.com/) to get a QR code login or follow [these steps](server/README.md) to configure your own server.

    server demo url: https://selfdemo.herokuapp.com/

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

    Check your token in https://selfdemo.herokuapp.com/users

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
