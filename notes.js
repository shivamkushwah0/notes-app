import fs from 'fs';
import chalk from 'chalk';

export const getNotes = () => 
{
 try{
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

export const addNotes = (title , body ) => {
    const notes = getNotes();
    const duplicateNotes  = notes.find((note) =>title === note.title);

    debugger
        if(!duplicateNotes)
        {
        notes.push({
        title : title ,
        body : body 
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("The Note is Added"));
    }
        else {
            console.log(chalk.red.inverse("The title is taken"))
        }
    

}

export const removeNote = (title) => {
    const notes = getNotes() ;
    if (notes.length === 0 )
    console.log("The list is empty , nothing to remove");

    else {
        const tokeep = notes.filter((note)=>note.title !== title);
        if(tokeep.length === notes.length)
        console.log(chalk.red.inverse("Title does not exist"));
        else 
        {
        saveNotes(tokeep);
        console.log(chalk.green.inverse("The named note is removed"));
        }
    }
}
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json' , JSON.stringify(notes));
}

export const listNotes = () => {
    const notes = getNotes();             //notes is a object there
    if(notes.length)
    {
        console.log(chalk.green.inverse("Your Notes"))
        notes.map((note) => {
            console.log("Title : " + note.title);
        })
    }
    else {
        console.log(chalk.red.inverse("Notes is Empty , Nothing to show here "))
    }
}
export const readNotes = (title) => {
    const notes = getNotes();

    const note = notes.find((note) => {
        return note.title === title;
    })
    if(note)
    {
        console.log(chalk.bold.green(title) + " " + chalk.grey.inverse(note.body))
    }
    else console.log(chalk.bold.red("The required data was not found in the database"))
}
