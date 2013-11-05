// Simple module to encrypt / decrypt strings
var crypto = require('crypto');
module.exports = function(password, method) {
    var CRYPT_METHOD = method || 'aes192';
    var PASS = password || crypto.randomBytes(128).toString('hex');

    return {
        encrypt: function encrypt(message) {
          var cipher = crypto.createCipher(CRYPT_METHOD, PASS);
          cipher.update(message, 'utf8', 'hex');
          return cipher.final('hex');
        },

        decrypt: function decrypt(digest) {
          var decipher = crypto.createDecipher(CRYPT_METHOD, PASS);
          decipher.update(digest, 'hex', 'utf8');
          return decipher.final('utf8');
        }
    };
};

