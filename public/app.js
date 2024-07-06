import { getUsers, addUser, saveUser, deleteUser, setPass } from './net/service.js';
import { showUsers } from './ui/users.js';
import { prepareToUserSubmit, prepareToClickUser } from './ui/events.js';

getUsers().then(showUsers);

prepareToUserSubmit(addUser, saveUser, setPass);
prepareToClickUser(deleteUser);
