#!/usr/bin/env node
const fs = require('fs');
const { argv } = require('process');
const process = require('process')
const [,, ...argvs] = process.argv

let cleanString = (arg)=>{
    // remove single quotes
    arg.replace(/'/g, "") 

    // add '/' at the end, if needed
    if(arg.slice(-1) != "/" || arg.slice(-1) != "\\")
        return arg + "/"
    else
        return arg
}

if(argvs.length == 0)
    console.error('\x1b[31m%s\x1b[0m', 'Missing the store path')

if(argvs.length > 2)
    console.error('\x1b[31m%s\x1b[0m', 'Too many arguments')   

if(argvs.length == 1){
    var storePath = cleanString(argvs[0]) 
    fs.writeFile('./templates/storePath.txt', storePath , (error, file) =>{
        if (error) 
            throw err;
        else
            console.log( '\x1b[32m%s\x1b[0m', "You've settled " + storePath + " as Store path");
    });


}
if(argvs.length == 2){

    // create also store.js
    if( argvs[1] == "-s" || argvs[1] == "--store"){
        var storePath = cleanString(argvs[0]) 
        fs.writeFile('./templates/storePath.txt', storePath , (error, file) =>{
            if (error) 
                throw err;
            else{
                console.log( '\x1b[32m%s\x1b[0m', "You've settled " + storePath + " as Store path");
                
                // create the store folder and the store.js file
                fs.mkdir(storePath, {recursive:true}, (error)=>{
                    if (error) 
                        console.log(error)
                    else{
                        fs.copyFile('./templates/store.js', storePath + 'store.js', (err) => {
                            if (err) throw err;
                            console.log('\x1b[32m%s\x1b[0m', 'store.js has been created');
                        });
                    }
                })
            }
            
        });
    }
    else{
        console.error('\x1b[31m%s\x1b[0m', 'Command not found')   
        console.error('gen-vuex-init <path> -s \t initialize path store & create store.js into <path> location')   
    }
    


}





    