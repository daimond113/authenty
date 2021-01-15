# <b>authenty</b> - A secure account handler
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/daimond113/authenty)
![GitHub issues](https://img.shields.io/github/issues/daimond113/authenty)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@daimond113/authenty)
![GitHub package.json version](https://img.shields.io/github/package-json/v/daimond113/authenty)
<h2><b>How to install</b></h2>
To install, you need to have <a href="https://nodejs.org/en/">Node.js</a> then, <br/>
Run `npm i @daimond113/authenty`
And you're done!
<br/>
<h2><b>How to use</b></h2>

```javascript
const authenty = require('@daimond113/authenty')

authenty.register({
    username: "Test_Username",
    password: "YourPassword", // Don't worry, authenty encrypts your passwords using 'bcrypt'
    CollectionName: 'YourCollectionName',
    MongoDB_URL: 'YourMongoDB_URL'
})

authenty.login({
    username: "Test_Username",
    password: "YourPassword",
    CollectionName: 'YourCollectionName',
    MongoDB_URL: 'YourMongoDB_URL'
})
```
<h2><b>These functions will error if:</b></h2>
<h3>register function:</h3>
<ol>
<li>
A username is already taken
</li>
<li>
Invalid arguments (or none) are given
</li>
</ol>
<h3>login function:</h3>
<ol>
<li>
Password is incorrect
</li>
<li>
A username doesn't exist
</li>
<li>
Invalid arguments (or none) are given
</li>
</ol>

<h2><b>Got any issues? Report them on <a href="https://github.com/daimond113/authenty/issues">GitHub/Issues</a></b><h2>
