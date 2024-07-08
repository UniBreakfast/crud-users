export { prepareLobbyNavigation, prepareToAuthSubmit };

import { guestArea, lobby, regForm, loginForm } from './elements.js';

function prepareLobbyNavigation() {
  guestArea.onclick = e => {
    const btn = e.target.closest('button');

    if (!btn) return;

    if (btn.value == 'register') {
      lobby.hidden = true;
      regForm.hidden = false;
      loginForm.hidden = true;
    } else if (btn.value == 'login') {
      lobby.hidden = true;
      regForm.hidden = true;
      loginForm.hidden = false;
    }
  }
}

function prepareToAuthSubmit(addUser, logIn) {
  
}
