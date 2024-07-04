export {getUsers};

import {get} from './api.js';

function getUsers() {
  return get('users');
}
