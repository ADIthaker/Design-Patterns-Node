const {RandomStream} = require('./random-stream');
const randomStream = new RandomStream()
const {join} = require('path')
const {Readable} = require('stream')
const {ToFileStream, tfs} = require('./to-file-stream.js')
// randomStream
// .on('data', (chunk) => {
//     console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
// })
// .on('end', () =>{
//     console.log(`Produced ${randomStream.emittedBytes} bytes of random
// data`)
// })
const mountains = [
    { name: 'Everest', height: 8848 },
    { name: 'K2', height: 8611 },
    { name: 'Kangchenjunga', height: 8586 },
    { name: 'Lhotse', height: 8516 },
    { name: 'Makalu', height: 8481 }
]
const mountainStream = Readable.from(mountains)
mountainStream.on('data', (mountain)=> {
    console.log(`${mountain.name.padStart(14)}\t${mountain.height}`)
})

// const tfs = new ToFileStream()
tfs.write({path: join('files','file1.txt'), content:'Hello'})
tfs.write({path: join('files','file2.txt'), content:'Node js'})
tfs.write({path: join('files','file3.txt'), content:'Stream'})
tfs.end(()=>console.log('All files Created'))
