import { postData } from "./postData.mjs";

function goToPage(page) {
  window.location.href = [`${page}`];
}

/**
 *
 * @param {string} url - where to send the data
 * @param {object} formData - what data is sent via the request body
 * @param {object} divForError - a div where error messages are printed
 * @param {string} currentPage - the current page title
 *
 * This function logs you into the social media platform
 */
export function login(url, formData, divForError, formName) {
  const headers = {
    "Content-Type": "application/json",
  };
  //   let page;
  console.log(formName);
  //   switch (formName) {
  //     case "Noroff Social Media | Log in":
  //       page = "feed/index.html";
  //       break;
  //     case "Noroff Social Media | Sign up":
  //       page = "index.html";
  //       break;
  //     default:
  //       break;
  //   }
  //   postData(url, formData, headers, divForError, goToPage, page);
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

export function postComment(url, formData, divForError) {
  const token = localStorage.getItem("accessToken");
  const headerData = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  postData(url, formData, headerData, divForError);
}
