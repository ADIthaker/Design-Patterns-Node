import { createProfiler } from "./profiler.js";

function getAllFactors(intNumber){
    const profiler = createProfiler(
        `Finding all factors if ${intNumber}`
    )
    profiler.start()
    const factors = []
    for (let factor = 2; factor<=intNumber; factor++){
        while((intNumber%factor)===0){
            factors.push(factor)
            intNumber = intNumber/factor
        }
    }
    profiler.end()
    return factors
}

const myNumber = process.argv[2]
const myFactors = getAllFactors(myNumber)
console.log(`Factor of ${myNumber} are: `, myFactors)