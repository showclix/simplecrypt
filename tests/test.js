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

        describe('password', function() {
            it('should encrypt/decrypt with a user defined password', function() {
                var pw = 'a user defined password';
                var sc = simplecrypt({password: pw});
                var digest = sc.encrypt(message);
                assert.equal(sc.decrypt(digest), message);
                assert.equal(sc.password(), pw);
            });
        });

        describe('salt', function() {
            it('should encrypt/decrypt with a user defined salt', function() {
                var salt = 'mMmMMMmmm s@ltY!';
                var sc = simplecrypt({salt: salt});
                var digest = sc.encrypt(message);
                assert.equal(sc.decrypt(digest), message);
                assert.equal(sc.salt(), salt);
            });
        });
    });
});
