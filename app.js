/* Creando niveles - facil / intermedio / dificil

const nivel = ['agua','mesa','vaso','auto','moto','bicicleta','lampara','agua','mate','lapiz','lapicera','cartuchera','mochila','casa','camion','rueda','tren',
            'juguete','lupa','celular','ropa','remera','papel','buzo','pantalon','comida','tijera','caja','cajon','ventana','cama','colchon','microfono',
            'gato','persona','luz','perro','guitarra','bateria','piano','galletita','pelota','futbol','baño','camara','muñeca','caballo','ventilador',
            'papa','sandia','manzana','tomate','mandarina','avion','barco','avioneta','peluche','oso','raton','flor','pera','martillo','corazon','cuna','corona',
            ]
*/ 
const palabras = [
    'mesa','monitor','puerta','computadora','estufa','cacerola','vaso','licuadora','auto','moto','bicicleta',
    'lampara','agua','mate','abecedario','lapiz','lapicera','cartuchera','mochila','casa','pared','texto',
    'carpintero','madera','gripe','resfrio','camion','rueda','tren','via','juguete','escritorio','caño','lupa',
    'notebook','celular','ropa','remera','papel','buzo','pantalon','comida','mueble','tijera','caja','cajon',
    'cortina','ventana','cama','colchon','nafta','microfono','pentagrama','gato','persona','luz','perro',
    'cotorra','guitarra','bateria','piano','galletitas','pelota','paleta','raqueta','tennis','futbol','enchufe',
    'microondas','baño','camara','murcielago','parlantes','muñeca','caballo','etiqueta','caratula','ventilador',
    'pizza','pincel','papa','camote','batata','zanahoria','sandia','manzana','tomate','remolacha','mandarina',
    'pomelo','latas','paracaidas','avion','avioneta','barco','peluche','trapecista','flor','pera','martillo',
    'compota','destornillador','corazon','teclas','corralito','cuna','manta','camisa','corona','reyna','princesa',
    'dique','duque','duqueza','fuente','tornillo','libro','cuaderno','motocierra','cirena','escalera','puente',
    'piso','botella','cevolla','zapallito','zapallo','monopatin','patin','diente','lengua','matematicas',
    'montaña','arbol','hojas','pasto','termostato','ladrillo','pijama','calefactor','bolsa','bolson','raqueta',
    'chaleco','casco','amortiguador','hamaca','memoria','trapo','disquette','linea','cable','internet','cabra',
    'jirafa','mamut','dinosaurio','elefante','formulario','deportes','tranbajo','escuela','boton','frenos',
    'dentista','doctor','quirofano','estampita','higado','riñon','medias','zapatilla','brazo','pie','zapato',
    'huevo','salchicha','ravioles','arbejas','hormigas','insectos','cinta','manija','torta','tapa','papel',
    'poni','cruz','crucifijo','collar','escoba','ruleman','vidrio','numeros','diccionario','oreja','botella',
    'guitarra','electricidad','flecha'
]
let contador = 0 // 14, cantidad de partes del cuerpo que van a aparecer cuando falle
let dividirPalabra;
let aciertos = 0;
let puntos = 0;
let vidas = 3;
let misVidas = 3;
let recordPuntos;
var aleatorio;
const letraUsada = []
    // si hay record muestra el nombre en pantalla
if ( localStorage.getItem('nombreAhorcado')) {
    let recordNombre = localStorage.getItem('nombreAhorcado');
        recordPuntos = localStorage.getItem('puntosAhorcado');
    nombreRecord.innerHTML = recordNombre.toUpperCase();
    puntosRecord.innerHTML = recordPuntos;
}



function cargarNombre(){
    let nombreJugador = document.querySelector('#nombreJugador').value;
    let nombre = document.querySelector('#mostrarNombre');
    nombre.innerHTML = nombreJugador.toUpperCase();
    let cerrarFormulario = document.querySelector('.contenedorFormulario');
        cerrarFormulario.style.display="none";
    let nombreFin = document.getElementById('nombreFinJuego');
        nombreFin.innerHTML += nombreJugador.toUpperCase();
        seleccionarPalabra();
        
}

function seleccionarPalabra() {
        // hacer un random de los indices de las palabra
    let cantidadPalabras = palabras.length;
    let inferior = 0;
    var numPosibilidades = cantidadPalabras - inferior;
        aleatorio = Math.random() * (numPosibilidades + 1);
        aleatorio = Math.floor(aleatorio); // Palabra para jugar
        crearJuego(aleatorio);
}

function crearJuego(aleatorio) {
        // Crea un array con las letras de la palabra seleccionada
    dividirPalabra = palabras[aleatorio].toUpperCase().split('');
    aciertos = dividirPalabra.length;
        // Muestra la palabra en pantalla "Esta oculta"
        for ( let i = 0; i < dividirPalabra.length; i++){
            let html = '';
                html += `<div class="letras"><p class="colorLetra" id="${dividirPalabra[i]}">${dividirPalabra[i]}</p></div`;
                cuadroAbajo.innerHTML += html
        }
}

    // Menu del abecedario para elejir la letra
