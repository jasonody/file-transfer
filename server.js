const net = require('net')
const fs = require('fs')

const PORT = 36963


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
}).listen(PORT)
