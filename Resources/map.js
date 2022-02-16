
function GetMap() {

    // initialize the map on the "map" div with a given center and zoom

    var map = L.map('map').setView([18.483402, -69.929611], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var obj = JSON.parse(localStorage.getItem("Data"));
    var arr = Array.from(obj);

    arr.forEach(element => {

        var marker = L.marker([element.latitud, element.longitud]);
        var fullword = `Titulo: ${element.titulo}\n Fecha: ${element.fecha}\n Tipo:  ${element.selected}\n Descripcion: ${element.descripcion}\n  Lugar: ${element.lugar}\n Lat: ${element.latitud}\n Long: ${element.longitud}\n ${element.muertos}\n ${element.heridos}`;
        console.log(fullword);
        marker.bindPopup(fullword);


        marker.addTo(map);


    });


}

