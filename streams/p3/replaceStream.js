import { Transform } from "stream"

export class ReplaceStream extends Transform {
    constructor(searchStr, replaceStr, options){
        super({...options})
        this.searchStr = searchStr
        this.replaceStr = replaceStr
        this.tail = ''
    }

    _transform(chunk, encoding, cb){
        const pieces = (this.tail + chunk).split(this.searchStr)
        //console.log(`${chunk.toString()} chunk; ${pieces.length} len; ${this.tail} tail`)
        const lastPiece = pieces[pieces.length -1]
        const tailLength = this.searchStr.length -1
        this.tail = lastPiece.slice(-tailLength)
        pieces[pieces.length-1] = lastPiece.slice(0,-tailLength)
        this.push(pieces.join(this.replaceStr))
        cb()
    }

    _flush(cb){
        this.push(this.tail)
        cb()
    }
}

const searchStr = 'World'
const replaceStr = 'Node.js'
let tail = ''

export const replaceStream = new Transform({
    defaultEncoding: 'utf8',
    transform (chunk, encoding, cb) {
        const pieces = (tail + chunk).split(searchStr)
        const lastPiece = pieces[pieces.length - 1]
        const tailLen = searchStr.length - 1
        tail = lastPiece.slice(-tailLen)
        pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
        this.push(pieces.join(replaceStr))
        cb()
    },
    flush (cb) {
        this.push(tail)
        cb()
    }
})