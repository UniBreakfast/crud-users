const crypto = require('crypto');

// Function to hash a password
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 1e6;
  const keylen = 64;
  const digest = 'sha512';

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${iterations}:${keylen}:${digest}:${derivedKey.toString('hex')}`);
    });
  });
}

// Function to verify a password
function verifyPassword(password, hash) {
  const [salt, iterations, keylen, digest, key] = hash.split(':');
  
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, parseInt(iterations), parseInt(keylen), digest, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString('hex'));
    });
  });
}

// Example usage
async function example() {
  const password = 'mySecurePassword123!';
  
  // Hash the password
  const hashedPassword = await hashPassword(password);
  console.log('Hashed password:', hashedPassword);
  
  // Verify the password
  const isValid = await verifyPassword(password, hashedPassword);
  console.log('Is password valid?', isValid);
}

example();
