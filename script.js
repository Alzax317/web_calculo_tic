/** @type {HTMLElement}*/
var posElt;
/** @type {HTMLElement} */
var posLinkElt;


window.addEventListener('load', function(){
    posElt = document.getElementById('Pos');
    posLinkElt = document.querySelector('#PosLink > a');
    navigator.geolocation.getCurrentPosition(geoposOK, geoposKO);
});

/** @param {GeolocationPosition} pos */
function geoposOK(pos) {

    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;

    posElt.textContent = `${lat}, ${long}`;

    posLinkElt.href = `https://maps.google.com/?q=${lat},${long}`;
    posLinkElt.textContent = 'Mostrar tu posición en un mapa';
}

/** @param {GeolocationPositionError} err */
function geoposKO(err) {
    console.warn(err.message);
    let msg;
    switch(err.code) {
        case err.PERMISSION_DENIED:
            msg = "No nos has dado permiso para obtener tu ubicación.";
            break;
        case err.POSITION_UNAVAILABLE:
            msg = "Tu posición actual no está disponible.";
            break;
         case err.TIMEOUT:
             msg = "No se ha podido obtener tu posición en un tiempo prudencial.";
             break;
         default:
             msg = "Error desconocido.";
             break;
    }
    posElt.textContent = msg;
}