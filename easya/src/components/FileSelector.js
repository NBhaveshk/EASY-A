import { useCallback } from 'react';
import styles from './FileSelector.module.css';
import { useDropzone } from 'react-dropzone';

export default function FileSelector({ set_files, multiple, drag_active_text = "Drop Files Here", drag_inactive_text = "Select Files" }) {
    const onDrop = useCallback(acceptedFiles => {
        const files_data = []
        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                files_data.push(reader.result)
                if (files_data.length === acceptedFiles.length) set_files(files_data)
            }
            reader.readAsDataURL(file)
        })
    }, [set_files]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: multiple,
        accept: {
            'image/*': [],
        }
    })

    return (
        <div {...getRootProps({
            className: styles.selector
        })}>
            <input {...getInputProps()} />
            {isDragActive && drag_active_text}
            {!isDragActive && drag_inactive_text}
        </div>
    )
}