$(document).ready(function(){

    // Crear canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 420;
    canvas.height = 420;

    var ancho = canvas.width;
    var alto = canvas.height;

    document.body.appendChild(canvas);

    /********************************* Imágenes ******************************/
    // Imagen de Batman
    var batmanImage = new Image();
    batmanImage.src = "img/batman.png";

    // Imagen del Guasón
    var guasonImage = new Image();
    guasonImage.src = "img/guasón.png";

    /***************************** Logica de juego ***************************/
    var batman = {
        velocidad: 256
    };
    var guason = {};
    var guasones_capturados = 0;

    var teclasPresionadas = {};
    
    // Tiempo
    var tiempo = Date.now();

    // Administra la entrada por teclado y actualiza la dirección actual
    $(document).keydown(function(e) {
        var key = e.which;
        if (key == "37") {
            teclasPresionadas["37"] = true; // Izquierda
        } else if (key == "38") {
            teclasPresionadas["38"] = true; // Arriba
        } else if (key == "39") {
            teclasPresionadas["39"] = true; // Derecha
        } else if (key == "40") {
            teclasPresionadas["40"] = true; // Abajo
        }
    });
    $(document).keyup(function(e) {
        delete teclasPresionadas[e.which];
    });

    // reiniciar La posición de Batman y el Guasón
    function reiniciar () {
        batman.x = canvas.width / 2;
        batman.y = canvas.height / 2;

        guason.x = 42 + (Math.random() * (canvas.width - 84));
        guason.y = 42 + (Math.random() * (canvas.height - 84));
    };

    // Actualizar
    function update (modificador) {
        // Toma posición actual de Batman
        var ny = batman.y;
        var nx = batman.x;

        // Actualiza la posición de Batman
        if (teclasPresionadas["38"]) {
            ny -= batman.velocidad * modificador;   // Arriba
        }
        if (teclasPresionadas["40"]) {
            ny += batman.velocidad * modificador;   // Abajo
        }
        if (teclasPresionadas["37"]) {
            nx -= batman.velocidad * modificador;   // Izquierda
        }
        if (teclasPresionadas["39"]) {
            nx += batman.velocidad * modificador;   // Derecha
        }

        // Chequea colisión con el marco
        if (nx > 0 && nx + 42 < ancho && ny > -10 && ny + 30 < alto) {
            batman.x = nx;
            batman.y = ny;
        };

        // Chequea colisión con Batman y el Guasón
        if ( batman.x <= (guason.x + 23) && guason.x <= (batman.x + 23)
             && batman.y <= (guason.y + 23) && guason.y <= (batman.y + 23)) {
            guasones_capturados++;
            reiniciar();
        }

    };

    // Dibujar
    function render () {
        // Dibujar fondo
        ctx.fillStyle = "#ccc";
        ctx.fillRect(0, 0, ancho, alto);

        // Dibujar a Batman
        ctx.drawImage(batmanImage, batman.x, batman.y);

        // Dibujar al Guasón
        ctx.drawImage(guasonImage, guason.x, guason.y);
        
        // Dibujar puntaje
        ctx.fillStyle = "#000000";
        ctx.font = "16px Helvetica";
        ctx.fillText("Guasones capturados: " + guasones_capturados, 23, 42);
    };

    // Principal
    function main () {
        var ahora = Date.now();

        update((ahora - tiempo) / 1000);
        render();

        tiempo = ahora;
    };
    
    // Inicia el juego
    reiniciar();
    setInterval(main, 10);

});