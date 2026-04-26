// public/js/registerValidation.js

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

    form.addEventListener('submit', (evento) => {
        let errores = false;

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailVal === '') {
            errorEmail.innerText = 'El email no puede estar vacío.';
            errores = true;
        } else if (!emailRegex.test(emailVal)) {
            errorEmail.innerText = 'Debes ingresar un email válido.';
            errores = true;
        }

        // 4. Validar Contraseña (Versión Mejorada)
        const passVal = inputPassword.value.trim();
        const tieneLetra = /[a-zA-Z]/.test(passVal);
        const tieneNumero = /[0-9]/.test(passVal);
        const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(passVal);
        const passLower = passVal.toLowerCase();

        // Lista de palabras prohibidas
        const prohibidas = ["password", "1234", "qwerty", "camisetasfc"];
        if (nombreVal !== '') {
            prohibidas.push(nombreVal.toLowerCase());
        }

        if (passVal === '') {
            errorPassword.innerText = 'La contraseña no puede estar vacía.';
            errores = true;
        } else if (passVal.length < 8) {
            errorPassword.innerText = 'La contraseña debe tener al menos 8 caracteres.';
            errores = true;
        } else {
            let contieneProhibida = false;
            for (let i = 0; i < prohibidas.length; i++) {
                if (passLower.includes(prohibidas[i])) {
                    errorPassword.innerText = `La contraseña es muy débil (no puede contener "${prohibidas[i]}").`;
                    errores = true;
                    contieneProhibida = true;
                    break;
                }
            }

            if (!contieneProhibida) {
                if (!tieneLetra || !tieneNumero || !tieneEspecial) {
                    errorPassword.innerText = 'Debe incluir al menos 1 letra, 1 número y 1 carácter especial.';
                    errores = true;
                } else if (passVal === emailVal) {
                    errorPassword.innerText = 'La contraseña no puede ser igual a tu email.';
                    errores = true;
                }
            }
        }

        // Si hubo algún error, frenamos el envío
        if (errores) {
            evento.preventDefault();
        }
    });
});