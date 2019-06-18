import React from 'react';
import FileIcon, {defaultStyles} from "react-file-icon";

const IconJoiner = ({type, ext}) => {
    let size;
    if (type === 'material') {
        size = 30;

        if (ext === 'docx') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.docx} />
        } else if (ext === 'zip' || ext === 'rar') {
            return <FileIcon extension={ext} size={size} color="orange" glyphColor="red" {...defaultStyles.zip} />

        } else if (ext === 'ppt' || ext === 'pptx') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.ppt} />

        } else if (ext === 'xls' || ext === 'xlsx') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.xls} />

        } else if (ext === 'pdf') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.pdf} />
        } else if (ext === 'mp4') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.mp4} />
        } else if (ext === 'assignment') {
            return <FileIcon size={30} color="lightblue" glyphColor="blue" {...defaultStyles.jsx} />
        } else if (ext === 'exam') {
            return <FileIcon size={30} color="gray" glyphColor="black" {...defaultStyles.jsx} />
        } else {
            return <FileIcon extension={ext} size={size} {...defaultStyles.psd} />
        }

    } else if (type === 'assignment') {
        size = 25;
        if (ext === 'docx') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.docx} />
        } else if (ext === 'zip' || ext === 'rar') {
            return <FileIcon extension={ext} size={size} color="orange" glyphColor="red" {...defaultStyles.zip} />

        } else if (ext === 'ppt' || ext === 'pptx') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.ppt} />

        } else if (ext === 'xls' || ext === 'xlsx') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.xls} />

        } else if (ext === 'pdf') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.pdf} />
        } else if (ext === 'mp4') {
            return <FileIcon extension={ext} size={size} {...defaultStyles.mp4} />
        } else if (ext === 'assignment') {
            return <FileIcon size={30} color="lightblue" glyphColor="blue" {...defaultStyles.jsx} />
        } else {
            return <FileIcon extension={ext} size={size} {...defaultStyles.psd} />
        }
    }


};

export default IconJoiner;