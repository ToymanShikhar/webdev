import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(title, content) {
        const note = {
            title: title,
            content: content
        };
        setNotes((prevState) => {
            return [...prevState, note];
        });
    }
    function removeItem(id) {
        setNotes((previous) => {
            return previous.filter((x, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea buttonClick={addNote} />
            {notes.map((x, index) => (
                <Note
                    key={index}
                    id={index}
                    title={x.title}
                    content={x.content}
                    deleteItem={removeItem}
                />
            ))}
            <Footer />
        </div>
    );
}

export default App;
