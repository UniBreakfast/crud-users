export { fillProfile };

import { userArea, profileTemplate } from "./elements.js";

function fillProfile(user) {
  const html = profileTemplate.innerHTML;
  
  return userArea.innerHTML = html.replace(...fillValuesOf(user));
}

function fillValuesOf(obj) {
  const keys = Object.keys(obj);
  const regExp = new RegExp(`{(${keys.join('|')})}`, 'g');
  const replacer = (_, key) => obj[key];
  
  return [regExp, replacer];
}
