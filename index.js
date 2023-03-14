const form = document.getElementById('myForm');
const table = document.getElementById('dataTable');

// Load data from local storage if it exists
const data = JSON.parse(localStorage.getItem('formData')) || [];
for (const row of data) {
  const newRow = table.insertRow();
  const nameCell = newRow.insertCell();
  const emailCell = newRow.insertCell();
  const passwordCell = newRow.insertCell();
  const birthdateCell = newRow.insertCell();
  const acceptTermsCell = newRow.insertCell();
  nameCell.textContent = row.name;
  emailCell.textContent = row.email;
  passwordCell.textContent = row.password;
  birthdateCell.textContent = row.birthdate;
  acceptTermsCell.textContent = row.acceptTerms ? "Yes" : "No";
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const birthdate = document.getElementById('birthdate').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;

  if (validateForm()) { // Only add row to table if form is valid
    const newRow = table.insertRow();
    const nameCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const passwordCell = newRow.insertCell();
    const birthdateCell = newRow.insertCell();
    const acceptTermsCell = newRow.insertCell();
    nameCell.textContent = name;
    emailCell.textContent = email;
    passwordCell.textContent = password;
    birthdateCell.textContent = birthdate;
    acceptTermsCell.textContent = acceptTerms ? "Yes" : "No";

    // Save data to local storage
    const data = JSON.parse(localStorage.getItem('formData')) || [];
    data.push({ name, email, password, birthdate, acceptTerms });
    localStorage.setItem('formData', JSON.stringify(data));

    // Clear form values
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('birthdate').value = '';
    document.getElementById('acceptTerms').checked = false;
  }
});
            

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const birthdate = document.getElementById('birthdate').value;

  if (name === '') {
    alert('Please enter your name');
    return false;
  }

  if (email === '') {
    alert('Please enter your email');
    return false;
  } else if (!validateEmail(email)) {
    alert('Please enter a valid email');
    return false;
  }

  if (password === '') {
    alert('Please enter a password');
    return false;
  } else if (password.length < 6) {
    alert('Password must be at least 6 characters long');
    return false;
  }

  if (birthdate === '') {
    alert('Please enter your birthdate');
    return false;
  } else if (!validateDate(birthdate)) {
    alert('Please enter a valid date in the format YYYY-MM-DD');
    return false;
  }

  if (!document.getElementById('acceptTerms').checked) {
    alert('Please accept the terms and conditions');
    return false;
  }

  return true;
}

function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

function validateDate(date) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return false;
  }
  const year = parseInt(date.substr(0, 4));
  const month = parseInt(date.substr(5, 2));
  const day = parseInt(date.substr(8, 2));
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day);
  const minAgeDate = new Date();
  minAgeDate.setFullYear(minAgeDate.getFullYear() - 55); // 55 years ago
  const maxAgeDate = new Date();
  maxAgeDate.setFullYear(maxAgeDate.getFullYear() - 18); // 18 years ago
  
  // Check if age is from 18 to 55 years
  const age = currentDate.getFullYear() - inputDate.getFullYear();
  if (age < 18) {
    alert('You must be at least 18 years old to register');
    return false;
  } else if (age > 55) {
    alert('You must be younger than 55 years old to register');
    return false;
  }
  
  return true;
}

