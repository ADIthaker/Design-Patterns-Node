const {pipeline} = require('stream')
const split = require('split')
const { createReadStream, createWriteStream} = require('fs')
const superagent = require('superagent')
const {ParallelStream} = require("./parallel.js")
const parallelTransform = require('parallel-transform')

// pipeline(
//     createReadStream(process.argv[2]),
//     split(),
//     new ParallelStream(
//         async(url, enc, push, done) =>{
//             if(!url){
//                 return done()
//             }
//             try{
//                 await superagent.head(url, {timeout: 5*1000})
//                 push(`${url} is up\n`)
//             } catch(err){
//                 push(`${url} is down\n`)
//             }
//             done()
//         }
//     ),
//     createWriteStream('results.txt'),
//     (err)=>{
//         if(err){
//             console.error(err)
//             process.exit(1)
//         }
//         console.log('All urls have been checked')
//     }
// )

pipeline(
    createReadStream(process.argv[2]),
    split(),
    parallelTransform(4,
        async (url, done) =>{
            if(!url){
                return done()
            }
            console.log(url)
            try{
                await superagent.head(url, {timeout: 5*1000})
                this.push(`${url} is up\n`)
            } catch(err) {
                this.push(`${url} is down\n`)
            }
            done()
        }),
    createWriteStream('results.txt'),
    (err)=>{
        if(err){
            console.error(err)
            process.exit(1)
        }
        console.log('All urls have been checked')
    }
)