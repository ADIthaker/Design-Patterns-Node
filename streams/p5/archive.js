const { createReadStream, createWriteStream} = require('fs')
const {pipeline} = require("stream")
const { randomBytes} = require("crypto")
const { createCompressAndEncrypt} = require("./combined-st.js")

const [,, password, source] = process.argv
const iv = randomBytes(16)
const destination = `${source}.gz.enc`

pipeline(
    createReadStream(source),
    createCompressAndEncrypt(),
    createWriteStream(destination),
    (err)=>{
        if(err){
            console.error(err)
            process.exit(1)
        }
        console.log(`${destination} created with iv: ${iv
            .toString('hex')}`)
    }
)