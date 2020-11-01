#!/usr/bin/env node
const fs = require('fs');
const process = require('process')
const [,, ...argvs] = process.argv


var storePath = ""
// read store path
fs.readFile('./templates/storePath.txt', 'utf8', function(err, data) {
    if (err) throw err;
    storePath = data.toString()
    
    if(storePath == undefined || storePath == ''){
        console.error('\x1b[31m%s\x1b[0m', 'You need to initialize the Store\'s (absolute or relative) path.')
        console.error('\x1b[33m%s\x1b[0m', 'Please, use the command: gen-vuex-init \'<path>\'')
        process.exit(1)
    }
    else{
        if(argvs.length==0){
            console.error('\x1b[31m%s\x1b[0m', 'Missing the view or component name')
            process.exit(1)
        }
        else{
            argvs.forEach((element)=>{
                const modulePath = storePath + "modules/" + element + 'Store/'
                console.log("***** Files will be created here: " + modulePath + " *****")
                // create folders recursively
                fs.mkdir(modulePath, {recursive:true}, (error)=>{
                    if (error) {
                        console.log('\x1b[31m%s\x1b[0m', error)
                      } else {
                        console.log('\x1b[32m%s\x1b[0m', "Directory " + modulePath + " successfully created.")
                      }
            
                    // copy index.js file from templates folder (instead of create and fill it)
                    fs.copyFile('./templates/index.js', modulePath + 'index.js', (err) => {
                        if (err) throw err;
                        console.log('\x1b[32m%s\x1b[0m', 'index.js has been created');
                    });
            
                    // create state, actions, mutations, getters JS files
                    const filesArray = ['state', 'actions', 'mutations', 'getters']
                    filesArray.forEach((element)=>{
                        fs.writeFile(modulePath + element +'.js', 'export default{\n\n}', (error, file) =>{
                            if (error) 
                                throw err;
                            console.log( '\x1b[32m%s\x1b[0m', element + '.js has been created' );
                        });
                    })
                });
            })
        }        
    }
});