<p align="center">
<img src="mobileapp/resources/icon.png" width="200" title="self">
</p>

# self
Self Identity Management for CryptoID Logins.

The login process is centralized, you need an email or a third party identity validation that tracks your activities, a password that is stored in a place that you can’t control.
We changed that, now you keep your identity in your mobile phone, you don’t need email, password, obligatory fields, neither a third party validator.

No more intermediation: Identity owned by the user.

We hack the login process: no password, no email, no tracking, no “others”.

We keep the identity 100% in the hands of the user. We took the decentralization approach to create a login protocol and Cryptography (SHA-256 hash function) to ensure security and identity. We allow users to show the information that they want, when they want and to they want.

We believe that the first step to Personal Sovereignty, is own our Personal Identity,  so no single corporation (like  Facebook) or government (think Estonia) owns your credentials. Only you are in control.

The steps to login are: **scan, check and login**.

The way to implement this in your own site is with our simple **Self-Identity Access Protocol**

**Release:**

`Zarathustra`
> Become who you are!

> And once you are awake, you shall remain awake eternally.


## How it works (scan, check, login)

> Nakamoto, as all mornings opens his favorite website, clicks the login button and something new happens, a QR code appears in the place where the email and password used to be.

>...Lets do the graphic first, then continue with the story.

<p align="center">
  <img src="/docs/img/self-process-basic.jpg" width="850">
</p>


> Now the story

> ...

## How to Test

0. **Open server demo**

    Open the [server demo](https://selfdemo.herokuapp.com/) to get a QR code login or follow [these steps](server/README.md) to configure your own server.

    server demo url: https://selfdemo.herokuapp.com/

    > You can use the demo server code to include this feature in your web page login process.

0. **Install the Mobile App**

    Download the APK from `apk/` or follow [these steps](mobileapp/README.md) to build your own application.

0. **Load the App & Scan**

    In your desktop computer, go to https://walletgenerator.net/ or https://www.bitaddress.org and generate your Bitcoin Address and Private Key.

    Open the app, click the **Keys tab**, scan the previous Bitcoin Address as Public key, and the Private Key.

    In the **Identity tab**  complete your data: first name, last name, email.

    Then scan the server demo QR code with the **Scan Acces QR code** button in the **Login tab**.

    You will get:
    * a callback URL: this is where the mobile app will send your user information.
    * an association id: this is the name to identify where you are trying to login.
    * a token: this is a unique random token to validate your attempt to login.
    * a **login button**

0. **Confirm Login**

    Check your token in https://selfdemo.herokuapp.com/users

    Once all the data from previous step is valid, you can proceed to login.

0. **Login Success**

    you will see a login success message in your mobile app and your user information in the server demo web page, which means that the server gets your data.

## Next Steps

### Change Public key encrypt/decrypt
* Replace public key encryption with signature or hashing, the idea is only private key owner related with public key can decrypt the message.

### Add login list
* add a a list in the login tab that shows all the login attempts and the results. Track date and time.

### Add multiple keys to mobile user wallet
* add multiple crypto-keys with description and profile data associated.
* increase data in the profile section.
* turn on/off data to use in login process.

### Game to generate keys
* add crypto game to create the random keys.
