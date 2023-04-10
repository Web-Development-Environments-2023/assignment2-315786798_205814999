

if(isLoggedIn() && localStorage.getItem('username') != 'null'){
  const loginmenu = document.getElementById('loginmenu');
  loginmenu.innerHTML = 'Logout '+localStorage.getItem('username');
}


function showDiv(id) {
    if (id=='register' && isLoggedIn()) { 
      alert("You cannot register while logged in."); 
      return;
    }
    if(id=='login'){
      if(checkLogin()){    
        showDiv('welcome');
        return;
      }else{
        localStorage.setItem('resthighscores', 'true');
      }
        
    }
    const divs = document.getElementsByClassName('content');
  
    // Loop through the divs and hide them
    for (let i = 0; i < divs.length; i++) {
      divs[i].style.display = 'none';
    }
  
    // Show the div with the corresponding ID
    const div = document.getElementById(id);
    div.style.display = 'block';
  }
showDiv('welcome')
function showGame() {
  // Check if player is logged in
  if (isLoggedIn()) {
    // Show configuration options
    showDiv('config');
  } else {
    // Redirect to login page
    showDiv('login');
  }
}

function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') == 'true'
}

function checkLogin(){
  if(localStorage.getItem('isLoggedIn')=='true'){
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('username', null);
    const loginmenu = document.getElementById('loginmenu');
    loginmenu.innerHTML = 'Login';
    return true;
  }
  return false;
}

