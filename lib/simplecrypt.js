// Simple module to encrypt / decrypt strings

/**
 * Imports Node.js native module provides cryptographic functionality that
 * includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher,
 * sign and verify functions
 */
var crypto = require('crypto');

/**
 * Creates an object that will handle the encrypting and decrypting of string utilizing
 * default AES192 method for encryption if otherwise not specified
 * @param opts
 * @returns {{encrypt: encrypt, decrypt: decrypt, password: password, salt: salt}}
 */
module.exports = function(opts) {
  opts = opts || {};

  /**
   * Initializes set variables for usages with the crypto module
   * @type {string|string}
     */
  var CRYPT_METHOD = opts.method || 'aes192',
      PASS = opts.password || crypto.randomBytes(256),
      SALT = opts.salt || crypto.randomBytes(32).toString('hex'),
      encoding = opts.encoding || 'utf8',
      digestEncoding = opts.digestEncoding || 'hex';

  /**
   * Returns four objects: encrypt, decrypt, password, and salt
   */
  return {

      /**
       * Convert message into a fixed length hash string
       * @param message
       * @returns {*}
       */
    encrypt: function (message) {
      var cipher = crypto.createCipher(CRYPT_METHOD, PASS);
      var digest = cipher.update(message + SALT, encoding, digestEncoding);
      return digest + cipher.final(digestEncoding);
    },

    /**
     * Converts fixed length hash string into message prior to encryption
     * @param digest
     * @returns {string}
       */
    decrypt: function (digest) {
      var decipher = crypto.createDecipher(CRYPT_METHOD, PASS);
      var message = decipher.update(digest, digestEncoding, encoding);
      message = message + decipher.final(encoding);
      return message.substring(0, message.length - SALT.length);
    },

    /**
     * Returns a password set by the user or generated password utilizing 256 random bytes
     * @returns {string|string}
       */
    password: function () {
      return PASS;
    },

    /**
     * Returns a salt set by the user or generated salt utilizing 32 random bytes
     * @returns {string|string}
       */
    salt: function() {
      return SALT;
    }
  };
};
