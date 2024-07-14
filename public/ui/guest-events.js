export { prepareLobbyNavigation, prepareToAuthSubmit };

import { 
  guestArea, lobby, regForm, loginForm, regFeedback, loginFeedback 
} from './elements.js';

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
  regForm.onsubmit = async e => {
    e.preventDefault();

    const inputs = regForm.querySelectorAll('input');

    for (const input of inputs) input.value = input.value.trim();

    const entries = [...new FormData(regForm)];

    if (entries.some(([_, value]) => !value)) {
      return regFeedback.textContent = 'Please, fill in all fields.';
    }

    const user = Object.fromEntries(entries);

    if (user.password !== user.repeat) {
      return regFeedback.textContent = 'Passwords do not match.';
    }

    delete user.repeat;

    const result = await addUser(user);

    if (result.problem) {
      regFeedback.textContent = result.problem;
    } else {
      regFeedback.innerHTML = 'Registration successful. You may <button type="button" value="login">Log in</button>';
      regForm.reset();
    }
  }

  loginForm.onsubmit = async e => {
    e.preventDefault();

    const inputs = loginForm.querySelectorAll('input');

    for (const input of inputs) input.value = input.value.trim();

    const entries = [...new FormData(loginForm)];

    if (entries.some(([_, value]) => !value)) {
      return loginFeedback.textContent = 'Please, fill in all fields.';
    }

    const user = Object.fromEntries(entries);

    const result = await logIn(user);

    if (result.problem) {
      loginFeedback.textContent = result.problem;
    } else {
      loginFeedback.textContent = 'Login successful.';
      loginForm.reset();

      setTimeout(() => location.reload(), 500);
    }
  }
}
