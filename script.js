function showCustomAlert(message) {
    document.getElementById('alertMessage').innerText = message;
    document.getElementById('customAlert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// Ejemplo de uso
showCustomAlert("¡Bienvenido, querido estudiante del José Joaquín Castro Martínez! Piensa en una palabra o frase de no más de 40 caracteres relacionada con los ODS. Crea algunas pistas para ayudar a tus compañeros a descubrir la palabra oculta.");


let palabra = '';
let intentos = 0;
let palabraAdivinar = [];
let temporizador;
let tiempoRestante = 120; // 2 minutos en segundos
let juegoTerminado = false;

document.getElementById('empezarBtn').addEventListener('click', empezarJuego);
document.getElementById('probarLetraBtn').addEventListener('click', probarLetra);
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJuego);

const imagenes = {
    fondo: 'assets/fondo.png',
    cementerio: 'assets/cementerio.png',
    cabeza: 'assets/cabeza.png',
    cuerpo: 'assets/camiseta.png',
    mano_izquierda: 'assets/mano_izquierda.png',
    mano_derecha: 'assets/mano_derecha.png',
    piernas: 'assets/piernas.png',
    dialogo: 'assets/dialogo.png',
};

function empezarJuego() {
    palabra = document.getElementById('inputPalabra').value.toUpperCase();
    if (palabra.length === 0) {
        alert('Introduce una palabra válida');
        return;
    }

    palabraAdivinar = Array.from(palabra).map(letra => (letra === ' ') ? '_' : '_');
    mostrarPalabraAdivinar();
    document.getElementById('juego').classList.remove('hidden');
    document.getElementById('inputPalabra').disabled = true;
    document.getElementById('empezarBtn').disabled = true;
    document.getElementById('reiniciarBtn').classList.remove('hidden');
    juegoTerminado = false;

    // Iniciar el temporizador
    iniciarTemporizador();

    // Dibujar el (fondo) al iniciar el juego
    dibujarImagen('fondo');
}

function mostrarPalabraAdivinar() {
    document.getElementById('palabraAdivinar').textContent = palabraAdivinar.join(' ');
}

function probarLetra() {
    if (juegoTerminado) return;

    const letra = document.getElementById('inputLetra').value.toUpperCase();
    document.getElementById('inputLetra').value = '';

    if (letra && palabra.includes(letra)) {
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                palabraAdivinar[i] = letra;
            }
        }
        mostrarPalabraAdivinar();

        if (!palabraAdivinar.includes('_')) {
            terminarJuego('¡Muy Bien! Conoces los ODS y su importancia.', true);
        }
    } else {
        intentos++;
        dibujarAhorcado(intentos);
        if (intentos === 7) {
            terminarJuego('¡Debes Estudiar más los ODS!', false);
        }
    }
}

function iniciarTemporizador() {
    temporizador = setInterval(function() {
        if (juegoTerminado) return;

        tiempoRestante--;
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
        document.getElementById('temporizador').textContent = `Tiempo restante: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        if (tiempoRestante <= 0) {
            terminarJuego('¡Debes Estudiar más los ODS!', false);
        }
    }, 1000);
}

function terminarJuego(mensaje, ganado) {
    clearInterval(temporizador);
    juegoTerminado = true;
    document.getElementById('mensaje').textContent = mensaje;
    document.getElementById('probarLetraBtn').disabled = true;
    if (ganado) {
        // Mostrar palabra completa al ganar
        mostrarPalabraAdivinar();
    } else {
        // Mostrar la palabra correcta al perder
        document.getElementById('palabraAdivinar').textContent = palabra.split('').join(' ');
    }
}

// Dibujar las partes del ahorcado, manteniendo las anteriores
function dibujarAhorcado(intentos) {
    switch(intentos) {
        case 1:
            dibujarImagen('cementerio');  // Cementerio (fondo), ya debería estar, pero por si acaso
            break;
        case 2:
            dibujarImagen('cuerpo');  // Cuerpo
            break;
        case 3:
            dibujarImagen('piernas');   // Piernas  
            break;
        case 4:
            dibujarImagen('mano_izquierda');  // Mano izquierda
            break;
        case 5:
            dibujarImagen('mano_derecha');  // Mano derecha
            break;
        case 6:
            dibujarImagen('cabeza');   // Cabeza
            break;
        case 7:
            dibujarImagen('dialogo');   // Dialogo
            break;
    }
}

function dibujarImagen(parte) {
    const canvas = document.getElementById('canvasAhorcado');
    const ctx = canvas.getContext('2d');
    const imagen = new Image();
    
    imagen.src = imagenes[parte];

    // Dibujar la imagen en el canvas una vez que se haya cargado
    imagen.onload = function() {
        if (parte === 'cementerio') {
            // Dibujar el cementerio como fondo
            ctx.drawImage(imagen, 0, 0, canvas.width, canvas.height);  
        } else if (parte === 'cabeza') {
            // Dibujar la cabeza sin rotación
            ctx.drawImage(imagen, 180, 60, 140, 140); 
        } else if (parte === 'cuerpo') {
            // Dibujar el cuerpo en la posición adecuada
            ctx.drawImage(imagen, 130, 150, 250, 200);
        } else if (parte === 'mano_derecha') {
            // Dibujar el brazo derecho en la posición adecuada
            ctx.drawImage(imagen, 140, 278, 60, 100);
        } else if (parte === 'mano_izquierda') {
            // Dibujar el brazo izquierdo en la posición adecuada
            ctx.drawImage(imagen, 290, 265, 70, 70);
        } else if (parte === 'piernas') {
            // Dibujar las piernas en la posición adecuada
            ctx.drawImage(imagen, 100, 330, 300, 190);
        } else if (parte === 'dialogo') {
            // Dibujar el dialogo en la posición adecuada
            ctx.drawImage(imagen, 350, 100, 250, 240);
        }
    };
}

function reiniciarJuego() {
    // Reinicia todas las variables y el juego
    palabra = '';
    intentos = 0;
    palabraAdivinar = [];
    tiempoRestante = 120;
    juegoTerminado = false;

    document.getElementById('inputPalabra').disabled = false;
    document.getElementById('inputPalabra').value = '';
    document.getElementById('empezarBtn').disabled = false;
    document.getElementById('probarLetraBtn').disabled = false;
    document.getElementById('mensaje').textContent = '';
    document.getElementById('temporizador').textContent = 'Tiempo restante: 5:00';
    document.getElementById('juego').classList.add('hidden');
    document.getElementById('reiniciarBtn').classList.add('hidden');

    // Limpiar el canvas
    const canvas = document.getElementById('canvasAhorcado');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
