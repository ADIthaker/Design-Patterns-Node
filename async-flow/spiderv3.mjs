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
    let complete = 0
    let hasErrors = false
    function done (err){
        if(err) {
            hasErrors = true
            return cb(err)
        }
        if(++complete == links.length && !hasErrors){
            return cb()
        }
    }
    links.forEach(link=>spider(link, nesting-1, done))
}
const spidering =  new Set()
export function spider(url, nesting, cb) {
    if(spidering.has(url)) {
        return process.nextTick(cb)
    }
    spidering.add(url)
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
 * PARALLEL EXECUTION
 * const tasks = [//]
 * let completed = 0
 * tasks.forEach(task => {
 *  task(()=>{
 *      if(++complete==tasks.length) {
 *          finish()
 *      }
 *  })
 * })
 * function finish() {
 *  // all tasks completed
 * }
 */

/**
 * PARALLEL EXECUTION WITH LIMIT
 * const tasks = [//]
 * let completed = 0
 * let concurrency = 2
 * let index = 0
 * let running = 0
 * function next(){
 *  while(running<concurrency && index <tasks.length){ 
 *      const task = task[index++]
 *      task(()=>{
 *          if(++complete === tasks.length) {
 *              return finish()
 *          }
 *          running--
 *          next()
 *      })
 *      running++
 *  }
 * }
 * next()
 * function finish() {
 *  // all tasks completed
 * }
 */