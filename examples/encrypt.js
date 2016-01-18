/**
 * Created by Phansiri on 1/18/16.
 */

/**
 * Imports module for usage
 */
var simplecrypt = require("../lib/simplecrypt");

/**
 * Example of using sha256 as encryption strength
 */
var sha = simplecrypt('sha256');
var encryptText = sha.encrypt("This is my secret text using sha256 as my strength of encryption");
console.log(encryptText);


/**
 * Example of using rsa-sha256 as encryption strength
 */
var sha = simplecrypt('rsa-sha256');
var encryptText = sha.encrypt("This is my secret text using sha256 as my strength of encryption");
console.log(encryptText);


/**
 * Example of using sha512 as encryption strength
 */
var sha = simplecrypt('sha512');
var encryptText = sha.encrypt("This is my secret text using sha512 as my strength of encryption");
console.log(encryptText);

