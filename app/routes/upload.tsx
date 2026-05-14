import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="min-h-screen relative flex flex-col pt-10 transition-colors duration-300">
            <Navbar />

            <section className="main-section flex-1 w-full max-w-4xl mx-auto animate-fade-in-up">
                <div className="page-heading py-8 w-full">
                    <h1 className="text-4xl md:text-5xl">Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-6 mt-8">
                            <h2 className="text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">{statusText}</h2>
                            <div className="glass-panel p-8 w-full max-w-md flex justify-center items-center shadow-xl shadow-indigo-500/10">
                                <img src="/images/resume-scan.gif" className="w-full rounded-xl mix-blend-multiply dark:mix-blend-screen opacity-80" alt="Processing" />
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-xl md:text-2xl mt-4">Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-12 w-full glass-panel p-8 md:p-12 shadow-xl shadow-indigo-500/5 dark:shadow-none border-t-4 border-t-indigo-500">
                            <div className="form-div">
                                <label htmlFor="company-name" className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Company Name</label>
                                <input type="text" name="company-name" placeholder="E.g. Google, Amazon" id="company-name" required />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title" className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Job Title</label>
                                <input type="text" name="job-title" placeholder="E.g. Frontend Engineer" id="job-title" required />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description" className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Job Description</label>
                                <textarea rows={6} name="job-description" placeholder="Paste the full job description here..." id="job-description" required />
                            </div>

                            <div className="form-div mt-4">
                                <label htmlFor="uploader" className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Upload Resume (PDF)</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button mt-8 text-lg py-4" type="submit" disabled={!file}>
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload