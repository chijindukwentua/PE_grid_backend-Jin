exports.tokenGenerator = function tokenise(){
  var token ='';
  token = Math.floor(100000 + Math.random() * 900000);
  return token;
}

exports.encryptInfo = function encrypt(text, key){
  const crypto = require('crypto')
  const algorithm = 'aes-256-ctr'
  var cipher = crypto.createCipher(algorithm,key)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};

exports.decryptInfo = function decrypt(text, key){
  const crypto = require('crypto')
  const algorithm = 'aes-256-ctr'
  var decipher = crypto.createDecipher(algorithm,key)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};
