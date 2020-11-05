import * as yargs from 'yargs';
import * as fs from 'fs';
import * as path from 'path';

const err_mess = (name:string):string => {return `${name} may only include letters, numbers, underscores and hashes.`};
//TODO choose databse not template
const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
export const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What stack would you prefer?',
        choices: CHOICES
    },
    {
        name: 'name',
        type: 'input',
        message: 'Project name:',
        when: () => !yargs.argv['name'],
        validate: (input: string) => {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return err_mess("Project name");
        }
    },
    {
        name: 'description',
        type: 'input',
        message: 'Project description:',
        when: () => !yargs.argv['description']
    },
    {
        name: 'author',
        type: 'input',
        message: 'Author name:',
        when: () => !yargs.argv['author']
    },
    {
        name:"server-port",
        type:"input",
        message:"Enter PORT for server: (http://localhost:4000)",
        when: () => !yargs.argv['server-port']
    },
    {
        name:"client-port",
        type:"input",
        message:"Enter PORT for client: (http://localhost:3000)",
        when: () => !yargs.argv['client-port']
    }
];