const urldw = 'http://localhost:3000/';

function headersdw() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
return headers;
}

//Función generica donde se le pasa el enpoint, el metodo, el body y parametro haciendo una petición a un endpoint del backend//
// esta se utiliza en todo el ciclo de vidad de la paguina//
async function apidw(p_endpoint, p_method, p_body, p_params) {
    try { 
        const header = headersdw();
        const opciones = {
            method: p_method,
            headers: header,
            body: p_body
        } 
        console.log(p_params);
        let resultado, parametro = '';
        if (p_params.trim()!== ''){
            parametro = `/${p_params}`;
        }
        if (p_method === 'GET'){
            resultado= await fetch(urldw + p_endpoint, {headers:header});
        }else {
            console.log(parametro);
            resultado=await fetch(urldw + p_endpoint + parametro, opciones);
        }
        const json = await resultado.json();
        const res = {
            resultado,
            rows: json
        }
return res;

    } catch (error) {
        console.log(error)
        return error
    }
}