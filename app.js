class prestamos {
    constructor (monto, cuotas, nombre, apellido, sexo, situacion, email, documento, telefono, final, inter, id){
        this.monto = monto;
        this.cuotas = cuotas;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.situacion = situacion;
        this.email = email;
        this.documento = documento;
        this.telefono = telefono;
        this.final = final;
        this.inter = inter;
        this.id = id;
    }
};

let listadoprestamos = [];
let boton = $("#boton");
let botonborrar = $("#iconoborrar")

function corroborador (e) {
    let monto = $("#mont").val();
    let cuotas = $("#cuot").val();
    let nombre = $("#nomb").val();
    let apellido = $("#ape").val();
    let sexo = $("#sex").val();
    let situacion = $("#sit").val();
    let email = $("#email").val();
    let documento = $("#dni").val();
    let telefono = $("#tel").val();
    
    if (monto == "") {
        alert ("Ingrese un monto");
        e.preventDefault();
    } else {
        if (cuotas == "") {
            alert ("Ingrese numero de cuotas");
            e.preventDefault();
        } else {
            if (nombre == "") {
                alert ("Ingrese su nombre");
                e.preventDefault();
            } else {
                if (apellido == "") {
                    alert ("Ingrese su apellido");
                    e.preventDefault();
                } else {
                    if (sexo == "") {
                        alert ("Ingrese su genero");
                        e.preventDefault();
                    } else {
                        if (situacion == "") {
                            alert ("Ingrese su situacion laboral");
                            e.preventDefault();
                        } else {
                            if (email == "") {
                                alert ("Ingrese su Email");
                                e.preventDefault();
                            } else {
                                if (documento == "") {
                                    alert ("Ingrese su numero de documento");
                                    e.preventDefault();
                                } else {
                                    if (telefono == "") {
                                        alert ("Ingrese su numero de telefono");
                                        e.preventDefault();
                                    } else {
                                        calculadora ();
                                    
                                }
                            }
                            }
                        }
                    }
                }
            }
        }
    }
}
    




function calculadora (e) {
    //e.preventDefault();
    let monto = $("#mont").val();
    let cuotas = $("#cuot").val();
    let nombre = $("#nomb").val();
    let apellido = $("#ape").val();
    let sexo = $("#sex").val();
    let situacion = $("#sit").val();
    let email = $("#email").val();
    let documento = $("#dni").val();
    let telefono = $("#tel").val();
    let cargalocal = JSON.parse (localStorage.getItem("listadoprestamos"));


    if (cuotas <= 4) {
        var interes = 1.15;
        var inter = 15;
    } else if (cuotas <= 8) {
        var interes = 1.30;
        var inter = 30;
    } else {
        var interes = 1.45;
        var inter = 45;
    }

    if (localStorage.getItem("listadoprestamos") != null) {
        let final = monto * interes;
        let id = cargalocal.length + 1;
        const prestamo1  = new prestamos (monto, cuotas, nombre, apellido, sexo, situacion, email, documento, telefono, final, inter, id);
        cargalocal.push (prestamo1);
        localStorage.setItem ("listadoprestamos", JSON.stringify (cargalocal));
        imprimirDatos();
    } else {
        localStorage.clear ();
        let id = 1;
        let final = monto * interes;
        const prestamo1  = new prestamos (monto, cuotas, nombre, apellido, sexo, situacion, email, documento, telefono, final, inter, id);
        console.log (prestamo1);
        listadoprestamos.push (prestamo1);
        localStorage.setItem ("listadoprestamos", JSON.stringify (listadoprestamos));
        imprimirDatos();
    }}


