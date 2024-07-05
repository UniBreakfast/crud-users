export {getUsers, addUser, deleteUser};

import {get, post, put, destroy} from './methods.js';

function getUsers() {
  return get('users');
}

async function addUser(user) {
  const {id} = await post('user', user);

  return id;
}

function deleteUser(id) {
  return destroy('user', {id});
}
