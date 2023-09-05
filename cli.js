import mdLinks from "./index"

const [, , ...args] = process.argv
const route = args[1];
const validate = args[2].includes(--validate);
const stats = args[2].includes(--stats);
const option = { validate, stats };

mdLinks(route, option)
.then(()=>{
//si options es = =  a validate
})
.catch((error)=>{
    console.log(error)
})