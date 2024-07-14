module.exports = { register, setPwd, logIn, unregister };

const { hashPwd, verifyPwd } = require('./hash.js');

async function register(storeFn, { login, name, password }) {
  const hash = await hashPwd(password);
  
  return storeFn({login, name, hash, role: 'user'});
}

async function unregister(getFn, delFn, {id, password}) {
  const user = await getFn({id}, true);
  
  if (!user || !await verifyPwd(password, user.hash)) {
    return {problem: 'Incorrect password'};
  }
  
  return delFn(id);
}

async function setPwd(storeFn, { id, password0='', password=''}, getFn) {
  if (getFn) {
    const user = await getFn({id}, true);
    
    if (!user || !await verifyPwd(password0, user.hash)) {
      return {problem: 'Correct current password required'};
    }
  }

  const hash = await hashPwd(password);
  
  return storeFn(id, {hash});
}

async function logIn(getFn, storeFn, { login, password }) {
  const user = await getFn({login}, true);
  
  if (!user) return {problem: 'Incorrect login or password'};
  
  const { id: userId, hash } = user;
  
  if (await verifyPwd(password, hash)) {
    const token = Math.random().toString(36).slice(2);
    
    await storeFn({userId, token});
    
    return {token};
  }
  
  return {problem: 'Incorrect login or password'};
}
