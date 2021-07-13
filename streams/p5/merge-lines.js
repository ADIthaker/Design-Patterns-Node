const {createReadStream
, createWriteStream} = require("fs")
const split = require("split")

const dest = process.argv[2]
const srcs= process.argv.slice(3)

const destStream = createWriteStream(dest)

let endCount = 0
for(const src of srcs){
    const srcStream = createReadStream(src, {highWaterMark:16})
    srcStream.on('end', () => {
        if(++endCount === srcs.length){
            destStream.end()
            console.log(`${dest} created`)
        }
    })
    srcStream.pipe(split((line)=> line+'\n'))
    .pipe(destStream, {end:false})
}