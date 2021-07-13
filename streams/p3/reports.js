import { createReadStream } from "fs";
import parse from "csv-parse";
import {FilterByCountry} from './filter.js'
import { SumProfit } from './profit.js'

const csvParser = parse({columns:true})

createReadStream('data.csv')
    .pipe(csvParser)
    .pipe(new FilterByCountry('Italy'))
    .pipe(new SumProfit())
    .pipe(process.stdout)
