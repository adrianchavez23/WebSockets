var server = require('ws').Server;
var s = new server({port: 5001});

s.on('connection', function(ws) {

    //Cuando se recibe un mensaje
    ws.on('message', function(message){

        message = JSON.parse(message);

        if (message.type == "name"){ //Salvar el nombre en la sesión actual
            ws.personName = message.data;
            return;
        } 
        console.log('Received: '+message);

        //Enviar a todos los clientes conectados en el servidor
        s.clients.forEach(function e(client) {
            if (client != ws) {
                client.send(JSON.stringify({ // Avoid sending the same message back to the sender
                    name: ws.personName,
                    data: message.data
                }));
            }
            
        });

        //ws.send(message);
        
    });

    //Cuando se desconecta un cliente;
    ws.on('close', function() {
        console.log("I lost a client");
    });

    //Cuando se conecta un cliente
    console.log("one more client connected");
});