
const btnGrabarCiudad = document.getElementById('grabar3');
btnGrabarCiudad.addEventListener('click',(e) => {
//e.preventDefault();
const id_country = document.getElementById('city').value;
const name = document.getElementById('name_city').value;
const body = {
    id_country,
    name
}

//Indentificar metodo post o put//
let id , method = '';
if (document.getElementById('name_city').dataset.id) {
    id = document.getElementById('name_city').dataset.id;
    method = 'PUT';
}else {
   id = '' ;
   method = 'POST';
}

//Funcion generica//
apidw('ciudades', method, JSON.stringify(body), id
).then(resultado => {
    console.log(resultado);
}).catch(error => console.log(error));
},false)

//Cargar Paises//
async function loadCountries() {
    const pais = document.getElementById('city');
    const resultado= await apidw('paises','GET','','');
    resultado.rows.countries.forEach(row=>{
        const elemento=document.createElement('option');
        const textNode = document.createTextNode(row.name);
        elemento.appendChild(textNode);
        elemento.setAttribute('value',row.id_country);
        pais.add(elemento);
        }); 
}
loadCountries();
