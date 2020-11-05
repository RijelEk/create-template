import * as yargs from 'yargs';
import * as fs from 'fs';
import * as path from 'path';

const err_mess = (name:string):string => {return `${name} may only include letters, numbers, underscores and hashes.`};

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
        when: () => !yargs.argv['description'],
        validate: (input: string) => {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return err_mess("Project description");
        }
    },
    {
        name: 'author',
        type: 'input',
        message: 'Author name:',
        when: () => !yargs.argv['author'],
        validate: (input: string) => {
          if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
          else return err_mess("Author name");
        }
    }
];