let contenedorAbecedario = document.querySelector('.arriba');
        contenedorAbecedario.addEventListener('click', (e) => {
        const objetoSelect = e.target.parentElement;
        const letra = e.target.classList.contains('btn-letra');
            if ( letra){ 
                let letraSeleccionada = objetoSelect.querySelector('.btn-letra').textContent;
                let idLetra = objetoSelect.querySelector('.btn-letra').dataset.letra;
                verificarJugada(idLetra,letraSeleccionada);            
            }
})

// Verifica si la letra esta en la palabra, si esta, la muestra
function verificarJugada(idLetra,letraSeleccionada) {  
    if(letraUsada.includes(letraSeleccionada)) {
        console.log('la letra ya esta seleccionada');
        sonidoRepetido()
    }else {
        letraUsada.push(letraSeleccionada);
        let tacharLetra = document.getElementById(idLetra);
        tacharLetra.style.backgroundColor='violet';

        let l = dividirPalabra.filter((e) => e === letraSeleccionada);
            if ( l[0] === letraSeleccionada) {
                const grupoDeLetras = document.querySelectorAll('#'+letraSeleccionada); // Todas las letra que tengan el mismo id "seria la misma letra repetida en la palabra"
                for ( let i = 0; i < grupoDeLetras.length; i++){
                    grupoDeLetras[i].style.display='flex';
                    aciertos = aciertos - 1;
                        if ( aciertos == 0) {
                            jugadaGanada();
                        }
                }
            }else {
            mostrarMacaco()
        }
    }
}

    // Muestra las partes del macaco si erra la letra
function mostrarMacaco(){   
    contador = contador + 1
    if ( contador == 1 ) {
    let mostrarCabeza = document.getElementById('idCabeza');
        mostrarCabeza.style.display='flex'
    }else if ( contador == 2) {
    let mostrarCuerpo = document.getElementById('idCuerpo');
        mostrarCuerpo.style.display='flex'   
    }else if ( contador == 3) {
        let mostrarPiernaIzquierda = document.getElementById('idPiernaIzquierda');
            mostrarPiernaIzquierda.style.display='flex'   
    }else if ( contador == 4) {
        let mostrarPiernaDerecha = document.getElementById('idPiernaDerecha');
            mostrarPiernaDerecha.style.display='flex'   
    }else if ( contador == 5) {
        let mostrarBrazoDerecho = document.getElementById('idBrazoDerecho');
            mostrarBrazoDerecho.style.display='flex'   
    }else if ( contador == 6) {
        let mostrarBrazoIzquierdo = document.getElementById('idBrazoIzquierdo');
            mostrarBrazoIzquierdo.style.display='flex'   
    }else if ( contador == 7) {
        let mostrarPieDerecho = document.getElementById('idPieDerecho');
            mostrarPieDerecho.style.display='flex'   
    }else if ( contador == 8) {
        let mostrarPieIzquierdo = document.getElementById('idPieIzquierdo');
            mostrarPieIzquierdo.style.display='flex'
    }else if ( contador == 9) {
        let mostrarManoDerecha = document.getElementById('idManoDerecha');
            mostrarManoDerecha.style.display='flex'
    }else if ( contador == 10) {
        let mostrarManoIzquierda = document.getElementById('idManoIzquierda');
            mostrarManoIzquierda.style.display='flex'
    }else if ( contador == 11) {
        let mostrarOjoDerecho = document.getElementById('idOjoDerecho');
            mostrarOjoDerecho.style.display='flex'
    }else if ( contador == 12) {
        let mostrarOjoIzquierdo = document.getElementById('idOjoIzquierdo');
            mostrarOjoIzquierdo.style.display='flex'
    }else if ( contador == 13) {
        sonidoUltimaOportunidad()
        let mostrarBoca = document.getElementById('idBoca');
            mostrarBoca.style.display='flex'
    }else if ( contador == 14) {
        let mostrarPelo = document.getElementById('idPelo');
            mostrarPelo.style.display='flex';
            jugadaPerdida()
    }  
}

function finJuego() {
    let mostrarCartel = document.querySelector('.contenedorFinJuego');
        mostrarCartel.style.display="flex";
        puntosFinJuego.innerHTML += puntos;

        let ocultarCartelFinJuego = document.querySelector('.contenedorJuegoTerminado');
            ocultarCartelFinJuego.style.display='none';
        
}

function continuar() {   
    let borrarCartel = document.querySelector('.contenedorFinJuego');
        borrarCartel.style.display="none";
        if (recordPuntos < puntos ){
            record()
        }else{
            volverAlapagina()
    } 
    
}

function record() {
    sonidoRecord()
    let nuevoRecord = document.querySelector('.contenedorNuevoRecor');
        nuevoRecord.style.display='flex';
        nombreNuevoRecord.innerHTML += nombreJugador.value.toUpperCase();
        puntosNuevoRecord.innerHTML += puntos;
       
    localStorage.setItem('nombreAhorcado', nombreJugador.value);
    localStorage.setItem('puntosAhorcado', puntos)
}

