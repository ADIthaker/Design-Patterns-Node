import {spider} from './spiderv3.mjs'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3],10) || 1
spider(url, nesting, (err,filename, downloaded)=>{
    if(err){
        console.error(err)
        process.exit(1)
    } 
    console.log("Download complete!")
})
