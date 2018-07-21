const net = require('net')
const fs = require('fs')
const program = require('commander')

program
    .version('0.1.0')
    .option('-H --host <value>', 'Host IP address')
    .option('-P --port <value>', 'Host port', 36963)
    .option('-F --file <value>', 'File to be transfered')
    .parse(process.argv)

const PORT = program.port;
const HOST = program.host;
const FILENAME = program.file;

const client = new net.Socket()
client.connect(PORT, HOST, () => {
    console.log('Client has connected to server...')

    client.write(FILENAME)
    process.stdout.write(`Client is sending${FILENAME}`)

    fs.createReadStream(FILENAME)
        .on('data', data => {
            process.stdout.write('.')
            client.write(data)
        })
        .on('close', () => {
            process.stdout.write('\n')
            client.end()
        })
    
})
client.on('close', () => {
    console.log('Client has disconnected.')
})