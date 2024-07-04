import { getUsers } from './net/service.js';
import { showUsers } from './ui/users.js';

getUsers().then(showUsers);
