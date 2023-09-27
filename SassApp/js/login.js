// Alternar entre los formularios de registro e inicio de sesión
document.querySelector('.register-link').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.add('active')
});

document.querySelector('.login-link').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.remove('active')
});

// Crear un elemento para mensajes de error
const errorMsg = document.createElement('p');
errorMsg.className = 'error-message';

// Limpiar los campos de entrada
const clearFields = () => {
  document.querySelectorAll('input').forEach((field) => field.value = '');
  document.querySelector('input[type="checkbox"]').checked = false;
};

// Almacenar o recuperar usuarios desde el almacenamiento local
const storeUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
};

const getRegisteredUsers = () => {
    const usersJSON = localStorage.getItem('registeredUsers');
    return JSON.parse(usersJSON) || [];
};

// Manejar la acción del usuario (registro o inicio de sesión)
const handleUserAction = (isRegister) => {
    const formType = isRegister ? 'register' : 'login';
    const form = document.querySelector(`.${formType}`);
    form.appendChild(errorMsg);
  
    const username = form.querySelector('.input-box input[type="text"]').value;
    const password = form.querySelector('.input-box input[type="password"]').value;
    const rememberMe = form.querySelector('.remember-forgot input[type="checkbox"]').checked;
  
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find(user => user.username === username && user.password === password);
  
    if (isRegister ? password.length < 8 : !foundUser) {
      errorMsg.textContent = isRegister ? "La contraseña debe tener al menos 8 caracteres." : "Usuario o contraseña incorrectos.";
    } 
    else {
        if (rememberMe) {
            localStorage.setItem('connected', 'true');
        } 
        else {
            sessionStorage.setItem('connected', 'true');
        }

        if (isRegister) {
            const newUser = { username, password };
            registeredUsers.push(newUser);
            storeUsers(registeredUsers);
        }
        clearFields();
        window.location.href = "../html/index.html";
    }
};
  
// Event listeners para los botones de registro e inicio de sesión
document.getElementById('register').addEventListener('submit', (event) => {
    event.preventDefault();
    handleUserAction(true);
});

document.getElementById('login').addEventListener('submit', (event) => {
    event.preventDefault();
    handleUserAction(false);
});

