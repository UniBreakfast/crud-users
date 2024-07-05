export {prepareToUserSubmit, prepareToClickUser, showUsers};

import { form, usersList, userTemplate } from './elements.js';

function showUsers(users) {
  usersList.innerHTML = users.map(renderUserItemTemplate).join('');
}

function addUserItem(user) {
  usersList.innerHTML += renderUserItemTemplate(user);
}

function renderUserItemTemplate(user) {
  const html = userTemplate.innerHTML;
  
  return html.replace(...fillValuesOf(user))
}

function fillValuesOf(obj) {
  const keys = Object.keys(obj);
  const regExp = new RegExp(`{(${keys.join('|')})}`, 'g');
  const replacer = (_, key) => obj[key];
  
  return [regExp, replacer];
}

function prepareToUserSubmit(addUser) {
  form.onsubmit = async e => {
    e.preventDefault();

    const user = {
      login: form.login.value.trim(),
      name: form.name.value.trim(),
    }
    
    user.id = await addUser(user);

    addUserItem(user);
    form.reset();
  }
}

function prepareToClickUser(deleteUser) {
  usersList.onclick = async e => {
    const btn = e.target.closest('button');

    if (!btn) return;
    
    if (btn.value = 'delete') {
      const { id } = btn.dataset;
      
      await deleteUser(id);

      const li = btn.closest('li');
      
      li.remove();
    }
  }
}
