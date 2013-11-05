var assert = require('assert');
var simplecrypt = require('../lib/simplecrypt');

describe('simplecrypt', function() {
    var sc = simplecrypt();
    var messages = [
        'mysecret',
        'my secret',
        'a phrase with many spaces',
        'apasswordwith123456',
        'sp3c!@lcH4R',
        'A long phrase with many words and things of that nature.',
        Array(1000).join('abcdef1234 ')
    ];

    messages.forEach(function(message) {
        describe('encrypt', function() {
            it('should encrypt a string to a hex string', function() {
                var digest = sc.encrypt(message);
                assert.equal(typeof digest, 'string');
                assert.notEqual(digest.match(/^[a-f0-9]+$/i), null);
            });
        });

        describe('decrypt', function() {
            it('should decrypt a string to its original message', function() {
                var digest = sc.encrypt(message);
                assert.equal(sc.decrypt(digest), message);
            });
        });
    });
});
