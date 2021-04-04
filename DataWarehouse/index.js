var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
    overlay = document.getElementById('overlay'),
    formLogin = document.getElementById('form-login'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');

    btnAbrirPopup.addEventListener('click', function(){
        overlay.classList.add('active');
    });

    btnCerrarPopup.addEventListener('click', function(){
        overlay.classList.remove('active');
    });