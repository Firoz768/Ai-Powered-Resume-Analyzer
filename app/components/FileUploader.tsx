import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    // Add local state to manage the selected file
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        // Update the local state
        setSelectedFile(file);
        // Call the prop function
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    });

    const removeFile = useCallback(() => {
        // Clear the local state
        setSelectedFile(null);
        // Call the prop function to notify the parent component
        onFileSelect?.(null);
    }, [onFileSelect]);


    return (
        <div className="w-full">
            <div {...getRootProps()} className={`uplader-drag-area ${isDragActive ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : ''}`}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer flex flex-col items-center justify-center w-full">
                    {selectedFile ? (
                        <div className="uploader-selected-file w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10 opacity-80" />
                            <div className="flex items-center space-x-3 flex-1 px-4 overflow-hidden">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {formatSize(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors" onClick={removeFile}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 dark:invert" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                                <img src="/icons/info.svg" alt="upload" className="size-8 dark:invert opacity-70" />
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-1">
                                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader