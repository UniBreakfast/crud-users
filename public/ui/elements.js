export { 
  guestArea, userArea, adminArea, lobby, regForm, loginForm,
  regFeedback, loginFeedback, addForm, usersList, userTemplate
};

const [guestArea, userArea, adminArea] = document.querySelector('main').children; 
const lobby = guestArea.querySelector('#lobby');
const [regForm, loginForm] = guestArea.querySelectorAll('form');
const [regFeedback, loginFeedback] = guestArea.querySelectorAll('.feedback');
const addForm = adminArea.querySelector('form');
const [usersList] = document.getElementsByTagName('ol');
const userTemplate = usersList.firstElementChild

userTemplate.remove();
