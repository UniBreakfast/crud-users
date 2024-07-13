export { prepareToUserSubmit };

import { userArea } from "./elements.js";

function prepareToUserSubmit(saveUser, setPass, deleteUser) {
  userArea.onsubmit = async e => {
    e.preventDefault();
    e.submitter.disabled = true;


  }
}