function volverAlapagina(){
    location.href="index.html"
}

    // Cuando acierta la palabra
function jugadaGanada(){
        sonidoGanador()
        puntos = puntos + 1
        mostrarPuntos.innerHTML = puntos
        mostrarPalabra.innerHTML =`LA PALABRA ERA : ${palabras[aleatorio].toUpperCase()}`
        let mostarPalabra = document.querySelector('.contenedorJugadaGanada');
            mostarPalabra.style.display='flex';
}

function jugadaPerdida() {
    sindoPerdio()
        misVidas--
        console.log(misVidas)
        if(misVidas===2) {
            document.querySelector('.vidaSeis').style.display='none';
            reset()
        }else if (misVidas===1){
            document.querySelector('.vidaCinco').style.display='none';
            reset()
        }else {
            let mostrarCartelFinJuego = document.querySelector('.contenedorJuegoTerminado');
                mostrarCartelFinJuego.style.display='flex';
        }
       
}

function siguienteJugada(){
    sonidoSiguiente()
    vidas--
    console.log(vidas)
    if (vidas === 2) {
        let vidaTres = document.querySelector('.vidaTres');
        vidaTres.style.display='none';
        reset()
    }else if( vidas === 1){
        let vidaDos = document.querySelector('.vidaDos');
        vidaDos.style.display='none';
    }else {
        let vidaUno = document.querySelector('.vidaUno');
        vidaUno.style.display='none';
        jugadaPerdida()
    }
}

function reset(){
    cuadroAbajo.innerHTML = ' '    
    let borrarCabeza = document.getElementById('idCabeza');
        borrarCabeza.style.display='none'
    let borrarCuerpo = document.getElementById('idCuerpo');
        borrarCuerpo.style.display='none'     
    let borrarPiernaIzquierda = document.getElementById('idPiernaIzquierda');
        borrarPiernaIzquierda.style.display='none'   
    let borrarPiernaDerecha = document.getElementById('idPiernaDerecha');
        borrarPiernaDerecha.style.display='none'   
    let borrarBrazoDerecho = document.getElementById('idBrazoDerecho');
        borrarBrazoDerecho.style.display='none'   
    let borrarBrazoIzquierdo = document.getElementById('idBrazoIzquierdo');
        borrarBrazoIzquierdo.style.display='none'   
    let borrarPieDerecho = document.getElementById('idPieDerecho');
        borrarPieDerecho.style.display='none'   
    let borrarPieIzquierdo = document.getElementById('idPieIzquierdo');
        borrarPieIzquierdo.style.display='none'
    let borrarManoDerecha = document.getElementById('idManoDerecha');
        borrarManoDerecha.style.display='none'
    let borrarManoIzquierda = document.getElementById('idManoIzquierda');
        borrarManoIzquierda.style.display='none'
    let borrarOjoDerecho = document.getElementById('idOjoDerecho');
        borrarOjoDerecho.style.display='none'
    let borrarOjoIzquierdo = document.getElementById('idOjoIzquierdo');
        borrarOjoIzquierdo.style.display='none'
    let borrarBoca = document.getElementById('idBoca');
        borrarBoca.style.display='none'
    let borrarPelo = document.getElementById('idPelo');
        borrarPelo.style.display='none';   
        contador = 0;
        
        // Eliminar las letras usadas
        letraUsada.splice(0,letraUsada.length)
//-------------------------------------------------------------------------------
    const resetAbecedario = document.querySelectorAll('.btn-letra');
        for ( let i = 0; i < resetAbecedario.length; i++){
            resetAbecedario[i].style.background="none";
        }

        let ocultarCartel = document.querySelector('.contenedorJugadaGanada');
            ocultarCartel.style.display='none';    
    seleccionarPalabra()
}

// Suena cuando se acierta la palabra
function sonidoGanador() {
    const sonido = new Audio();
    sonido.src ="sonidos/woo-hoo.mp3";
    sonido.play();
}

// Suena cuando solo queda una oportunidad.
function sonidoUltimaOportunidad() {
    const sonido = new Audio();
    sonido.src ="sonidos/alerta.mp3";
    sonido.play();
}

// Boton siguiente
function sonidoSiguiente(){
    const sonido = new Audio();
    sonido.src="sonidos/SE8.WAV"
    sonido.play()
}
// Nuevo record
function sonidoRecord(){
    const sonido = new Audio();
    sonido.src="sonidos/ganador.mp3"
    sonido.play()
}

// Suena cuando se pierde
function sindoPerdio(){
    const sonido = new Audio();
    sonido.src="sonidos/wiwa.wav"
    sonido.play()
}

// Suena cuando se elije una letra ya tachada
function sonidoRepetido() {
    const sonido = new Audio();
    sonido.src="sonidos/repetido.mp3";
    sonido.play()
}