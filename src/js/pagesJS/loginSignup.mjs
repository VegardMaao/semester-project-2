import * as loginEffects from "../visual-effects/loginEffects.mjs";
import * as formValidation from "../visual-effects/formValidation.mjs";
import * as postActions from "../api-functions/post/postActions.mjs";
import * as formActions from "../formActions/submitForms.mjs";
import * as postData from "../api-functions/post/postData.mjs";

const fieldset1 = document.querySelector(".first-form").elements;
const btn1 = document.querySelector("#sign-in-btn");
const fieldset2 = document.querySelector(".second-form").elements;
const btn2 = document.querySelector("#sign-up-btn");

for (let i = 0; i < fieldset1.length; i++) {
  const input = fieldset1[i];
  input.onkeyup = () => formValidation.formCheck(fieldset1, btn1);
}

for (let i = 0; i < fieldset2.length; i++) {
  const input = fieldset2[i];
  input.onkeyup = () => formValidation.formCheck(fieldset2, btn2);
}

const movingMain = document.querySelector(".moving-main");
const changeFormBtns = document.querySelectorAll(".show-signup-form-button");

changeFormBtns.forEach(function (btn) {
  btn.addEventListener("click", () => {
    loginEffects.changeForm(movingMain);
  });
});

const loginForm = document.querySelector(".login-form");
const loginBtn = document.querySelector("#sign-in-btn");
const errorDivLogin = document.querySelector(".error-box-login");
const signupForm = document.querySelector(".signin-form");
const signupBtn = document.querySelector("#sign-up-btn");
const errorDivSignup = document.querySelector(".error-box-signup");

const baseUrl = "https://v2.api.noroff.dev";
let endpoint;
let completeUrl;

// TESTING PURPOSES; LOGIN WITH:
// Name: vegard
// email: my@stud.noroff.no
// Pass: Troll123123
// THIS USER WORKS, and I know for sure that the postData function as well as the submitForm function works as  they should
// When I use the function to log in with these credentials, I receive a JWT in my finishedResponse object

loginBtn.onclick = (e) => {
  e.preventDefault();
  endpoint = "/auth/login";
  completeUrl = `${baseUrl}${endpoint}`;
  formActions.submitForm(
    loginForm,
    completeUrl,
    postActions.login,
    errorDivLogin
  );
};

signupBtn.onclick = (e) => {
  e.preventDefault();
  endpoint = "/auth/register";
  completeUrl = `${baseUrl}${endpoint}`;
  formActions.submitForm(
    signupForm,
    completeUrl,
    postActions.signup,
    errorDivSignup,
    movingMain
  );
};
