import yargs  from 'yargs';
import {addNotes , listNotes, readNotes, removeNote}  from "./notes.js";

const args =yargs(process.argv.slice(2));

args.command({
    command : "add" , 
    describe : "Add a note" ,
    builder : {
        title : {
            describe : "Notes Title" , 
            demandOption : true ,
            type : "string"
        } ,
        body : {
            describe : "Notes Body" ,
            demandOption : true ,
            type : "string"
        }
    } , 
    handler : (argv) => {
        addNotes(argv.title , argv.body)    
    }
})

args.command({
    command: 'remove',
    describe: 'to remove note',
    builder : {
        title : {
            describe : "Title of the notes to remove",
            demandOption : true ,
            type : "string"
        }
    },
    handler: (argv) => {
        removeNote(argv.title);
    } 
})

args.command({
    command: 'list',
    describe: 'to list notes',
    handler: () => {
        listNotes();
    } 
})

args.command({
    command: 'read',
    describe: 'to read note',
    builder : {
        title : {
            describe : "Note to read",
            demandOption : true ,
            type:"string"
            }
    } ,
    handler:  (argv) => {
        readNotes(argv.title)
    } 
})

args.parse();

