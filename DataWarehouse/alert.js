function alertInformation(status, mensaje){
    let classAlert = '';
    switch (status) {
        case 200:
        case 201:
           classAlert = 'alert-success';
            break;
        case 400:
        case 401:
        case 409:
            classAlert = 'alert-error';
            break;
        default:
            break;
    };
const divAlert = document.createElement('div');
divAlert.setAttribute('class', 'alerts ' + classAlert);
divAlert.setAttribute('id','alerts');
const closeAlert = document.createElement('a');
closeAlert.setAttribute('class', 'closeAlert');
const spanCloseAlert = document.createTextNode('x');
closeAlert.addEventListener('click', () => {
    document.getElementById('alerts').remove();
},false);
closeAlert.appendChild(spanCloseAlert);

const strongAlert = document.createElement('strong');
strongAlert.setAttribute('class', 'alert-mensaje');
const textAlert = document.createTextNode(mensaje);
strongAlert.appendChild(textAlert);
divAlert.appendChild(strongAlert);
divAlert.appendChild(closeAlert);
return divAlert;
}