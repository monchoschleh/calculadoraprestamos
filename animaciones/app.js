let boton = $("#boton");


function animacion () {
    $("#cuadrado1").fadeIn(3000, function () {
        $("#cuadrado2").fadeOut(3000);
    });
};

$("#boton").click (animacion);