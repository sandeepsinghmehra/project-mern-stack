import React, { useState } from 'react';
import QuillEditor from './Editer';


const NewCreatePage = (props) => {

    const [content, setContent] = useState("")
    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setContent(value)
        console.log(content)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <QuillEditor
                placeholder={"Start Posting Something"}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />
        </div>
    )
}

export default NewCreatePage;