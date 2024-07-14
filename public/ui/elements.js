export { 
  guestArea, userArea, adminArea, lobby, regForm, loginForm,
  regFeedback, loginFeedback, profileTemplate,
  addForm, usersList, logoutBtn, userTemplate,
};

const [guestArea, userArea, adminArea] = document.querySelector('main').children; 
const lobby = guestArea.querySelector('#lobby');
const [regForm, loginForm] = guestArea.querySelectorAll('form');
const [regFeedback, loginFeedback] = guestArea.querySelectorAll('.feedback');
const profileTemplate = userArea.firstElementChild;
const [addForm, usersList, logoutBtn] = adminArea.children;
const userTemplate = usersList.firstElementChild;

userTemplate.remove();
