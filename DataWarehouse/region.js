const btnGrabar = document.getElementById('grabar');
btnGrabar.addEventListener('click',(e) => {
//e.preventDefault();
const name = document.getElementById('name').value;
const body = {
    name
}

let id , method = '';
if (document.getElementById('name').dataset.id) {
    id = document.getElementById('name').dataset.id;
    method = 'PUT';
}else {
   id = '' ;
   method = 'POST';
}

apidw('regiones', 'POST', JSON.stringify(body), id
).then(resultado => {
    console.log(resultado);
}).catch(error => console.log(error));
},false)
