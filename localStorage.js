    function nuevo(){
        let formulario=`
        <table>
            <tr>
                <th>
                
                    Nombre:
                    <input type="text" class="form-control" placeholder="Nombre" id="nombre">
                    <br>
                    Numero:
                    <input type="text" class="form-control" placeholder="Movil" id="celular">
                    <br>
                    Direccion:
                    <input type="text" class="form-control" placeholder="Direccion" id="direccion" >
                    <br>
                <button type="button" onclick="guardarDato()">Guardar</button>
                    </th>
                </tr>
            </table>`;

    document.getElementById('agregar').innerHTML = formulario;
    }
    function guardarDato() {
        const nombre = document.getElementById("nombre").value;
        const celular = document.getElementById("celular").value;
        const direccion = document.getElementById("direccion").value;
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
        actualizarDatos();
    }
    function eliminarDato(key) {
        localStorage.removeItem(key);
        actualizarDatos();
    }
    function editar(dato){
        //if(dato==document.getElementById(dato).value){
            //const nombre = dato;
        //}else{
           // const nombre =document.getElementById(dato).value;
          //  localStorage.removeItem(dato);
        //    console.log(nombre);
       // }
       const nombre = dato;
        const celular = document.getElementById("celular".concat(dato)).value;
        const direccion = document.getElementById("direccion".concat(dato)).value;
        const datos = {
            'celular': celular,
            'direccion': direccion
        };
        localStorage.setItem(nombre, JSON.stringify(datos));
        actualizarDatos();
    }
    function actualizarDatos() {
        let elementos = "";
        const campobusqueda = document.getElementById("busqueda").value;
        if (localStorage.length === 0) {
            elementos += 'Sin Contactos';
        } else {
            if(campobusqueda===""){
                for (let i = 0; i <= localStorage.length - 1; i++) {
                    const key = localStorage.key(i);
                    let datos = localStorage.getItem(key);
                    datos = JSON.parse(datos);
                    elementos += `
                    <table>
                            <tr>
                                <th>
                                    Nombre:<input type="text" value="${key}" id="${key}" name="${key}"><br>
                                    Celular:<input type="text" value="${datos.celular}" id="celular${key}">
                                    <br>
                                    Direccion:<input type="text" value="${datos.direccion}" id="direccion${key}">
                                    <br>
                                </th>
                                <th>
                                    <button type="button" onclick="eliminarDato('${key}')"> Eliminar</button><br>
                                    <button type="button" onclick="editar('${key}')"> Editar</button> 
                                </th>
                            </tr>
                        </table>`;
                }
            }else{
                for (let i = 0; i <= localStorage.length - 1; i++) {
                    const key = localStorage.key(i);
                    let datos = localStorage.getItem(key);
                    datos = JSON.parse(datos);
                    var resultados=0;
    
                    if(campobusqueda==key){
                        console.log("help");
                        elementos += `
                        <table>
                        <tr>
                            <th>
                                Nombre:<input type="text" value="${key}" id="${key}" name="${key}"><br>
                                Celular:<input type="text" value="${datos.celular}" id="celular${key}">
                                <br>
                                Direccion:<input type="text" value="${datos.direccion}" id="direccion${key}">
                                <br>
                            </th>
                            <th>
                                <button type="button" onclick="eliminarDato('${key}')"> Eliminar</button><br>
                                <button type="button" onclick="editar('${key}')"> Editar</button> 
                            </th>
                        </tr>
                    </table>`;
                    }else if( i == localStorage.length - 1 &&  campobusqueda!=key){
                        elementos += `<p>El nombre debe estar escrito igual que en el contacto</p>`;
                    }
                }
                document.getElementById("busqueda").value = "";

            }
        }
        document.getElementById('contactos').innerHTML = elementos;
    }


    