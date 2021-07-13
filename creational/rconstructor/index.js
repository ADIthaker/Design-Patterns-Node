import { ImmutableBuffer } from './immutableBuffer.js';

const hello = "hello"
const immutable = new ImmutableBuffer(hello.length,
    ({ write }) => {
    write(hello)
    })

console.log(String.fromCharCode(immutable.readInt8(0)))