const {Writable} = require("stream")
const {promises} = require("fs")
const {dirname} = require("path")
const mkdirp = require("mkdirp")

const fs = promises

class ToFileStream extends Writable {
    constructor(options){
        super({...options, objectMode:true})
    }
    _write(chunk, encoding, cb){
        mkdirp((dirname(chunk.path)))
        .then(()=> fs.writeFile(chunk.path, chunk.content))
        .then(()=>cb())
        .catch(cb)
    }
}

const tfs = new Writable({
    objectMode: true,
    write(chunk, encoding, cb) {
        mkdirp(dirname(chunk.path))
        .then(()=> fs.writeFile(chunk.path, chunk.content))
        .then(()=>cb())
        .catch(cb)
    }
})
exports.ToFileStream = ToFileStream
exports.tfs = tfs