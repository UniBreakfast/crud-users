export { form, usersList, userTemplate };

const [form] = document.forms;
const [usersList] = document.getElementsByTagName('ol');
const userTemplate = usersList.firstElementChild

userTemplate.remove();
