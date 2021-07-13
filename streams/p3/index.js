import { ReplaceStream } from "./replaceStream.js";

const replaceStream = new ReplaceStream('World', 'Node.js')
replaceStream.on('data', chunk=>console.log(chunk.toString()))

replaceStream.write("Hello W")
replaceStream.write("orld!")
replaceStream.end()