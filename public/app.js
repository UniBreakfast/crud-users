import { getUsers, addUser, saveUser, deleteUser, setPass, logIn } from './net/service.js';
import { showUsers } from './ui/users.js';
import { prepareToUserSubmit, prepareToClickUser } from './ui/admin-events.js';
import { prepareLobbyNavigation, prepareToAuthSubmit } from './ui/guest-events.js';

switch (user.role) {
  case 'user': {
    
  }
    break;
  case 'admin': {
    getUsers().then(showUsers);

    prepareToUserSubmit(addUser, saveUser, setPass);
    prepareToClickUser(deleteUser);
  }
    break;
  default: {
    prepareLobbyNavigation();
    prepareToAuthSubmit(addUser, logIn);
  }
}

document.getElementById(user.role).hidden = false;

// alert(JSON.stringify(user), null, 2);
