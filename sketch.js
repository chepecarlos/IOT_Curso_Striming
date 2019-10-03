var client = mqtt.connect('wss://polloALSW:PolloSecreto@broker.shiftr.io', {
  clientId: 'javascript'
});

client.on('connect', function(){
  console.log('client has connected!');

  client.subscribe('/ALSW/#');
  // client.unsubscribe('/example');

  setInterval(function(){
    client.publish('/hello', 'world');
  }, 1000);
});

client.on('message', function(topic, message) {
  console.log('new message:', topic, message.toString());
});
