import { getUsers, addUser, deleteUser } from './net/service.js';
import { showUsers, prepareToUserSubmit, prepareToClickUser } from './ui/users.js';

getUsers().then(showUsers);

prepareToUserSubmit(addUser);
prepareToClickUser(deleteUser);
