module.exports = { register };

const { hashPwd } = require('./hash.js');

async function register(store, { login, name, password }) {
  const hash = await hashPwd(password);
  
  return store({login, name, hash});
}
