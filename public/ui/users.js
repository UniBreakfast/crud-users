export {showUsers, addUserItem, renderUserItemTemplate};

import { usersList, userTemplate } from './elements.js';

function showUsers(users) {
  usersList.innerHTML = users.map(renderUserItemTemplate).join('');
}

function addUserItem(user) {
  usersList.innerHTML += renderUserItemTemplate(user);
}

function renderUserItemTemplate(user) {
  const html = userTemplate.innerHTML;

  Object.assign(user, {
    lb: user.role === 'admin' ? '[' : '(',
    rb: user.role === 'admin' ? ']' : ')',
    admin: user.role === 'admin' ? 'selected' : '',
    user: user.role === 'user' ? 'selected' : '',
  });
  
  return html.replace(...fillValuesOf(user))
}

function fillValuesOf(obj) {
  const keys = Object.keys(obj);
  const regExp = new RegExp(`{(${keys.join('|')})}`, 'g');
  const replacer = (_, key) => obj[key];
  
  return [regExp, replacer];
}
