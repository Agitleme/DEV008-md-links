import mdLinks from "./index"

const [, , ...args] = process.argv
console.log(args)
const route = args[0];
const validate = args.includes('--validate');
const stats = args.includes('--stats');
const option = { validate, stats };

mdLinks(route, option)
.then((result)=>{
//si options es = =  a validate
console.log(result)
})
.catch((error)=>{
    console.log(error)
})