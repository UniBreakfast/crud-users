export {showUsers};

import { usersList, userTemplate } from './elements.js';

function showUsers(users) {
  usersList.innerHTML = users.map(renderUserItemTemplate).join('');
}

function renderUserItemTemplate(user) {
  const html = userTemplate.innerHTML;
  
  return html.replace(...placeholdersOf(user))
}

function placeholdersOf(obj) {
  const keys = Object.keys(obj);
  const regExp = new RegExp(`{(${keys.join('|')})}`, 'g');
  const replacer = (_, key) => obj[key];
  
  return [regExp, replacer];
}
