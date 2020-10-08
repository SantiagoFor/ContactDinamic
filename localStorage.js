    window.onload= cargaDatos();
    function nuevo(){
        let formulario=`
        <div class="card border-dark mb-12" style="margin-top: 10px">
            <div class="card-body">           
                <form>
                    <div class="form-row">
                        <div class=" col-3">
                        <label>NOMBRE:</label>
                        <label>CELULAR:</label> 
                        <label> DIRECCION: </label>
                        </div>
                        <div class=" col-6">
                            <input type="text" required class="form-control form-control-sm" placeholder="NOMBRE" id="nombre">                       
                            <input type="number"class="form-control form-control-sm" placeholder="CELULAR" id="celular">
                            <input type="text" class="form-control form-control-sm" placeholder="DIRECCION" id="direccion">   
                        </div>  
                    </div>
                </form>
                            <button type="button" class="offset-3  btn btn-sm btn-info"onclick="validate()">Guardar</button>
                            <button type="button" class="btn btn-sm btn-danger"onclick="cancelar()">Cancelar</button>
            </div>  
        </div>`;
    document.getElementById('agregar').innerHTML = formulario;
    }
    function showFilters(){
        let input =`
        <div class="input-group mb-3 rounded-pill">
            <input type="text" class="form-control rounded-pill" placeholder="Celular" id="buscaCelular" name="buscaCelular">
            <input type="text" class="form-control rounded-pill" placeholder="Direccion" id="buscaDireccion" name="buscaDireccion">                               
        </div>
    `;
    document.getElementById('filtros').innerHTML = input;
    }
    function validate(){
        var nombre=document.getElementById("nombre").value;
        var celular=document.getElementById("celular").value;
        var direccion=document.getElementById("direccion").value;
        if(nombre==""){
            alert("Debe ingresar nombre");
        }
        if(celular==""){
            alert("Debe ingresar celular ");
        }else if(celular.length<6 || celular.length>10){
            alert("El celular debe tener entre 6 y 10 numeros");
        }
        if(direccion==""){
            alert("Debe ingresar la Direccion");
        }
        guardarDato();
    }
    function cancelar(){
        document.getElementById('agregar').innerHTML = "";
    }
    function guardarDato() {
        const nombre = document.getElementById("nombre").value.toUpperCase();
        const celular = document.getElementById("celular").value.toUpperCase();
        const direccion =document.getElementById("direccion").value.toUpperCase();
        const datos = {
            'celular': celular,
            'direccion': direccion
        };
        localStorage.setItem(nombre, JSON.stringify(datos));
        document.getElementById("nombre").value = "";
        document.getElementById("celular").value = "";
        document.getElementById("direccion").value = "";
        formulario="";
        document.getElementById('agregar').innerHTML = formulario;
       cargaDatos();
    }
    function eliminarDato(key) {
        localStorage.removeItem(key);
       cargaDatos();
    }
    function editar(dato){
        const nombre = dato;
        const celular = document.getElementById("celular".concat(dato)).value;
        const direccion = document.getElementById("direccion".concat(dato)).value;
        const datos = {
            'celular': celular,
            'direccion': direccion
        };
        localStorage.setItem(nombre, JSON.stringify(datos));
        cargaDatos();
    }
    function cargaDatos(){
        let elementos = "";
        if (localStorage.length === 0) {
            elementos += 'Sin Contactos';
        } else {
            for (let i = 0; i <= localStorage.length - 1; i++) {
                const key = localStorage.key(i);
                let datos = localStorage.getItem(key);
                datos = JSON.parse(datos);
                elementos += `
                <div class="card border-dark mb-12" style="margin-top: 10px">
                    <div class="card-body">
                        <form>
                            <div class="form-row">
                                <div class=" col-3">
                                    <label>NOMBRE:</label>
                                    <label>CELULAR:</label>
                                    <label>DIRECCION:</label>
                                </div>
                                <div class=" col-6">
                                    <input type="text" class="form-control form-control-sm" value="${key}" id="${key}" name="${key}">
                                    <input type="text" class="form-control form-control-sm" value="${datos.celular}" id="celular${key}">                                         
                                    <input type="text" class="form-control form-control-sm" value="${datos.direccion}" id="direccion${key}">
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class=" btn btn-sm btn-danger" onclick="eliminarDato('${key}')"> Eliminar</button>    <br>
                                    <button type="button" class="btn btn-sm btn-warning" onclick="editar('${key}')"> Editar</button> </th>
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
        let mensage = "";
        campobuscabusqueda = "";
        campobuscacelular = "";
        campobuscaDireccion = "";
        if(document.getElementById("busqueda")!=null){
            campobusqueda = document.getElementById("busqueda").value.toUpperCase();
        }
        if(document.getElementById("buscaDireccion")!=null){
            campobuscacelular = document.getElementById("buscaCelular").value;
            campobuscaDireccion = document.getElementById("buscaDireccion").value.toUpperCase();
        }
        if (localStorage.length === 0) {
            elementos += 'Sin Contactos';
        } else {
            var resultados=0;
                for (let i = 0; i <= localStorage.length - 1; i++) {
                    const key = localStorage.key(i);
                    let datos = localStorage.getItem(key);
                    let data = localStorage.getItem(key);
                    console.log();
                    datos = JSON.parse(datos);             
                    if(0<=key.indexOf(campobusqueda) && 0<=data.indexOf(campobuscacelular) && 0<=data.indexOf(campobuscaDireccion)){
                        resultados=1+resultados;
                        console.log("Encontrado");
                        elementos += `
                        <div class="card border-dark mb-12" style="margin-top: 10px">
                            <div class="card-body">
                                <form>
                                    <div class="form-row">
                                        <div class=" col-3">
                                            <label>NOMBRE:</label>
                                            <label>CELULAR:</label>
                                            <label>DIRECCION:</label>
                                        </div>
                                        <div class=" col-6">
                                            <input type="text" class="form-control form-control-sm" value="${key}" id="${key}" name="${key}">
                                            <input type="text" class="form-control form-control-sm" value="${datos.celular}" id="celular${key}">                                         
                                            <input type="text" class="form-control form-control-sm" value="${datos.direccion}" id="direccion${key}">
                                        </div>
                                        <div class="col-md-2">
                                            <button type="button" class=" btn btn-sm btn-danger" onclick="eliminarDato('${key}')"> Eliminar</button>    <br>
                                            <button type="button" class="btn btn-sm btn-warning" onclick="editar('${key}')"> Editar</button> </th>
                                        </div>
                                    </div> 
                                </form>       
                            </div>   
                        </div>
                    `;
                    document.getElementById('contactos').innerHTML = elementos;
                    }
                }
                if(resultados===0){
                    alert("No encontramos lo que buscabas");
                    cargaDatos();
                 }else{
                    alert("Encontramos "+resultados+" resultados");
                 }
                document.getElementById("busqueda").value = null;
                document.getElementById('filtros').innerHTML = "";
        }
    }


    