const express= require("express")
const noteRouter = express.Router()
const {NoteModel} = require("../model/note.model")
const jwt = require("jsonwebtoken")

noteRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"masai")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userId":decoded.userId});
            res.status(200).send(notes)
        }
        //  else {
        //     res.status(400).send("No note has been created by this user")
        // }
        
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.post("/add",async(req,res)=>{
    try{
        const notes = new NoteModel(req.body)
        await notes.save()
        res.status(200).send({"msg":"A new note has been added"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.patch("/update/:noteId",async(req,res)=>{
    const payload=  req.body
    const noteId = req.params.noteId
    try{
        await NoteModel.findByIdAndUpdate({_id:noteId},payload)
        res.status(200).send({"msg":"Note has been updated."})
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

noteRouter.delete("/delete/:noteId",async(req,res)=>{
    const payload=  req.body
    const noteId = req.params.noteId
    try{
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.status(200).send({"msg":"Note has been updated."})
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {
    noteRouter
}