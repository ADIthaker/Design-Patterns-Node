const { createGzip, createGunzip } = require("zlib")
const {Transform, pipeline}  = require("stream")

const uppercasify = new Transform({
    transform(chunk, enc, cb){
        this.push(chunk.toString().toUpperCase())
        cb()
    }
}) 

pipeline(
    process.stdin,
    createGunzip(),
    uppercasify,
    createGzip(),
    process.stdout,
    (err)=>{
        if(err){
            console.error(err)
            process.exit(1)
        }
    }
)