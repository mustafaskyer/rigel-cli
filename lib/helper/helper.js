import jetpack from 'fs-jetpack';
const shell = require('shelljs')
const fs = require('fs')
import ora from 'ora';

var count = 0
const spin = ora()
export function findPath(path){

    if (count > 5) { return { status: false, message: "make sure you're inside arigel app" } }
    
    if(jetpack.exists('.rigel')){
        return { status: true, path: `${process.cwd()}/${path}`, message: 'success' }
    }

    shell.cd('../')
    count++

    return findPath(path)
}

export function append(path, data, options){
    jetpack.appendAsync(path, data, options)
}

export async function appendToFile(path, occurances, content){
    const file = await jetpack.readAsync(path, 'utf8')
    const index = occurances.findIndex((occr, i) => file.indexOf(occr) !== -1)
    if(index !== -1){
        const _file = file.replace(occurances[index], `${occurances[index]}\n${content}`)
        await jetpack.writeAsync(path, _file, { jsonIndent: 0, atomic: true })
    }else{
        spin.warn(`make sure you're importing react-native there`)
        spin.fail(`Can't append to file: ${path}`)
    }
    return;
}