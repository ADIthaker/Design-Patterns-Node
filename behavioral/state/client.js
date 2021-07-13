import { FailSafeSocket } from "./failSafeSocket.js";

const failSafeSocket = new FailSafeSocket({ port: 5000 })

setInterval(() => {
    failSafeSocket.send(process.memoryUsage())
}, 1000)