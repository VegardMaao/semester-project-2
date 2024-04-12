import { postData } from "./postData.mjs";
import { changeForm } from "../../visual-effects/loginEffects.mjs";

function goToPage(page) {
  window.location.href = [`${page}`];
}

/**
 *
 * @param {string} url - where to send the data
 * @param {object} formData - what data is sent via the request body
 * @param {object} divForError - a div where error messages are printed
 *
 * This function logs you in
 */
export function login(url, formData, divForError) {
  const headers = {
    "Content-Type": "application/json",
  };
  const page = "/index.html";
  postData(url, formData, headers, divForError, goToPage, page);
}

/**
 *
 * @param {string} url - where to send the data
 * @param {object} formData - what data is sent via the request body
 * @param {object} divForError - a div where error messages are printed
 * @param {*} mainDOMElement - the moving main DOM-element
 *
 * registers a new user. if no error occurs, you are taken to the login-portal
 * as the API does not return a token if you register, only if you log in
 */
export function signup(url, formData, divForError, mainDOMElement) {
  const headers = {
    "Content-Type": "application/json",
  };
  divForError.innerHTML = "";
  postData(url, formData, headers, divForError);
  setTimeout(() => {
    if (divForError.innerHTML === "") {
      changeForm(mainDOMElement);
    }
  }, 1000);
}

/**
 *
 * @param {string} url - where  to end the data
 * @param {object} formData - data to be sent
 * @param {object} divForError - a div to print out error
 *
 * This function passes information about the post you want to create down to the postData function
 */
export function makePost(url, formData, divForError) {
  const token = localStorage.getItem("accessToken");
  const headerData = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  postData(url, formData, headerData, divForError);
}

// export function postComment(url, formData, divForError) {
//   const token = localStorage.getItem("accessToken");
//   const headerData = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
//   postData(url, formData, headerData, divForError);
// }

export function placeBid(url, amount, divForError) {
  const token = localStorage.getItem("accessToken");
  const headerData = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  postData(url, amount, headerData, divForError);
}
