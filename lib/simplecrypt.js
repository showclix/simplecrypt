// Simple module to encrypt / decrypt strings
//
// 2020-07-06 Patched to replace calls to deprecated crypto methods createCipher and createDecipher
// with createCipheriv and createDecipheriv
//
// Changes based on gist from Ben Noordhuis <info@bnoordhuis.nl>
// https://gist.github.com/bnoordhuis/2de2766d3d3a47ebe41aaaec7e8b14df
//
// Copyright (c) 2017, Ben Noordhuis <info@bnoordhuis.nl>
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

var crypto = require('crypto');

function sizes(crypt_method) {
  for (let nkey = 1, niv = 0;;) {
    try {
      crypto.createCipheriv(crypt_method, '.'.repeat(nkey), '.'.repeat(niv));
      return [nkey, niv];
    } catch (e) {
      if (/invalid iv length/i.test(e.message)) niv += 1;
      else if (/invalid key length/i.test(e.message)) nkey += 1;
      else throw e;
    }
  }
}

function compute(crypt_method, passphrase) {
  let [nkey, niv] = sizes(crypt_method);
  for (let key = '', iv = '', p = '';;) {
    const h = crypto.createHash('md5');
    h.update(p, 'hex');
    h.update(passphrase);
    p = h.digest('hex');
    let n, i = 0;
    n = Math.min(p.length-i, 2*nkey);
    nkey -= n/2, key += p.slice(i, i+n), i += n;
    n = Math.min(p.length-i, 2*niv);
    niv -= n/2, iv += p.slice(i, i+n), i += n;
    if (nkey+niv === 0) return [key, iv];
  }
}

module.exports = function(opts) {
  opts = opts || {};


  var CRYPT_METHOD = opts.method || 'aes192',
      PASS = opts.password || crypto.randomBytes(256),
      SALT = opts.salt || crypto.randomBytes(32).toString('hex'),
      encoding = opts.encoding || 'utf8',
      digestEncoding = opts.digestEncoding || 'hex';

  return {
    encrypt: function (message) {
      const [c_key, c_iv] = compute(CRYPT_METHOD, PASS);
      const key  = Buffer.from(c_key, 'hex');
      const iv  = Buffer.from(c_iv, 'hex');
      const cipher = crypto.createCipheriv(CRYPT_METHOD, key, iv);
      var digest = cipher.update(message + SALT, encoding, digestEncoding);
      return digest + cipher.final(digestEncoding);
    },

    decrypt: function (digest) {
      const [c_key, c_iv] = compute(CRYPT_METHOD, PASS);
      const key  = Buffer.from(c_key, 'hex');
      const iv  = Buffer.from(c_iv, 'hex');
      const decipher = crypto.createDecipheriv(CRYPT_METHOD, key, iv);

      var message = decipher.update(digest, digestEncoding, encoding);
      message = message + decipher.final(encoding);
      return message.substring(0, message.length - SALT.length);
    },

    password: function () {
      return PASS;
    },

    salt: function() {
      return SALT;
    }
  };
};
