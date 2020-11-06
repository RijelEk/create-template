import * as ejs from 'ejs';
export interface TemplateData {
    projectName: string,
    projectDescription: string,
    authorName: string,
    projectServerName: string,
    projectClientName: string,
    databaseName:string,
    sekret:string
}
export function render(content: string, data: TemplateData) {
    return ejs.render(content, data);
}