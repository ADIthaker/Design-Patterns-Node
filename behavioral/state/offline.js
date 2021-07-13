import jsonOverTcp from 'json-over-tcp-2'

export class OfflineState {
    constructor(failsafesocket) {
        this.failsafesocket = failsafesocket
    }

    send(data) {
        this.failsafesocket.queue.push(data)
    }

    activate() {
        const retry = () => {
            setTimeout(()=> this.activate(), 1000)
        }
        console.log(`Trying to connect ...`)
        this.failsafesocket.socket = jsonOverTcp.connect(
            this.failsafesocket.options,
            () => {
                console.log('Connection Established')
                this.failsafesocket.socket.removeListener('error', retry)
                this.failsafesocket.changeState('online')
            }
        )
        this.failsafesocket.socket.once('error', retry)
    }
}