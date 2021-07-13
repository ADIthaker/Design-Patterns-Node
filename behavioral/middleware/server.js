import zeromq from 'zeromq'
import {
    ZmqMiddlewareManager
} from './zmqMiddManager.js'
import {
    jsonMiddleware
} from './jsonMiddleware.js'
import {
    zlibMiddleware
} from './zlibMiddleware.js'


async function main() {
    const socket = new zeromq.Reply()
    await socket.bind('tcp://127.0.0.1:5000')

    const zmqm = new ZmqMiddlewareManager(socket)
    zmqm.use(zlibMiddleware())
    zmqm.use(jsonMiddleware())
    zmqm.use({
        async inbound(message) {
            console.log('Received', message)
            if (message.action === 'ping') {
                await this.send({ action: 'ping', echo: message.echo })
            }
            return message
        }
    })
    console.log('Server Started')
}
main()