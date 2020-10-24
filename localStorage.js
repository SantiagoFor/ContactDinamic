window.onload = cargaDatos();

function nuevo() {
    document.getElementById("nuevo").setAttribute("type", "hidden");
    document.getElementById("agregar").style.display = "";
    document.getElementById("cancelar").addEventListener("click", function() {
        document.getElementById("agregar").style.display = "none";
        document.getElementById("nuevo").setAttribute("type", "button");
    });
}

function validate() {
    let nombre = document.getElementById("nombre").value;
    let celular = document.getElementById("celular").value;
    let direccion = document.getElementById("direccion").value;
    let lat = document.getElementById("latitud").value;
    let errores = 0;
    if (!/^[a-zA-Z0-9]{3,10}/.test(nombre)) {
        alert("el nombre debe ser minimo de 3 letras");
        errores = 1;
    }
    if (!/\d{7,10}$/.test(celular)) {
        alert("El celular debe tener entre 7 y 10 numeros");
        errores = 1;
    }
    if (!/^[a-zA-Z0-9\#\,\.\-\_]{2,4}[a-zA-Z0-9\#\,\.\-\_\s]{8,18}/.test(direccion)) {
        alert("La direccion debe tener minimo 10 caracteres");
        errores = 1;
    }
    if (lat == "") {
        alert("Debe selecionar una ubicacion en el mapa");
        errores = 1;
    }
    if (errores == 0) {

        guardarDato();
    }
}

function guardarDato() {
    var acumulador = parseInt(localStorage.getItem("acumulador"));
    for (let i = 0; i <= localStorage.length - 1; i++) {
        let key = localStorage.key(i);
        if (key == "acumulador") { continue; }
        if (parseInt(acumulador) <= parseInt(key)) {
            acumulador = parseInt(acumulador) + parseInt(key) + 1;
        }
    }
    localStorage.setItem("acumulador", acumulador);
    let nombre = document.getElementById("nombre").value.toUpperCase();
    let celular = document.getElementById("celular").value;
    let direccion = document.getElementById("direccion").value.toUpperCase();
    let latitud = document.getElementById("latitud").value;
    let longitud = document.getElementById("longitud").value;
    let datos = {
        'nombre': nombre,
        'celular': celular,
        'direccion': direccion,
        'locations': {
            'lat': latitud,
            'lng': longitud
        }
    };
    localStorage.setItem(localStorage.getItem("acumulador"), JSON.stringify(datos));
    document.getElementById("nombre").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("agregar").style.display = "none";
    document.getElementById("nuevo").setAttribute("type", "button");
    cargaDatos();
    initMap();
}

function eliminarDato(key) {
    if (confirm("Esta seguro de eliminar a ".concat(document.getElementById('nombre'.concat(key)).value))) {
        localStorage.removeItem(key);
    }
    cargaDatos();
}

function editar(dato) {
    let ID = dato;
    let nombrecampo = document.getElementById("nombre".concat(dato)).value.toUpperCase();
    let celular = document.getElementById("celular".concat(dato)).value;
    let direccion = document.getElementById("direccion".concat(dato)).value.toUpperCase();
    let latitud = document.getElementById("latitud").value ? document.getElementById("latitud").value : document.getElementById("latitud".concat(dato)).value;
    let longitud = document.getElementById("longitud").value ? document.getElementById("longitud").value : document.getElementById("longitud".concat(dato)).value;
    let errores = 0;

    if (!/^[a-zA-Z0-9]{3,10}/.test(nombrecampo)) {
        alert("el nombre debe ser minimo de 3 letras");
        errores = 1;
    }
    if (!/\d{7,10}$/.test(celular)) {
        alert("El celular debe tener entre 7 y 10 numeros");
        errores = 1;
    }
    if (!/^[a-zA-Z0-9\#\,\.\-\_]{2,4}[a-zA-Z0-9\#\,\.\-\_\s]{8,18}/.test(direccion)) {
        alert("La direccion debe tener minimo 10 caracteres");
        errores = 1;
    }

    if (errores == 0) {
        alert("Cambios Realizados correctamente");

        let datos = {
            'nombre': nombrecampo,
            'celular': celular,
            'direccion': direccion,
            'locations': {
                'lat': latitud,
                'lng': longitud
            }
        };
        localStorage.setItem(ID, JSON.stringify(datos));

        initMap();
        cargaDatos();
    }
}

function cargaDatos() {
    document.getElementById("agregar").style.display = "none";
    let elementos = "";
    if (localStorage.length === 0) {
        elementos += 'Sin Contactos';
    } else {
        for (let i = 0; i <= localStorage.length - 1; i++) {
            let key = localStorage.key(i);
            let datos = localStorage.getItem(key);
            datos = JSON.parse(datos);
            if (key == "acumulador") { continue; }
            elementos += `
            <div class="card targeta border-dark mb-12">
                <div class="card-body">
                    <form>
                        <div class="form-row">
                            <div class=" col-3"><label>NOMBRE:</label><br><label>CELULAR:</label> <br><label> DIRECCION: </label><br><label> LATITUD: </label><br><label> LONGITUD: </label></div>
                            <div class=" col-6">
                                <input type="text" class="form-control form-control-sm" value="${datos.nombre}" id="nombre${key}" name="${key}">
                                <input type="number" class="form-control form-control-sm" value="${datos.celular}" id="celular${key}">                                         
                                <input type="text" class="form-control form-control-sm" value="${datos.direccion}" id="direccion${key}">
                                <input type="text" readonly class="form-control form-control-sm" value="${datos.locations.lat}" id="latitud${key}">
                                <input type="text" readonly class="form-control form-control-sm" value="${datos.locations.lng}" id="longitud${key}">
                            </div>
                            <div class="col-md-3">
                                <button type="button" class=" btn btn-sm btn-danger" onclick="eliminarDato('${key}')"> Eliminar</button>    <br>
                                <button type="button" class="btn btn-sm btn-warning" onclick="editar('${key}')"> Editar</button> 
                                
                            </div>
                        </div> 
                    </form>       
                </div>   
            </div>
            `;
        }
        document.getElementById('contactos').innerHTML = elementos;
    }
}

function Buscar() {
    let elementos = "";
    campobuscabusqueda = "";
    if (document.getElementById("busqueda") != null) {
        campobusqueda = document.getElementById("busqueda").value.toUpperCase();
    }
    if (localStorage.length === 0) {
        elementos += 'Sin Contactos';
    } else {
        var resultados = 0;
        for (let i = 0; i <= localStorage.length - 1; i++) {
            let key = localStorage.key(i);
            let datos = localStorage.getItem(key);
            let data = localStorage.getItem(key);
            if (key == "acumulador") { continue; }
            datos = JSON.parse(datos);
            if (0 <= key.indexOf(campobusqueda) || 0 <= data.indexOf(campobusqueda)) {
                resultados = 1 + resultados;
                elementos += `
                    <div class="card targeta border-dark mb-12" >
                        <div class="card-body">
                            <form>
                                <div class="form-row">
                                    <div class=" col-3"><label>NOMBRE:</label><br><label>CELULAR:</label> <br><label> DIRECCION: </label><br><label> LATITUD: </label><br><label> LONGITUD: </label></div>
                                    <div class=" col-6">
                                    <input type="text" class="form-control form-control-sm" value="${datos.nombre}" id="nombre${key}" name="${key}">
                                        <input type="number" class="form-control form-control-sm" value="${datos.celular}" id="celular${key}">                                         
                                        <input type="text" class="form-control form-control-sm" value="${datos.direccion}" id="direccion${key}">
                                        <input type="text" readonly class="form-control form-control-sm" value="${datos.locations.lat}" id="latitud${key}">
                                        <input type="text" readonly class="form-control form-control-sm" value="${datos.locations.lng}" id="longitud${key}">
                                    </div>
                                    <div class="col-md-2">
                                        <button type="button" class=" btn btn-sm btn-danger" onclick="eliminarDato('${key}')"> Eliminar</button>    <br>
                                        <button type="button" class="btn btn-sm btn-warning" id="editar" onclick="editar('${key}')"> Editar</button> 
                                    </div>
                                </div> 
                            </form>       
                        </div>   
                    </div>
                `;
                document.getElementById('contactos').innerHTML = elementos;
            }
        }
        if (resultados === 0) {
            alert("No encontramos lo que buscabas");
            cargaDatos();
        } else {
            alert("Encontramos " + resultados + " resultados");
        }
        document.getElementById("busqueda").value = null;
        document.getElementById('filtros').innerHTML = "";
    }
}

function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 4.6097100, lng: -74.0817500 },
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
    });

    marcador = new google.maps.Marker({
        map: map,
        draggable: true,
        position: new google.maps.LatLng(4.7041542473623235, -74.07351025390626)
    });
    marcador.addListener('dragend', function(event) {
        document.getElementById("latitud").value = this.getPosition().lat();
        document.getElementById("longitud").value = this.getPosition().lng();
    });
    marcador.addListener('dragend', function(event) {
        if (document.getElementById("latitudnew")) {
            document.getElementById("latitudnew").value = this.getPosition().lat();
            document.getElementById("longitudnew").value = this.getPosition().lng();
        }
    });

    document.getElementById("geozona").addEventListener('click', function(event) {
        document.getElementById("geozona").setAttribute("type", "hidden");
        if (document.getElementById("geozona").type == "hidden") {
            document.getElementById("quitar").setAttribute("type", "button");
        } else {
            document.getElementById("quitar").setAttribute("type", "hidden");
        }
        var cityCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            editable: true,
            draggable: true,
            map,
            center: { lat: 4.6097100, lng: -74.0817500 },
            radius: 6000,
        });
        document.getElementById("quitar").addEventListener('click', function() {
            cityCircle.setMap(null);
            cargaDatos();
            document.getElementById("geozona").setAttribute("type", "button");
            document.getElementById("quitar").setAttribute("type", "hidden");
        });
        let maxRadius = 10000;

        google.maps.event.addListener(cityCircle, 'radius_changed', function() {
            if (this.getRadius() > maxRadius) {
                this.setRadius(maxRadius);
                alert("radio maximo 10000 metros");
            }
        });
        cityCircle.addListener('bounds_changed', function(event) {
            document.getElementById("agregar").style.display = "none";
            let elementos = "";
            document.getElementById('contactos').innerHTML = elementos;
            bounds = cityCircle.getBounds();
            for (let i = 0; i <= localStorage.length - 1; i++) {
                let key = localStorage.key(i);
                if (key == "acumulador") { continue; }
                let datos = localStorage.getItem(key);
                datos = JSON.parse(datos);
                var latitud = parseFloat(datos.locations.lat);
                var longitud = parseFloat(datos.locations.lng);

                coordenadas = new google.maps.LatLng(latitud, longitud);
                if (bounds.contains(coordenadas)) {
                    elementos += `
                        <div class="card targeta border-dark mb-12" >
                            <div class="card-body">
                                <form>
                                    <div class="form-row">
                                    <div class=" col-3"><label>NOMBRE:</label><br><label>CELULAR:</label> <br><label> DIRECCION: </label><br><label> LATITUD: </label><br><label> LONGITUD: </label></div>
                                        <div class=" col-6">
                                        <input type="text" class="form-control form-control-sm" value="${datos.nombre}" id="nombre${key}" name="${key}">
                                            <input type="number" class="form-control form-control-sm" value="${datos.celular}" id="celular${key}">                                         
                                            <input type="text" class="form-control form-control-sm" value="${datos.direccion}" id="direccion${key}">
                                            <input type="text" readonly class="form-control form-control-sm" value="${datos.locations.lat}" id="latitud${key}">
                                            <input type="text" readonly class="form-control form-control-sm" value="${datos.locations.lng}" id="longitud${key}">
                                        </div>
                                        <div class="col-md-2">
                                            <button type="button" class=" btn btn-sm btn-danger" onclick="eliminarDato('${key}')"> Eliminar</button><br>
                                            <button type="button" class="btn btn-sm btn-warning" onclick="editar('${key}')"> Editar</button> 
                                        </div>
                                    </div> 
                                </form>       
                            </div>   
                        </div>
                    `;
                    document.getElementById('contactos').innerHTML = elementos;
                }
            }

        });
    });

    for (let i = 0; i <= localStorage.length - 1; i++) {

        let key = localStorage.key(i);
        if (key == "acumulador") { continue; }
        let datos = localStorage.getItem(key);
        datos = JSON.parse(datos);
        var latitud = parseFloat(datos.locations.lat);
        var longitud = parseFloat(datos.locations.lng);
        var ubicacion = { lat: latitud, lng: longitud };
        var marker = new google.maps.Marker({
            position: ubicacion,
            map: map,
            title: datos.nombre,
            icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ddd'
        });
    }




}