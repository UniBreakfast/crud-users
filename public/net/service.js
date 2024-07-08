export {getUsers, addUser, saveUser, deleteUser, setPass, logIn};

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

function deleteUser(id) {
  return destroy('user', {id});
}

function setPass(user) {
  return put('updpwd', user);
}

function logIn(user) {
  return post('login', user);
}
