import {EventEmitter} from 'events'
import {readFile} from 'fs'

function findRegex(files, regex){
    const emitter = new EventEmitter()
    for(const file of files) {
        readFile(file, 'utf8', (err, content) => {
            if(err) {
                return emitter.emit('error', err)
            }
            emitter.emit('fileread', file)
            const match = content.match(regex)
            if(match) {
                match.forEach(elem => emitter.emit('found', file, elem))
            }
        })
    }
    return emitter
}

findRegex([
    'hello.txt', 'bye.txt'
], /BYE \w+/g)
.on('fileread', file=>console.log(`${file} was read`))
.on('found', (file, match)=> console.log(`Matched "${match}" in ${file}`))
.on('error', err => console.error(`Error emitter ${err.message}`))


class FindRegex extends EventEmitter {
    constructor(regex){
        super()
        this.regex = regex
        this.files = []
    }
    addFile(file) {
        this.files.push(file)
        return this
    }
    find(){
        for(const file of this.files){
            readFile(file,'utf8', (err, content)=>{
                if(err) {
                    return this.emit('error', err)
                }
                this.emit('fileread', file)
                const match = content.match(this.regex)
                if(match) {
                    match.forEach(elem => this.emit('found', file, elem))
                }
            })
        }
        return this
    }
}

const findReg = new FindRegex(/hello \w+/)
findReg
.addFile('hello.txt')
.addFile('bye.txt')
.find()
.on('found', (file, match)=> console.log(`Matched "${match}" in ${file}`))
.on('error', err => console.error(`Error emitter ${err.message}`))