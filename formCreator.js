const form = document.createElement('form');
form.classList.add('form');
form.setAttribute('action', '#');
form.setAttribute('novalidate', '');

const formTitle = document.createElement('h1');
formTitle.classList.add('form__title');
formTitle.textContent = 'Sign Up';
form.appendChild(formTitle);

const formElementsContainer = document.createElement('div');
formElementsContainer.classList.add('form__elements-container');
form.appendChild(formElementsContainer);

const createInputWrapper = (labelText, inputName, inputType, isRequired, minLength, maxLength, max, pattern) => {
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('input-element');

  const input = document.createElement('input');
  input.classList.add('input');
  input.setAttribute('name', inputName);
  input.setAttribute('type', inputType);
  if (isRequired) {
    input.setAttribute('required', '');
  }
  if (minLength) {
    input.setAttribute('minlength', minLength);
  }
  if (maxLength) {
    input.setAttribute('maxlength', maxLength);
  }
  if (max) {
    const maxDate = new Date();
    maxDate.setHours(23, 59, 59, 999);
    input.setAttribute('max', maxDate.toISOString().split("T")[0]); 
  }
  if (pattern) {
    input.setAttribute('pattern', pattern);
  }
  inputWrapper.appendChild(input);

  const label = document.createElement('label');
  label.textContent = labelText;
  inputWrapper.appendChild(label);

  const error = document.createElement('p');
  error.classList.add('error');
  inputWrapper.appendChild(error);

  return inputWrapper;
}

const userNameWrapper = createInputWrapper('Name', 'name', 'text', true, 2, 25);
formElementsContainer.appendChild(userNameWrapper);

const surnameWrapper = createInputWrapper('Surname', 'surname', 'text', true, 2, 25);
formElementsContainer.appendChild(surnameWrapper);

const birthWrapper = createInputWrapper('Date of Birth', 'birth', 'date', true, undefined, undefined, true);
birthWrapper.firstElementChild.nextElementSibling.classList.add('lable__birth');
formElementsContainer.appendChild(birthWrapper);

const emailWrapper = createInputWrapper('Email', 'email', 'email', true, undefined, undefined, undefined, '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
formElementsContainer.appendChild(emailWrapper);

const passwordWrapper = createInputWrapper('Password', 'password', 'password', false, undefined, undefined, undefined, '^(?=.*[A-Z])(?=.*[1-9])(?=.*[!@#$%]).{8,}$');
formElementsContainer.appendChild(passwordWrapper);

const confirmPasswordWrapper = createInputWrapper('Confirm Password', 'confirm-password', 'password', true);
formElementsContainer.appendChild(confirmPasswordWrapper);

const formSubmitButton = document.createElement('button');
formSubmitButton.classList.add('form__submit');
formSubmitButton.setAttribute('type', 'submit');
formSubmitButton.textContent = 'SIGN UP';
formElementsContainer.appendChild(formSubmitButton);

document.body.appendChild(form);