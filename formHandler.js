const inputs = document.querySelectorAll('.input');
const userName = userNameWrapper.firstElementChild;
const surname = surnameWrapper.firstElementChild;
const birth = birthWrapper.firstElementChild;
const email = emailWrapper.firstElementChild;
const password = passwordWrapper.firstElementChild;
const confirmPassword = confirmPasswordWrapper.firstElementChild;
let isSubmitable = true;

inputs.forEach(inputs => inputs.value = '');

inputs.forEach(input => input.addEventListener('focus', () => {
  input.nextElementSibling.classList.add('label_focused');
}));

inputs.forEach(input => input.addEventListener('blur', () => {
  !input.value && input.nextElementSibling.classList.remove('label_focused');
}));

const errorOutput = (input, message) => {
  input.addEventListener('input', () => {
    if(!input.checkValidity()) {
      input.nextElementSibling.nextElementSibling.innerText = message;
    } else {
      input.nextElementSibling.nextElementSibling.innerText = '';
    }
  });
};

errorOutput(userName, 'Minimum 2 symbols.');
errorOutput(surname, 'Minimum 2 symbols.');
errorOutput(birth, 'Maximum date - today.');
errorOutput(email, 'Invalid email.');

password.addEventListener('input', () => {
  if (!password.checkValidity()) {
    password.nextElementSibling.nextElementSibling.classList.add('error__password');
    password.nextElementSibling.nextElementSibling.innerText = 'Password must have at least 8 symbols, at least 1 capital letter, at least one digit (1-9), at least 1 special character (!@#$%)';
  } else {
    password.nextElementSibling.nextElementSibling.innerText = '';
    password.nextElementSibling.nextElementSibling.classList.remove('error__password');
  }
});

confirmPassword.addEventListener('input', () => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.nextElementSibling.nextElementSibling.innerText = 'Passwords must match.';
  } else {
    confirmPassword.nextElementSibling.nextElementSibling.innerText = '';
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  inputs.forEach(input => {
    if (!input.value) {
      input.nextElementSibling.nextElementSibling.innerText = 'Must be filled.';
      isSubmitable = false;
    }
  });

  if (!isSubmitable) return;

  const formData = new FormData();
  formData.append('name', userName.value);
  formData.append('surname', surname.value);
  formData.append('birth', birth.value);
  formData.append('email', email.value);
  formData.append('password', password.value);

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .catch(error => console.error(error));  

  console.log('Body: ', formData);
});