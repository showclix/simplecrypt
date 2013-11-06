# simplecrypt

Simplecrypt is intended to be a very basic, concise library for doing
one thing: encrypting strings.  By default, it makes a lot of assumptions
for you, like what type of encryption to use (AES 192), what to use for
the key (cryptographically strong random data), how large to make the
key (256 bytes), the encoding to use (hex dump for ciphered, UTF-8 for
deciphered).  Some of these you can change (the encryption type, and the
key), but the focus here is simplicity.

Important note: if you do not specify the key, a random one is generated.
If you plan on storing the encrypted digest somewhere, then you will need
to specify a key or retrieve the key from the simplecrypt instance.

## Installation

```
npm install simplecrypt
```

## Usage

```javascript
var simplecrypt = require("simplecrypt");

var sc = simplecrypt();

var digest = sc.encrypt("my secret");
console.log(digest); // "66cea6eb1c18b8862485cf0604fa6062"

var message = sc.decrypt(digest);
console.log(message); // "my secret"
```

## API

### simplecrypt([opts])

Instantiates a new simplecrypt object.

opts

Optionally specify options to override default settings.

 - password: (string) password for encryption. defaults to large, cryptographically strong, random password.
 - salt: (string) salt to add to the message.  defaults to a random salt.
 - method: (string) the cipher to use.  defaults to aes192.
 - encoding: (string) encoding of the message. defaults to utf8.
 - digestEncoding: (string) encoding of the encrypted message. defaults to hex.

returns instance of the simplecrypt library

### .encrypt(message)

message: (string) message to encrypt
returns (string) encrypted message as hex string

### .decrypt(digest)

digest: (string) encrypted message
returns (string) original message, unencrypted

### .password()

returns (string|Buffer) password used for encryption

### .salt()

returns (string) salt used
