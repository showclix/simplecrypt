/**
 * Imports module for usage
 * @type {*|exports|module.exports}
 */
var simplecrypt = require("../lib/simplecrypt");

/**
 * Simple example of encryption/decryption without a parameter
 */
var sc = simplecrypt();
var digest = sc.encrypt("my secret");
console.log(digest); // "66cea6eb1c18b8862485cf0604fa6062"
var message = sc.decrypt(digest);
console.log(message); // "my secret"

/**
 * Example of using sha256 as encryption strength
 * @type {{encrypt, decrypt, password, salt}|{encrypt: encrypt, decrypt: decrypt, password: password, salt: salt}|*}
 */
var sha = simplecrypt('sha256');
var encryptText = sha.encrypt("This is my secret text using sha256 as my strength of encryption");
console.log(encryptText);
var decryptedText = sha.decrypt(encryptText);
console.log(decryptedText);

/**
 * Example of using rsa-sha256 as encryption strength
 * @type {{encrypt, decrypt, password, salt}|{encrypt: encrypt, decrypt: decrypt, password: password, salt: salt}|*}
 */
var sha = simplecrypt('rsa-sha256');
var encryptText = sha.encrypt("This is my secret text using sha256 as my strength of encryption");
console.log(encryptText);
var decryptedText = sha.decrypt(encryptText);
console.log(decryptedText);

/**
 * Example of using sha512 as encryption strength
 * @type {{encrypt, decrypt, password, salt}|{encrypt: encrypt, decrypt: decrypt, password: password, salt: salt}|*}
 */
var sha = simplecrypt('sha512');
var encryptText = sha.encrypt("This is my secret text using sha512 as my strength of encryption");
console.log(encryptText);
var decryptedText = sha.decrypt(encryptText);
console.log(decryptedText);
