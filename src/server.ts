#!/usr/bin/env node

import * as inquirer from 'inquirer';
import * as path from 'path';
import {QUESTIONS} from "./questions";
import {CURRENT_DIRECTORY} from "./config";
import createProject from "./utils/createProject";
import createContent from "./utils/createContent";
import postProcess from "./utils/postProcess";

export interface CliOptions {
    projectName: string
    templateName: string
    templatePath: string
    tartgetPath: string,
    projectDescription: string,
    authorName: string,
    projectServerName:string,
    projectClientName: string,
    databaseName: string,
    sekret:string
};


inquirer.prompt(QUESTIONS)
.then(answers => {

    const projectChoice = answers['template'] === "PostgreSQL" ? "next-graphql-express-postgres" : "next-graphql-express-mongodb";
    const projectName = answers['name'];
    const projectServerName = answers["name"] + "-server";
    const projectClientName = answers["name"] + "-client";
    const projectDescription = answers['description'] != "" ? answers['description'] : "Description";
    const authorName = answers['author'] != "" ? answers['author'] : "Author";
    const databaseName = answers['databse'] != "" ? answers['databse'] : "database";
    const sekret = answers['sekret'];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const tartgetPath = path.join(CURRENT_DIRECTORY, projectName);
    const options: CliOptions = {
        projectName,
        projectDescription,
        authorName,
        templateName: projectChoice,
        templatePath,
        tartgetPath,
        projectServerName,
        projectClientName,
        databaseName,
        sekret
    }

 
    if (!createProject(tartgetPath)) {
        return;
    }

    createContent(
        templatePath, 
        projectName, 
        projectDescription, 
        authorName,
        projectServerName,
        projectClientName,
        databaseName,
        sekret
    );

    postProcess(options);
        
    console.log('\x1b[36m%s\x1b[0m', "Complete!");
    console.log(options);
    console.log(answers);
});