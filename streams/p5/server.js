const {createWriteStream} = require('fs')
const {createServer } = require("net")

function demultiplexChannel(src, dests){
    let currentChannel = null
    let currentLength= null
    src
    .on('readable', ()=>{
        let chunk
        if(currentChannel===null){
            chunk = src.read(1)
            currentChannel = chunk && chunk.readUInt8(0)
        }

        if(currentLength == null){
            chunk = src.read(4)
            currentLength = chunk && chunk.readUInt32BE(0)
            if (currentLength === null) {
                return null
            }
        }

        chunk  = src.read(currentLength)
        if(chunk === null) {
            return null
        }
        console.log(`Received packet from ${currentChannel}`)
        dests[currentChannel].write(chunk)
        currentChannel = null
        currentLength = null
    })
    .on('end', ()=>{
        dests.forEach(dest => dest.end())
        console.log(`Source channel closed`)
    })
}
const server = createServer((socket) => {
    const stdoutStream = createWriteStream('stdout.log')
    const stderrStream = createWriteStream('stderr.log')
    demultiplexChannel(socket, [stdoutStream, stderrStream])
    })
server.listen(3000, () => console.log('Server started'))