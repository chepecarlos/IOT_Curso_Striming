let BotonActivar;
let BotonApagar;
let EstadoFondo = false;

let BrokerMQTT = 'broker.shiftr.io';
let PuertoMQTT = [443];
let ClienteIDMQTT = "Pagina-" + Math.floor(Math.random() * 1000);
let UsuarioMQTT = "polloALSW";
let ContrasenaMQTT = "PolloSecreto";
let Broker = ["mqttwss://broker.shiftr.io/mqtt"];
client = new Paho.MQTT.Client(BrokerMQTT, PuertoMQTT, ClienteIDMQTT);

client.onConnectionLost = MQTTPerder;
client.onMessageArrived = MQTTMensaje;

client.connect({
  onSuccess: CuandoConectadoMQTT,
  userName: UsuarioMQTT,
  password: ContrasenaMQTT,
  hosts: Broker,
  ports: PuertoMQTT
});

function MQTTPerder(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("MQTT Perdio coneccion Error:" + responseObject.errorMessage);
  }
}

function MQTTMensaje(message) {
  console.log("Mensaje recibido:" + message.payloadString);
  let Mensaje = message.payloadString;
  if (Mensaje == '1') {
    EstadoFondo = true;
    console.log("Encendiendo Fondo")
  } else {
    EstadoFondo = false;
  }
}

function CuandoConectadoMQTT() {
  console.log("MQTT Conectado");
  client.subscribe("/ALSW/Boton");
}

function setup() {
  createCanvas(200, 200);
  createP();
  BotonActivar = createButton("Activar Led");
  BotonApagar = createButton("Apagar Led");
  BotonActivar.mousePressed(ActivarLed);
  BotonApagar.mousePressed(ApagarLed);
}

function ApagarLed() {
  console.log("Apagnado Led");
  message = new Paho.MQTT.Message("0");
  message.destinationName = "/ALSW/Led";
  client.send(message);
}

function ActivarLed() {
  console.log("Encender Led");
  message = new Paho.MQTT.Message("1");
  message.destinationName = "/ALSW/Led";
  client.send(message);
}

function draw() {
  if (EstadoFondo) {
    background(0);
  } else {
    background(255);
  }
}
