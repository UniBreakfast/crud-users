module.exports = { register };

const { hashPwd } = require('./hash.js');

async function register(store, { login, name, password }) {
  const hash = await hashPwd(password);
  
  store({login, name, hash});
}
