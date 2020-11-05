#!/usr/bin/env node
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const QUESTIONS = [
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
          else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
      }
];

inquirer.prompt(QUESTIONS)
.then(answers => {
    console.log(answers);
});