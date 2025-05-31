import React, { useState, useEffect } from "react";
import { Plus, X, Edit3 } from "lucide-react";
import axios from "axios";

interface Note {
  id: string;
  text: string;
}

const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
// fetches the notes from the backend 
  const fetchNotes = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/notes");
    setNotes(response.data);
   
    setIsLoading(false);
  };
  // handle ADD note 
  const addNote = async () => {
    if (!newNote.trim()) return;

    setIsLoading(true);
    axios.post("/api/notes", {
      text: newNote,
    });
    //call to update the ui
    await fetchNotes();

    setNewNote("");
    setIsLoading(false);
  };
  // handle DELETE note 
  const deleteNote = async (id: string) => {
    setDeletingId(id);

    await axios.delete(`/api/notes:${deletingId}`);
    //call it again to update the ui
    await fetchNotes();
    setDeletingId(null);
  };

  //fetch the notes on first render
  useEffect(() => {
    fetchNotes();
  }, []);

  // handle KEYPRESS  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  return (
    <div className="min-h-screen w-screen flex justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
            Notes
          </h1>
          <p className="text-gray-500 font-light">
            Capture your thoughts with elegance
          </p>
        </div>

        {/* Add Note Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What's on your mind?"
                className="w-full px-6 py-4 bg-gray-50/50 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200 text-gray-800 placeholder-gray-400 font-light text-lg leading-relaxed"
                rows={3}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={addNote}
              disabled={!newNote.trim() || isLoading}
              className="self-end flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
              )}
            </button>
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {isLoading && notes.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center space-x-3 text-gray-400">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="font-light">Loading your notes...</span>
              </div>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Edit3 className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-light text-gray-600 mb-2">
                No notes yet
              </h3>
              <p className="text-gray-400 font-light">
                Start by adding your first note above
              </p>
            </div>
          ) : (
            notes.map((note, index) => (
              <div
                key={note.id}
                className={`group bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl hover:bg-white/80 ${
                  deletingId === note.id ? "opacity-50 scale-95" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-light text-lg leading-relaxed whitespace-pre-wrap break-words">
                      {note.text}
                    </p>
                    <p className="text-gray-400 text-sm font-light mt-3"></p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    disabled={deletingId === note.id}
                    className="ml-4 flex items-center justify-center w-10 h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 disabled:cursor-not-allowed"
                  >
                    {deletingId === note.id ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                    ) : (
                      <X className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400 font-light text-sm">
          Designed with precision and care
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
