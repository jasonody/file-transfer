const net = require('net')
const fs = require('fs')

const filename = process.argv[2] || 'test.pdf'

const client = new net.Socket()
client.connect(36963, '127.0.0.1', () => {
    console.log('Client has connected to server...')

    client.write(filename)
    process.stdout.write(`Client is sending${filename}`)

    fs.createReadStream(filename)
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