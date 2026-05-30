import { createServer } from 'http';
import path from 'path';
import {  readFile } from "fs/promises";
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = createServer(async(req, res)=> {
    try{
        logger(req)
        if(await getStaticFiles(req, res)) return;
        switch(req.url){
            default:
            res.statusCode = 404;
            res.setHeader("content-type", "text/plain")
            res.end("not found")
        }
    }catch(error){
        console.error(error);
        res.statusCode = 500;
        res.end(error.message);
    }  
})

async function getStaticFiles(req, res){
    try{
        let fileName = req.url.substring(1)
        if(req.url == "/") fileName = "index.html"
        let pathToFile = path.join(__dirname, 'static', fileName)
        let file = await readFile(pathToFile)
        res.statusCode = 200
        res.end(file)
        return true
    }catch(err){
        return false
    }
}

function logger(req){
    let url = chalk.green(req.url);
    let time = chalk.red (new Date().toLocaleTimeString())
    let method = chalk.blue(req.method);
    console.log(`${time}: ${method} - ${url}`)
}
server.listen(3000, () => console.log("server start on port 3000"))