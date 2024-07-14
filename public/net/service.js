export {
  getUsers, addUser, saveUser, deleteUser, 
  setPass, changePass, logIn, logOut,
};

import {get, post, put, destroy} from './methods.js';

function getUsers() {
  return get('users');
}

async function addUser(user) {
  const {id} = await post('user', user);

  return id;
}

function saveUser(user) {
  return put('user', user);
}

function deleteUser(user) {
  return destroy('user', user);
}

function setPass(user) {
  return put('setpwd', user);
}

function changePass(user) {
  return put('changepwd', user);
}

function logIn(user) {
  return post('login', user);
}

function logOut() {
  return destroy('logout');
}
