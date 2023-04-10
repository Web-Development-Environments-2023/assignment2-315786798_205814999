
const configForm = document.getElementById('config-form');
const remainingTimeDisplay = document.getElementById('time');

const validKeys = [
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab', 'Escape',
    'Space', 'Backspace', 'Delete', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight',
    'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'CapsLock', 'NumLock', 'ScrollLock',
    'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8',
    'Digit9', 'KeyA', 'KeyB', 'KeyC', 'KeyD', 'KeyE', 'KeyF', 'KeyG', 'KeyH', 'KeyI', 'KeyJ',
    'KeyK', 'KeyL', 'KeyM', 'KeyN', 'KeyO', 'KeyP', 'KeyQ', 'KeyR', 'KeyS', 'KeyT', 'KeyU',
    'KeyV', 'KeyW', 'KeyX', 'KeyY', 'KeyZ', 'Semicolon', 'Equal', 'Comma', 'Minus', 'Period',
    'Slash', 'Backquote', 'BracketLeft', 'Backslash', 'BracketRight', 'Quote'
];  

function isValidKey(key) {
    return validKeys.includes(key);
  };

function showValidKeys() {
    alert('Valid Keys: ' + validKeys.join(', '));
};   

configForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent form from submitting
  
    // retrieve values from input fields
    const leftKey = document.getElementById('leftKey').value;
    const rightKey = document.getElementById('rightKey').value;
    const upKey = document.getElementById('upKey').value;
    const downKey = document.getElementById('downKey').value;
    const shootKey = document.getElementById('shootKey').value;
    const remainingTime = parseInt(document.getElementById('remainingTime').value);
  
    // validate key inputs
    if (!isValidKey(leftKey) || !isValidKey(rightKey) || !isValidKey(upKey) || !isValidKey(downKey) || !isValidKey(shootKey)) {
      alert('Invalid key input. Please enter a valid keyboard key.');
      return;
    }
  
    // validate remaining time input
    if (isNaN(remainingTime) || remainingTime % 1 !== 0 ) {
      alert('Invalid remaining time input. Please enter a round integer greater than or equal to 120.');
      return;
    }
  
    // update keyMap object
    keyMap.left = leftKey;
    keyMap.right = rightKey;
    keyMap.up = upKey;
    keyMap.down = downKey;
    keyMap.shoot = shootKey;
  
    // update remaining time display
    remainingTimeDisplay.textContent = `${remainingTime}`;

    const gameContent = document.getElementById('game');
    const config = document.getElementById('config');
    config.style.display = 'none';
    gameContent.style.display = 'block';
    
  });

