import { postData } from "./postData.mjs";

function goToPage(page) {
  window.location.href = [`${page}`];
}

/**
 *
 * @param {string} url - where to send the data
 * @param {object} formData - what data is sent via the request body
 * @param {object} divForError - a div where error messages are printed
 *
 * This function logs you into the social media platform
 *
 * NOTE TO ME; Needs to work without switch
 */
export function login(url, formData, divForError, formName) {
  const headers = {
    "Content-Type": "application/json",
  };
  //   let page;
  console.log(url);
  console.log(formData);
  const page = "/index.html";

  postData(url, formData, headers, divForError, goToPage, page);
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
