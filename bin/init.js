#!/usr/bin/env node
const fs = require('fs');
const { argv } = require('process');
const process = require('process')
const [,, ...argvs] = process.argv

let cleanString = (arg)=>{
    // remove single quotes
    var newArg = arg.replace(/'/g, "") 

    // add '/' at the end, if needed
    if(newArg.slice(-1) != "/" || newArg.slice(-1) != "\\")
        return newArg + "/"
    else
        return newArg
}

// CASE NO ARGUMENTS - ERROR
if(argvs.length == 0)
    console.error('\x1b[31m%s\x1b[0m', 'Missing the store path')

// CASE MORE THAN 2 ARGUMENTS - ERROR
if(argvs.length > 2)
    console.error('\x1b[31m%s\x1b[0m', 'Too many arguments')   

// CASE 1 ARGUMENT - Settle just the storePath
if(argvs.length == 1){

    // --show-path option
    if(argvs[0] == "--show-path"){
        fs.readFile('./templates/storePath.txt', 'utf8', (err, data) =>{ 
            if(data == "")
                console.log( "No store path privided.")
            else
                console.log( "The current store path is " + data);
        })
    }
    // set the store path
    else{
        var storePath = cleanString(argvs[0])
        fs.writeFile('./templates/storePath.txt', storePath , (error, file) =>{
            if (error)
                throw err;
            else
                console.log( '\x1b[32m%s\x1b[0m', "You've settled " + storePath + " as Store path");
        });
    }
    
}
// CASE 2 ARGUMENTS w/ --store as second arg. Settle the storePath and initialize store.js
if(argvs.length == 2){

    // create also store.js
    if( argvs[1] == "--store"){

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
                        // copy store.js template into the new store
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
        console.error('\x1b[31m%s\x1b[0m', 'Unknown option: ' + argvs[1])   
        console.error('gen-vuex-init <path> \t\t Initialize just the store path')   
        console.error('gen-vuex-init <path> --store \t Initialize store path & create store.js into <path> location. Option [--store] is equivalent to [-s]' )   
    }
    


}





    