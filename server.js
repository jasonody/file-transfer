const net = require('net')
const fs = require('fs')
const program = require('commander')

program
    .version('0.1.0')
    .option('-P, --port [value]', 'Port to run server on', 36963)
    .parse(process.argv)

const PORT = program.port

const server = net.createServer(socket => {
    const initializeTransfer = (name) => {
        filename = name || filename

        socket.off('data', initializeTransfer)

        socket.pipe(fs.createWriteStream(filename))
    }

    let writeStream = null

    console.log('Client connected...')
    socket.on('data', (data) => {
        if (writeStream) {
            process.stdout.write('.')
            writeStream.write(data)
        } else {
            const filename = `uploaded_${data.toString()}`
            process.stdout.write(`Recieving ${filename}`)
            writeStream = fs.createWriteStream(filename)
        }
    })

    socket.on('close', () => {
        writeStream.end()
        console.log('\nClient has disconnected.')
    })
}).listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`)
})
