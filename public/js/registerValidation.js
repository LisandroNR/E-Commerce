// public/js/registerValidation.js

// Esperamos a que todo el HTML cargue
window.addEventListener('load', () => {
    const form = document.querySelector('#registerForm');
    
    // Capturamos los inputs
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');

    // Capturamos los spans para los errores
    const errorNombre = document.querySelector('#errorNombre');
    const errorApellido = document.querySelector('#errorApellido');
    const errorEmail = document.querySelector('#errorEmail');
    const errorPassword = document.querySelector('#errorPassword');

    // Escuchamos el evento 'submit' (cuando tocan el botón Crear Cuenta)
    form.addEventListener('submit', (evento) => {
        
        let errores = false; // Bandera para saber si hay errores

        // Limpiamos errores previos
        errorNombre.innerText = '';
        errorApellido.innerText = '';
        errorEmail.innerText = '';
        errorPassword.innerText = '';

        // 1. Validar Nombre
        const nombreVal = inputNombre.value.trim();
        if (nombreVal === '') {
            errorNombre.innerText = 'El nombre no puede estar vacío.';
            errores = true;
        }

        // 2. Validar Apellido
        const apellidoVal = inputApellido.value.trim();
        if (apellidoVal === '') {
            errorApellido.innerText = 'El apellido no puede estar vacío.';
            errores = true;
        }

        // 3. Validar Email
        const emailVal = inputEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para email
        if (emailVal === '') {
            errorEmail.innerText = 'El email no puede estar vacío.';
            errores = true;
        } else if (!emailRegex.test(emailVal)) {
            errorEmail.innerText = 'Debes ingresar un email válido.';
            errores = true;
        }

        // 4. Validar Contraseña
        const passVal = inputPassword.value.trim();
        const tieneLetra = /[a-zA-Z]/.test(passVal);
        const tieneNumero = /[0-9]/.test(passVal);
        const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(passVal);
        const passLower = passVal.toLowerCase();

        // Cadenas prohibidas
        const prohibidas = ["password", "1234", "qwerty", "camisetasfc", nombreVal.toLowerCase()];

        if (passVal === '') {
            errorPassword.innerText = 'La contraseña no puede estar vacía.';
            errores = true;
        } else if (passVal.length < 8) {
            errorPassword.innerText = 'La contraseña debe tener al menos 8 caracteres.';
            errores = true;
        } else if (!tieneLetra || !tieneNumero || !tieneEspecial) {
            errorPassword.innerText = 'Debe incluir al menos 1 letra, 1 número y 1 carácter especial.';
            errores = true;
        } else if (passVal === emailVal) {
            errorPassword.innerText = 'La contraseña no puede ser igual a tu email.';
            errores = true;
        } else {
            // Verificar cadenas prohibidas
            for (let i = 0; i < prohibidas.length; i++) {
                if (prohibidas[i] !== '' && passLower.includes(prohibidas[i])) {
                    errorPassword.innerText = `La contraseña no puede contener "${prohibidas[i]}".`;
                    errores = true;
                    break;
                }
            }
        }

        // SI HAY ERRORES, FRENAMOS EL ENVÍO DEL FORMULARIO
        if (errores) {
            evento.preventDefault(); // Esto es literalmente lo que pide la US: "evitarse el envío de la petición"
        }
    });
});