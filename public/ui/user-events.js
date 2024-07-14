export { prepareToUserSubmit };

import { userArea } from "./elements.js";

function prepareToUserSubmit(saveUser, changePass, deleteUser, logOut) { // project://public/net/service.js
  userArea.onsubmit = async e => {
    e.preventDefault();
    e.submitter.disabled = true;

    const form = e.target;
    const feedbackPar = form.querySelector('.feedback');
    const fromId = form.getAttribute('id');

    if (fromId == 'name-form') {
      form.name.value = form.name.value.trim();

      if (!form.name.value) {
        feedbackPar.textContent = 'Name is required';
        e.submitter.disabled = false;
        return;
      }

      const user = {
        id: form.id.value,
        name: form.name.value,
      }

      await saveUser(user);

      feedbackPar.textContent = 'New name set';

      setTimeout(() => location.reload(), 500);

    } else if (fromId == 'pass-form') {
      const password0 = form.old.value.trim();
      const password = form.new.value.trim();
      const repeat = form.repeat.value.trim();

      if (password != repeat) {
        feedbackPar.textContent = 'New passwords do not match';
        e.submitter.disabled = false;

        return;
      }

      const user = { id: form.id.value, password0, password };

      const {problem} = await changePass(user);

      if (problem) {
        feedbackPar.textContent = problem;
        e.submitter.disabled = false;
        
        return;

      } else {
        feedbackPar.textContent = 'Password changed';

        setTimeout(() => location.reload(), 500);
      }

    } else if (fromId == 'del-form') {
      const user = {
        id: form.id.value,
        password: form.password.value.trim(),
      }

      const {problem} = await deleteUser(user);

      if (problem) {
        feedbackPar.textContent = problem;
        e.submitter.disabled = false;

        return;

      } else {
        feedbackPar.textContent = 'Account deleted';

        setTimeout(() => location.replace('/'), 500);
      }
    }
  }

  userArea.onclick = async e => {
    const button = e.target.closest('button');

    if (button?.value != 'logout') return;

    button.disabled = true;

    await logOut();

    location.reload();
  }
}
