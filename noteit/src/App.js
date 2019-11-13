
import React, { useState, useEffect } from "react";

// SERVICES
import noteService from './services/noteService';

function App() {
  const [notes, setnotes] = useState(null);

  useEffect(() => {
    if(!notes) {
      getNotes();
    }
  })

  const getNotes = async () => {
    let res = await noteService.getAll();
    console.log(res);
    setnotes(res);
  }

  const renderProduct = note => {
    return (
      <li key={note._id} className="list__item note">
        <h3 className="note__name">{note.name}</h3>
        <p className="note__description">{note.description}</p>
      </li>
    );
  };

  return (
    <div className="App">
      <ul className="list">
        {(notes && notes.length > 0) ? (
          notes.map(note => renderProduct(note))
        ) : (
          <p>No notes found</p>
        )}
      </ul>
    </div>
  );
}

export default App;