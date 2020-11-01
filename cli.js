#!/usr/bin/env node
const fs = require('fs');
const process = require('process')
const [,, ...argvs] = process.argv

if(argvs.length==0)
    console.error('\x1b[31m%s\x1b[0m', 'Missing the view/component name')

var storePath = './src/store/modules/'

argvs.forEach((element)=>{
    const modulePath = storePath + element + 'Store/'

    // create folders recursively
    fs.mkdir(modulePath, {recursive:true}, (error)=>{
        if (error) {
            console.log('\x1b[31m%s\x1b[0m', error)
          } else {
            console.log('\x1b[32m%s\x1b[0m', "Directory " + modulePath + " successfully created.")
          }

          // create index.js w/ content from a txt file   
        fs.writeFile(modulePath + 'index.js','', (err, file) =>{
            if (err) throw err;
            console.log('\x1b[32m%s\x1b[0m', 'index.js has been created in ' + modulePath);
        });

        // open destination file (index.js) for appending
        var w = fs.createWriteStream(modulePath + 'index.js', {flags: 'a'});
        // open source file (indexStoreContent.txt) for reading
        var r = fs.createReadStream('indexStoreTemplate.txt');      
        r.pipe(w);

        // create state, actions, mutations, getters JS files
        const filesArray = ['state', 'actions', 'mutations', 'getters']
        filesArray.forEach((element)=>{
            fs.writeFile(modulePath + element +'.js', 'export default{\n\n}', (error, file) =>{
                if (error) 
                    throw err;
                console.log( '\x1b[32m%s\x1b[0m', element + '.js has been created in ' + modulePath );
            });
        })

    });
})

