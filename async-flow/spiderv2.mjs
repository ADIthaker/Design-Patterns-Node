import {urlToFilename} from './utils.mjs'
import superagent from 'superagent'
import fs from 'fs'
import {getPageLinks} from './utils.mjs'
import mkdirp from 'mkdirp'
import path from 'path'

function saveFile (filename, contents, cb) {
    mkdirp(path.dirname(filename), err => {
    if (err) {
        return cb(err)
    }
    fs.writeFile(filename, contents, cb)
    })
}
function download (url, filename, cb) {
    console.log(`Downloading ${url}`)
    superagent.get(url).end((err, res) => {
    if (err) {
    return cb(err)
    }
    saveFile(filename, res.text, err => {
    if (err) {
    return cb(err)
    }
    console.log(`Downloaded and saved: ${url}`)
    cb(null, res.text)
    })
    })
}
function spiderLinks(currentUrl, body, nesting, cb) {
    if(nesting==0){
        return process.nextTick(cb)
    }
    const links = getPageLinks(currentUrl, body)
    if(links.length == 0){
        return process.nextTick(cb)
    }
    function iterate(index){
        if(index == links.length){
            return cb()
        }
        spider(links[index], nesting-1, function(err){
            if (err) return cb(err)
            iterate(index+1)
        })
    }
    iterate(0)
}
export function spider(url, nesting, cb) {
    const filename = urlToFilename(url)
    fs.readFile( filename, 'utf8', (err, fileContent)=>{
        if (err){
            if(err.code!="ENOENT"){
                return cb(err)
            }
            return download(url, filename,(err, requestContent)=>{
                if(err) return cb(err)
                spiderLinks(url, requestContent, nesting, cb)
            })
        }
        spiderLinks(url, fileContent, nesting, cb)
    })
}
/**
 * SEQUENTIAL PATTERN IS:
 * function iterate(index){
 *  if(index == tasks.length) {
 *      return finish()
 * }
 *  const task = tasks[index]
 *  task(()=> iterate(index+1))
 * }
 * function finish(){
 *  //iteration complete
 * }
 */