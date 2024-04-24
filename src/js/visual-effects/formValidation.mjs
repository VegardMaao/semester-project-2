/**
 *
 * @param {arrayOfBooleans} arr - array of boolean values
 * @returns false, unless all Booleans are true
 */
const trueChecker = (arr) => arr.every(Boolean);

/**
 * A simple form validation. Checks all inputs the validity of all inputs (validated directly in HTML) and creates an array of
 * booleans. Afterwards, the trueChecker function checks if all the booleans are true, and then I extract a variable from  this.
 * If all the form inputs are validated in HTML, you're good to go!
 *
 * There is a "pattern" attribute in the email input, which handles regex for me. I could have added this via JS,
 * but hardcoding the regex in HTML did the same job and keeps the code generic and reusable.
 */
export function formCheck(inputs, btn) {
  const trueCheckerArr = [];
  for (let i = 0; i < inputs.length; i++) {
    const inputsValidity = inputs[i].validity.valid;
    let errorMsg = inputs[i].nextElementSibling;
    if (inputsValidity) {
      errorMsg.style.cssText = "display: none";
      inputs[i].classList.add("validated");
    } else {
      errorMsg.style.cssText = "display: block";
      inputs[i].classList.remove("validated");
    }

    trueCheckerArr.push(inputsValidity);
  }

  const checker = trueChecker(trueCheckerArr);

  if (!checker) {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

/**
 * @description This function adds a character counter to my message textbox.
 * @param {string} inputVal - this takes the value of a text(box) input
 * @param {object} counter - a span element displaying the current number of characters in the input
 * @param {object} maxValText - a span element displaying the max number of characters in the input
 * @param {number} maxLength - the max length of the text input
 * @param {number} minVal - the min length of the input
 */
export function characterCount(
  inputVal,
  counter,
  maxValText,
  maxLength,
  minVal
) {
  const inpLength = inputVal.length;
  counter.innerText = inpLength;
  maxValText.innerText = maxLength;
  if (inpLength < minVal || inpLength >= maxLength) {
    counter.style.cssText = "color: red;";
  } else {
    counter.style.cssText = "color: #1d3557;";
  }
}
