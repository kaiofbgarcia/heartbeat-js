import {Heartbeat} from './heartbeat.js';

const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";
const HAARCASCADE_URI = "haarcascade_frontalface_alt.xml"

// Load opencv when needed
async function loadOpenCv(uri) {
  return new Promise(function(resolve, reject) {
    console.log("starting to load opencv");
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.type = 'text/javascript'
    tag.onload = () => {
      cv['onRuntimeInitialized'] = () => {
        console.log("opencv ready");
        resolve();
      }
    };
    tag.onerror = () => {
      throw new URIError("opencv didn't load correctly.");
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

let demo = new Heartbeat("webcam", "canvas", HAARCASCADE_URI, 30, 6, 250);
var ready = loadOpenCv(OPENCV_URI);
ready.then(function() {
  demo.init();
});

// Seletor para o botão "Emergencia"
const btnExibirAlerta = document.getElementById('emergencia');

// Adiciona um evento de clique ao botão
btnExibirAlerta.addEventListener('click', () => {
  // Exibe o alerta usando Swal.fire()
  Swal.fire({
    icon: 'warning',
    title: 'Contato da Emergencia',
    html: `Em casos de emergencia ligue: <br/> <br/> 
      <Strong>SAMU</Strong> pelo número <Strong>192</Strong> <br/> <br/> 
      <Strong>Bombeiros</Strong> pelo número <Strong>193</Strong> 
    `,
  });
});

