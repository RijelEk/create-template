import * as shell from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';
import { CliOptions } from "../server";

function install(exist:any, path:string):any{
    if (exist) {
        shell.cd(path);
        const result = shell.exec('npm install');
        if (result.code !== 0) {
            return false;
        }
    };
}

export default function postProcess(options: CliOptions) {

    const isServer = fs.existsSync(path.join(options.templatePath + '/server', 'package.json'));
    install(isServer, options.tartgetPath + "/server");
   
    const isClient = fs.existsSync(path.join(options.templatePath + '/client', 'package.json'));
    install(isClient, options.tartgetPath + "/server");
    
    return true;
}