export {getUsers, addUser, saveUser, deleteUser};

import {get, post, put, destroy} from './methods.js';

function getUsers() {
  return get('users');
}

async function addUser(user) {
  const {id} = await post('user', user);

  return id;
}

async function saveUser(user) {
  await put('user', user);
}

function deleteUser(id) {
  return destroy('user', {id});
}
