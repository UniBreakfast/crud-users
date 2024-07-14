module.exports = { hashPwd, verifyPwd };

const crypto = require('crypto');
const {promisify} = require('util');

const pbkdf2 = promisify(crypto.pbkdf2);

const iterCount = 1e6;
const keyLength = 64;
const digestAlgorithm = 'sha512';
const params = [iterCount, keyLength, digestAlgorithm];

async function hashPwd(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await pbkdf2(password, salt, ...params);

  return `${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPwd(password, hash) {
  const [salt, key] = hash.split(':');
  const derivedKey = await pbkdf2(password, salt, ...params);
  
  return key === derivedKey.toString('hex');
}

async function example() {
  const password = 'mySecurePassword123!';
  
  const hashedPassword = await hashPwd(password);
  console.log('Hashed password:', hashedPassword);
  
  const isValid = await verifyPwd(password, hashedPassword);
  console.log('Is password valid?', isValid);
}

// example().catch(console.error);
