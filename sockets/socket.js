
const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands =  new Bands();
console.log('init server');

bands.addBand(new Band('Banda 1'));
bands.addBand(new Band('Banda 2'));
bands.addBand(new Band('Banda 3'));
bands.addBand(new Band('Banda 4'));
bands.addBand(new Band('Banda 5'));
bands.addBand(new Band('Banda 6'));

console.log(bands);

//Mensaje de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    //Cuando se conecte un cliente le emito un mensaje pero solo a ese cliente conectado
    client.emit('actives-bands', bands.getBands());
    client.on('disconnect', () => { console.log('Cliente Desconectado')});
    client.on('mensaje', (payload)=> {
           console.log('mensaje!!', payload);
           io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    });

    client.on('voted-band', (payload) => {
            console.log(payload)
            bands.votedBand(payload.id);
            // Envio mensaje a todos los clientes conectados al servidor incluyendo quien emitio
            io.emit('actives-bands',bands.getBands());
     });

     client.on('add-band', (payload) => {
        console.log('Add-band',payload)
        bands.addBand(new Band(payload.name));
        // Envio mensaje a todos los clientes conectados al servidor incluyendo quien emitio
        io.emit('actives-bands',bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log('Delete-band',payload)
        bands.deleteBand(payload.id);
        // Envio mensaje a todos los clientes conectados al servidor incluyendo quien emitio
        io.emit('actives-bands',bands.getBands());
    });

    

//     client.on('emitir-mensaje', (payload) => {
//        //Emite a todos menos a el que emitio
//        client.broadcast.emit('emitir-mensaje-nuevo', payload)
//       //console.log('mensaje!!', payload);


// } 
//     )
 });

