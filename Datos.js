var dato1 = { 'nombre': 'FULANO PEREZ', 'celular': '1234567', 'direccion': 'AV. FALSA 1234', locations: { 'lat': '4.737819', 'lng': '-74.095691' } };
var dato2 = { 'nombre': 'TOMAS EDISON', 'celular': '7654321', 'direccion': 'CL. REAL 4321', locations: { 'lat': '4.735697', 'lng': '-74.097270' } };
localStorage.setItem(1, JSON.stringify(dato1));
localStorage.setItem(2, JSON.stringify(dato2));
localStorage.setItem("acumulador", 3)