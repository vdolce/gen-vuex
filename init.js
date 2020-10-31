#!/usr/bin/env node
const process = require('process')
const [,, ...argvs] = process.argv

const storePath = ''

if(argvs.length == 0)
    console.error('Missing the parent\'s store path')
if(argvs.length > 1)
    console.error('Only one argument required')   

storePath = argvs[0]

exports.storePath = storePath