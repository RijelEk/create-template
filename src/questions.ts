import * as yargs from 'yargs';

const err_mess = (name:string):string => {return `${name} may only include letters, numbers, underscores and hashes.`};

// const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const CHOICES = ["PostgreSQL", "MongoDB"];
export const QUESTIONS = [
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
        name: 'template',
        type: 'list',
        message: 'What database would you like to use?',
        choices: CHOICES
    },
    {
        name:"database",
        type:"input",
        message:"Enter database name: ",
        when: () => !yargs.argv['database']
    },
    {
        name:"sekret",
        type:"password",
        message:"Enter sekret database word: ",
        when: () => !yargs.argv['sekret'],
        validate: (input: string) => {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return err_mess("Project name");
          }
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