import * as fs from 'fs';
import * as path from 'path';
import {CURRENT_DIRECTORY} from "../config";
import * as template from './template';

const SKIP_FILES = ['node_modules', '.template.json']; // Ignore list

export default function createContent(
    templatePath: string, 
    projectName: string, 
    projectDescription:string, 
    authorName:string,
    projectServerName:string,
    projectClientName: string,
    databaseName:string,
    sekret: string
    ) {
 
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = path.join(templatePath, file);
        const stats = fs.statSync(origFilePath);
    
        if (SKIP_FILES.indexOf(file) > -1) return;
        
        if (stats.isFile()) {
         
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = template.render(contents, 
                { 
                    projectName, 
                    projectDescription, 
                    authorName, 
                    projectClientName, 
                    projectServerName,
                    databaseName,
                    sekret 
                });
 
            const writePath = path.join(CURRENT_DIRECTORY, projectName, file);
            fs.writeFileSync(writePath, contents, 'utf8');

        } else if (stats.isDirectory()) {
          
            fs.mkdirSync(path.join(CURRENT_DIRECTORY, projectName, file));
            createContent(
                path.join(templatePath, file), 
                path.join(projectName, file),
                projectDescription,
                authorName,
                projectServerName,
                projectClientName,
                databaseName,
                sekret
            );
        }
    });
}