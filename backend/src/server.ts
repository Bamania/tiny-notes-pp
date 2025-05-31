import express, { Request, Response } from "express";


const app=express();
app.use(express.json());

interface Notes{
id:number,
text:string
}

const notes:Notes[]=[{ id: 1, text: "Initialize with a common pkg.json" },{ id: 2, text:   "Add a common run file" },{ id: 3, text: "update the git" }
]
//send the data to frontend !
app.get("/notes",(req:Request,res:Response)=>{

   res.send(notes);
})

app.post("/notes",(req:Request,res:Response)=>{
    console.log("req.body object ",req.body);
    
    const {text}=req.body
    //get last element id
    const lastId=notes[notes.length-1].id
    //adjust the new noteID accordingly
    const newElement={id:lastId+1,text:text}
    notes.push(newElement);
    res.send({message:"Note Added"})
})
app.delete("/note:id",(req:Request,res:Response)=>{
    //since params and query are string by default,we need to parse it to INT
    const noteId = parseInt(req.params.id);
    // search the required Note's Index
 const noteIndex = notes.findIndex(note => note.id === noteId);
notes.splice(noteIndex, 1); //deleted
res.send({message: "deleted"})
})


app.listen(5000,()=>{
    console.log("server is running at 5000");
    
})