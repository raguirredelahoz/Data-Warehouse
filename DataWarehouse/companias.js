const btnGrabar = document.getElementById('grabar');
btnGrabar.addEventListener('click',(e) => {
//e.preventDefault();
const name = document.getElementById('name').value;
const address = document.getElementById('address').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const cities_id = document.getElementById('cities').value;
const body = {
    name,
    address,
    email,
    phone,
    cities_id
}
let id , method = '';
if (document.getElementById('name').dataset.id) {
    id = document.getElementById('name').dataset.id;
    method = 'PUT';
}else {
   id = '' ;
   method = 'POST';
}

const mainCompania = document.getElementById('companias')
apidw('companias', method, JSON.stringify(body),id
).then(result => {
    console.log(result.resultado.status);
    let alerta = '';
    if (result.resultado.status === 201|| result.resultado.status === 200){
        alerta = alertInformation(201, 'Compañia creada correctamente');
        document.getElementById('name').removeAttribute('data-id');
    }else {
        alerta = alertInformation(409, 'Error al crear la Compañia');
    }
    mainCompania.appendChild(alerta);
}).catch(error => {
    console.log(error)
    const alertaError = alertInformation(409, 'Error al crear la Compañia');
    mainCompania.appendChild(alertaError);
});  
},false)

async function loadCities() {
    const ciudad = document.getElementById('cities');
    const resultado= await apidw('ciudades','GET','','');
    console.log(resultado);
    resultado.rows.city.forEach(row=>{
        const elemento=document.createElement('option');
        const textNode = document.createTextNode(row.name);
        elemento.appendChild(textNode);
        elemento.setAttribute('value',row.id);
        ciudad.add(elemento);
        }); 
}
loadCities();
