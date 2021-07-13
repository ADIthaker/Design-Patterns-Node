import { Matrix } from './matrix.js'
import {
    CheckUrls
} from './asyncIter.js'

async function main() {
    const checkUrls = new CheckUrls([
        'https://nodejsdesignpatterns.com',
        'https://example.com',
        'https://mustbedownforsurehopefully.com'
    ])

    for await (const status of checkUrls) {
        console.log(status)
    }
}

main()


const matrix2x2 = new Matrix([
    ['11', '12'],
    ['21', '22']
])

const iterator = matrix2x2[Symbol.iterator]()

let iterationRes = iterator.next()

while (!iterationRes.done) {
    console.log(iterationRes.value)
    iterationRes = iterator.next()
}