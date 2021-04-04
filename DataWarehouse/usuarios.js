const btnGrabar = document.getElementById('grabar');
btnGrabar.addEventListener('click',(e) => {
//e.preventDefault();
const first_name = document.getElementById('first_name').value;
const last_name = document.getElementById('last_name').value;
const email = document.getElementById('email').value;
const profile = document.getElementById('profile').value;
const password = document.getElementById('password').value;
const body = {
    first_name,
    last_name,
    email,
    password,
    profile
}
let id , method = '';
if (document.getElementById('first_name').dataset.id) {
    id = document.getElementById('first_name').dataset.id;
    method = 'PUT';
}else {
   id = '' ;
   method = 'POST';
}

apidw('usuarios', 'POST', JSON.stringify(body), id
).then(resultado => {
    console.log(resultado);
}).catch(error => console.log(error));
},false)

/*const mainUsuario = document.getElementById('usuarios')
apidw('usuarios', method, JSON.stringify(body),id
).then(result => {
    console.log(result.resultado.status);
    let alerta = '';
    if (result.resultado.status === 201|| result.resultado.status === 200){
        alerta = alertInformation(201, 'Usuario creado correctamente');
        document.getElementById('name').removeAttribute('data-id');
    }else {
        alerta = alertInformation(409, 'Error al crear un Usuario');
    }
    mainUsuario.appendChild(alerta);
}).catch(error => {
    console.log(error)
    const alertaError = alertInformation(409, 'Error al crear un Usuario');
    mainUsuario.appendChild(alertaError);
});  
},false)*/
