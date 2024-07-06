export { prepareToUserSubmit, prepareToClickUser };

import { form, usersList } from './elements.js';
import { addUserItem, renderUserItemTemplate } from './users.js';

function prepareToUserSubmit(addUser, saveUser) {
  form.onsubmit = async e => {
    e.preventDefault();
    e.submitter.disabled = true;

    const user = {
      login: form.login.value.trim(),
      name: form.name.value.trim(),
      password: form.password.value.trim(),
    }

    user.id = await addUser(user);

    addUserItem(user);
    form.reset();
    e.submitter.disabled = false;
    form.name.focus();
  }

  usersList.onsubmit = async e => {
    e.preventDefault();
    e.submitter.disabled = true;
    e.submitter.nextElementSibling.disabled = true;

    const form = e.target;
    const li = form.closest('li');
    const user = {
      id: form.id.value,
      login: form.login.value.trim(),
      name: form.name.value.trim(),
    }

    await saveUser(user);

    li.outerHTML = renderUserItemTemplate(user);
  }
}

function prepareToClickUser(deleteUser) {
  usersList.onclick = async e => {
    const btn = e.target.closest('button');
    const li = btn?.closest('li');

    if (!btn) return;

    if (btn.value == 'delete') {
      const { id } = btn.dataset;

      btn.disabled = true;

      await deleteUser(id);

      li.remove();

    } else if (btn.value == 'edit') {
      const [div, form] = li.children;

      div.hidden = true;
      form.hidden = false;

    } else if (btn.value == 'cancel') {
      const form = btn.closest('form');

      const user = {
        id: form.id.value,
        login: form.login.getAttribute('value'),
        name: form.name.getAttribute('value'),
      }

      li.outerHTML = renderUserItemTemplate(user);
    }
  }
}
