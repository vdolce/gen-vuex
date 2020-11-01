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

if(argvs.length > 1)
    console.error('\x1b[31m%s\x1b[0m', 'Only one argument required')   

if(argvs.length == 1){
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
                    fs.writeFile(storePath + 'store.js', '', (error, file) =>{
                        if (error) 
                            console.log(error)
                        console.log( '\x1b[32m%s\x1b[0m', 'store.js has been created' );
                    });
                }
            })
        }
        
    });


}





    