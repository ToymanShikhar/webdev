import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [click, setClick] = useState(false);

    function addContent(event) {
        const item = event.target.value;
        setContent(item);
    }

    function addTitle(event) {
        const item = event.target.value;
        setTitle(item);
    }

    function handleClick() {
        setClick(true);
    }

    return (
        <div>
            <form className="create-note">
                {click && (
                    <input
                        onChange={addTitle}
                        name="title"
                        placeholder="Title"
                        value={title}
                    />
                )}

                <textarea
                    onChange={addContent}
                    name="content"
                    placeholder="Take a note..."
                    rows={click ? "3" : "1"}
                    value={content}
                    onClick={handleClick}
                />
                <Zoom in={click ? true : false}>
                    <Fab
                        type="button"
                        onClick={() => {
                            props.buttonClick(title, content);
                            setContent("");
                            setTitle("");
                        }}
                    >
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
