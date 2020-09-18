var dato1 = { 'celular': '1234567', 'direccion': 'Av. Falsa 1234'};
        var dato2 = { 'celular': '7654321', 'direccion': 'Cl. Real 4321'};
        localStorage.setItem("Fulano Perez", JSON.stringify(dato1));
        localStorage.setItem("Tomas Edison", JSON.stringify(dato2));
        actualizarDatos();