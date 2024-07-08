export { 
  guestArea, userArea, adminArea, lobby, regForm, loginForm,
  addForm, usersList, userTemplate
};

const [guestArea, userArea, adminArea] = document.querySelector('main').children; 
const lobby = guestArea.querySelector('#lobby');
const [regForm, loginForm] = guestArea.querySelectorAll('form');
const addForm = adminArea.querySelector('form');
const [usersList] = document.getElementsByTagName('ol');
const userTemplate = usersList.firstElementChild

userTemplate.remove();
