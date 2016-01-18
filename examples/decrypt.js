/**
 * Created by Phansiri on 1/18/16.
 */

/**
 * Imports module for usage
 */
var simplecrypt = require("../lib/simplecrypt");

/**
 * Example of using rsa-sha256 as encryption strength
 * @type {{encrypt, decrypt, password, salt}|{encrypt: encrypt, decrypt: decrypt, password: password, salt: salt}|*}
 */
var sha = simplecrypt('rsa-sha256');
var message256 = "This is my secret text using sha256 as my strength of encryption";
var encryptText = sha.encrypt(message256);
console.log(encryptText)
var decryptedText = sha.decrypt(encryptText);
console.log(decryptedText);

/**
 * Example of using sha512 as encryption strength
 * @type {{encrypt, decrypt, password, salt}|{encrypt: encrypt, decrypt: decrypt, password: password, salt: salt}|*}
 */
var sha = simplecrypt('sha512');
var message512 = "This is my secret text using sha512 as my strength of encryption";
var encryptText = sha.encrypt(message512);
console.log(encryptText)
var decryptedText = sha.decrypt(encryptText);
console.log(decryptedText);
