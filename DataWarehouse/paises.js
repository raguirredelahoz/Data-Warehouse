const btnGrabarPais = document.getElementById('grabar2');
btnGrabarPais.addEventListener('click',(e) => {
//e.preventDefault();
const id_region = document.getElementById('region').value;
const name = document.getElementById('name_country').value;
const body = {
    id_region,
    name
}
let id , method = '';
if (document.getElementById('name_country').dataset.id) {
    id = document.getElementById('name_country').dataset.id;
    method = 'PUT';
}else {
   id = '' ;
   method = 'POST';
}

apidw('paises', 'POST', JSON.stringify(body), id
).then(resultado => {
    console.log(resultado);
}).catch(error => console.log(error));
},false)

async function loadRegions() {
    const region = document.getElementById('region');
    const resultado= await apidw('regiones','GET','','');
    console.log(resultado);
    resultado.rows.regions.forEach(row=>{
        const elemento=document.createElement('option');
        const textNode = document.createTextNode(row.name);
        elemento.appendChild(textNode);
        elemento.setAttribute('value',row.id_region);
        region.add(elemento);
        }); 
}
loadRegions();
