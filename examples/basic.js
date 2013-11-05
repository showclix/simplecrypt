var simplecrypt = require("../lib/simplecrypt");

var sc = simplecrypt();

var digest = sc.encrypt("my secret");
console.log(digest); // "66cea6eb1c18b8862485cf0604fa6062"

var message = sc.decrypt(digest);
console.log(message); // "my secret"
