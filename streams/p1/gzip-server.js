const {createServer} = require('http');
const {createWriteStream} = require('fs');
const { basename, join } = require('path');
const { createGunzip } = require('zlib');
const { createDecipheriv, randomBytes } = require('crypto');
const secret = randomBytes(24)
console.log(`Generated secret : ${secret.toString('hex')}`)
const server = createServer((req, res) => {
    const filename = basename(req.headers['x-filename'])
    const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex')
    const destFileName = join('received_files', filename)
    console.log(`File request received ${filename}`)
    req
    .pipe(createDecipheriv('aes192', secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFileName))
    .on('finish', () => {
        res.writeHead(201, { 'Content-Type': 'text/plain'})
        res.end('OK\n')
        console.log(`File saved: ${destFileName}`)
    })
})

server.listen(3000, ()=> console.log('Listening on http://localhost:3000'))