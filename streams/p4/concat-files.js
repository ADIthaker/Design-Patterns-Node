const {createWriteStream, createReadStream} = require("fs");
const { Readable, Transform} = require("stream")

exports.concat = function concat(dest, files){
    return new Promise((resolve, reject)=>{
        const destStream = createWriteStream(dest)
        Readable.from(files)
        .pipe(new Transform({
            objectMode:true,
            transform(filename, enc, done){
                const src = createReadStream(filename)
                src.pipe(destStream, {end: false})
                src.on('error', done)
                src.on('end', done)
            }
        }))
        .on('error', reject)
        .on('finsih', () =>{
            destStream.end()
            resolve()
        })
    })
}