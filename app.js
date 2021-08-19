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
                <br>Pagaras $${element.final} en ${element.cuotas} cuotas con ${element.inter}% de intereses
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
    $(".carrito").slideUp (1000);
}

function botoncarrito () {
    if (localStorage.getItem("listadoprestamos") != null) {
        let botoncarrito = JSON.parse (localStorage.getItem("listadoprestamos"));
        if (botoncarrito.length >= 1) {
            $("#botoncarrito").append (`<button class="btn btn-secondary boton1" id="boton2">Confirmar prestamos</button>`);
        }
    }
}


botoncarrito ();
imprimirDatos();


$("#iconoborrar2").click (iconoborrar2);
$("#boton2").click (carrito);
$("#boton").click (calculadora);
$(".iconoborrar").click (borrardato);

//onclick="borrardato(${element.id})

//<button class="borrardato" onclick="borrardato(${element.id})"> borrar</button>