import {
  getUsers, addUser, saveUser, deleteUser, 
  setPass, changePass, logIn, logOut,
} from './net/service.js';
import { fillProfile } from './ui/profile.js';
import { prepareToUserSubmit } from './ui/user-events.js';
import { showUsers } from './ui/users.js';
import { prepareToAdminSubmit, prepareToClickUser } from './ui/admin-events.js';
import { prepareLobbyNavigation, prepareToAuthSubmit } from './ui/guest-events.js';

switch (user.role) {
  case 'user': {
    fillProfile(user);
    prepareToUserSubmit(saveUser, changePass, deleteUser, logOut);
  }
    break;
  case 'admin': {
    getUsers().then(showUsers);

    prepareToAdminSubmit(addUser, saveUser, setPass);
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
