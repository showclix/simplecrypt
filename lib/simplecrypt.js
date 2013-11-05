// Simple module to encrypt / decrypt strings
var crypto = require('crypto');
module.exports = function(password, method) {
    var CRYPT_METHOD = method || 'aes192';
    var PASS = password || crypto.randomBytes(256);
    var encodingIn = 'utf8',
        encodingOut = 'hex';

    return {
        encrypt: function encrypt(message) {
          var cipher = crypto.createCipher(CRYPT_METHOD, PASS);
          var digest = cipher.update(message, encodingIn, encodingOut);
          return digest + cipher.final(encodingOut);
        },

        decrypt: function decrypt(digest) {
          var decipher = crypto.createDecipher(CRYPT_METHOD, PASS);
          // decipher.setAutoPadding(false);
          var message = decipher.update(digest, encodingOut, encodingIn);
          return message + decipher.final(encodingIn);
        }
    };
};

