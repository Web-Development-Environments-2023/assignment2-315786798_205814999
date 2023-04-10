let userCredentials = {
    'p': 'testuser',
  };
//localStorage.setItem('isLoggedIn', 'false');
function isValidCredentials(username, password) {
return userCredentials[username] === password;
}

function registerUser(username, password) {
// Check if username already exists in the userCredentials object
if (userCredentials.hasOwnProperty(username)) {
    return false; // Username already exists, registration failed
} else {
    // Add new username and password to the userCredentials object
    userCredentials[username] = password;
    return true; // Registration successful
}
}
const loginForm = document.getElementById('login');
const config = document.getElementById('config');

// Add a submit event listener to the login form
loginForm.addEventListener('submit', (event) => {
    // Prevent the form from submitting and reloading the page
    event.preventDefault();
    
    // Retrieve the username and password inputs
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    // Check if the username and password are correct
    if (isValidCredentials(usernameInput.value,passwordInput.value)) {
      // Save the login status to local storage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', usernameInput.value);
      
      // Hide the login form and show the game content
      loginForm.style.display = 'none';
      config.style.display = 'block';

      const loginmenu = document.getElementById('loginmenu');
      loginmenu.innerHTML = 'Logout:'+usernameInput.value;
    } else {
      // Show an error message if the username or password are incorrect
      alert('Invalid username or password');
    }
  });


  function validateForm() {
    // Get form input values
    const username = document.getElementById("username-register").value;
    const password = document.getElementById("password-register").value;
    const passwordValidation = document.getElementById("password-validation").value;
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const birthday = document.getElementById("birthday").value;
    // Check if any fields are empty
    if (!username || !password || !passwordValidation || !firstName || !lastName || !email || !birthday) {
      alert("Please fill in all fields.");
      return false;
    }
  
    // Check password contains characters and numbers and is at least 8 characters long
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must contain at least 8 characters, including letters and numbers.");
      return false;
    }
  
    // Check first and last names don't contain numbers
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      alert("First and last names can only contain letters.");
      return false;
    }
  
    // Check email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
  
    // Check password and password validation are the same
    if (password !== passwordValidation) {
      alert("Passwords do not match.");
      return false;
    }
  
    if(!registerUser(username, password)){
      alert("username already exists.");
      return false;
    }
    alert("sucsfully registered.")
    return true;
  }

  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", function(event) {
    event.preventDefault();
  });
  