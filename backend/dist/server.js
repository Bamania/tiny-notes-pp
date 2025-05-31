"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const notes = [{ id: 1, text: "Initialize with a common pkg.json" }, { id: 2, text: "Add a common run file" }, { id: 3, text: "update the git" }
];
app.get("/notes", (req, res) => {
    res.send(notes);
});
app.post("/notes", (req, res) => {
    console.log("req.body object ", req.body);
    const { text } = req.body;
    const lastId = notes[notes.length - 1].id;
    const newElement = { id: lastId + 1, text: text };
    notes.push(newElement);
    console.log("in memory array ", notes);
    res.send({ message: "success" });
});
app.delete("/note:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    const noteIndex = notes.findIndex(note => note.id === noteId);
    notes.splice(noteIndex, 1); // Same deletion logic
    res.send({ message: "deleted" });
});
app.listen(5000, () => {
    console.log("server is running at 5000");
});
