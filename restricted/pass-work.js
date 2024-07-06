module.exports = { register, setPwd };

const { hashPwd } = require('./hash.js');

async function register(store, { login, name, password }) {
  const hash = await hashPwd(password);
  
  return store({login, name, hash});
}

async function setPwd(store, { id, password }) {
  const hash = await hashPwd(password);
  
  return store(id, {hash});
}