function imprimirDatos () {
    let imprimir = JSON.parse (localStorage.getItem("listadoprestamos"))
    if (imprimir != null) {
        imprimir.forEach (element => {
            let final2 = element.final.toFixed();
            let tabla
            if (element.id % 2 == 0) {
                var tablac = "impar";
            } else {
                var tablac = "par";
            }
            $("#tablas").append (`            <div id="${tablac}">
            <div id="borrar" onclick="borrardato(${element.id})">
                <img class="iconoborrar" src="css/img/cerrar.png" alt="cerrar">
            </div>
            <p id="textopres">Hola ${element.nombre}. Tu solicitud por $${element.monto} esta siendo procesada. Corrobore los siguientes datos y confirme la operacion. 
                <br>Dni: ${element.documento} 
                <br>Telefono: ${element.telefono} 
                <br>Email: ${element.email}
                <br>Pagaras $${final2} en ${element.cuotas} cuotas con ${element.inter}% de intereses
            </p>
        </div>`);
        });
    } else {
        console.log ("El array esta vacio")
    }
}

function borrardato (id) {
    let borrar = JSON.parse (localStorage.getItem("listadoprestamos"));
    let actualizado = borrar.filter (e => e.id != id)
    localStorage.setItem ("listadoprestamos", JSON.stringify (actualizado))
    location.reload()
}

if (localStorage.getItem ("listadoprestamos") != null) {
    $("#tabla").slideDown (1000);
}

function prueba () {
    console.log ("probando boton");
}

function carrito () {
    $(".carrito").slideDown (1000);
}

function iconoborrar2 () {
    $(".carrito").slideUp (1000, function() {
        location.reload();
    });
}

function botoncarrito () {
    if (localStorage.getItem("listadoprestamos") != null) {
        let botoncarrito = JSON.parse (localStorage.getItem("listadoprestamos"));
        if (botoncarrito.length >= 1) {
            $("#botoncarrito").append (`<button class="btn btn-secondary boton1" id="boton2">Ver Resumen</button>`);
        }
    }
}

function resumen () {
    let id = 0
    let total = 0
    let resumen = JSON.parse (localStorage.getItem("listadoprestamos"));
    resumen.forEach (element => {
        id = id + 1;
        total = total + element.final;
        total2 = total.toFixed();
        final2 = element.final.toFixed();
        const cuot = element.final / element.cuotas;
        const cuot2 = cuot.toFixed();
        $("#tabla").append (`                    <tr>
        <td>${id}</td>
        <td>$${element.monto}</td>
        <td>${element.cuotas} de $${cuot2}</td>
        <tD>${element.inter}%</td>
        <tD>$${final2}</td>
    </tr>`)
    })
    $("#tabla2").append (`                    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th>Total:</th>
    <th>$${total2}</th>
</tr>`)
}

function felicitaciones () {
    let felicitaciones = JSON.parse (localStorage.getItem("listadoprestamos"));
    let total = 0
    felicitaciones.forEach (element => {
        total = total + element.final;
        total2 = total.toFixed();
    })
    alert (`¡Felicitaciones tenes $${total2} sos rico!`)
    redireccionar ();
}

function redireccionar(){
    location.href="https://www.youtube.com/watch?v=4ue2a6wN_wo";
}

const URLJSON = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";


function apidolar () {
  $.getJSON(URLJSON, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;
      console.log (misDatos);
      let actualizado = misDatos.filter (e => e.casa.nombre == "Dolar Blue");
      console.log (actualizado);
      actualizado.forEach(element => {
        $("#dolarblue").prepend(`<div class="col-md-4 col-sm-4 col-xs-4 dol">
        <p>Dolar Blue</p>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-4 dol2">
        <p>Compra</p>
        <p>$${element.casa.compra}</p>
    </div>
    <div class="col-md-4 col-sm-4 col-xs-4 dol2">
        <p>Venta</p>
        <p>$${element.casa.venta}</p>
    </div>`)
      }) 

    }
    });
}





apidolar ();
botoncarrito ();
imprimirDatos();


$("#iconoborrar2").click (iconoborrar2);
$("#boton2").click (carrito);
$("#boton2").click (resumen);
$("#boton").click (corroborador);
$(".iconoborrar").click (borrardato);
$("#boton3").click (felicitaciones);






