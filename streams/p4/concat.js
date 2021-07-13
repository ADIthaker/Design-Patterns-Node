const {concat} = require('./concat-files.js')
async function main(){
    try{
        await concat(process.argv[2], process.argv.slice(3))
    } catch(err){
        console.error(err)
        process.exit(1)
    }
    console.log('All files concatenated successfully')
}

main()
// node concat.js man.txt bye.txt hello.txt