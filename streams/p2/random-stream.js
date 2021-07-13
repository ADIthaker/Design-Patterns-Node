const Chance = require('chance')
const chance  = Chance()
const {Readable} = require('stream')

class RandomStream extends Readable {
    constructor(options){
        super(options)
        this.emmitedBytes = 0
    }
    _read(size){
        const chunk = chance.string({length:size})
        this.push(chunk, 'utf8')
        this.emmitedBytes += chunk.length
        if(chance.bool({likelihood: 5})) {
            this.push(null)
        }
    }
}



exports.RandomStream = RandomStream
exports.randomStream = new Readable({
    read(size){
        const chunk = chance.string({length: size})
        this.push(chunk, 'utf8')
        emittedBytes += chunk.length
        if(chance.bool({likelihood: 5})) {
            this.push(null)
        }
    }
})