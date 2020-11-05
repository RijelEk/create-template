#!/usr/bin/env node

import * as inquirer from 'inquirer';
import * as path from 'path';
import {QUESTIONS} from "./questions";
import {CURRENT_DIRECTORY} from "./config";
import createProject from "./utils/createProject";
import createContent from "./utils/createContent";

export interface CliOptions {
    projectName: string
    templateName: string
    templatePath: string
    tartgetPath: string,
    projectDescription: string,
    authorName: string
};

inquirer.prompt(QUESTIONS)
.then(answers => {

    const projectChoice = answers['template'];
    const projectName = answers['name'];
    const projectDescription = answers['description'];
    const authorName = answers['author'];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const tartgetPath = path.join(CURRENT_DIRECTORY, projectName);
    const options: CliOptions = {
        projectName,
        projectDescription,
        authorName,
        templateName: projectChoice,
        templatePath,
        tartgetPath
    }

 
    if (!createProject(tartgetPath)) {
        return;
    }

    createContent(templatePath, projectName);
  
    console.log(options);
    console.log(answers);
});