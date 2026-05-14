import ResumeCard from "~/components/ResumeCard";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumAi | Dashboard" },
    { name: "description", content: "Smart Feedback for your Resume" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);
      const resumesData = (await kv.list('resume:*', true)) as KVItem[];

      const parseResumes = resumesData?.map((item) => {
        return JSON.parse(item.value) as Resume;
      }) || [];
      
      setResumes(parseResumes);
      setLoadingResumes(false);
    }
    fetchResumes();
  }, [kv]);

  return (
    <main className="min-h-screen relative flex flex-col pt-0 transition-colors duration-300">
      <div className="relative z-10 flex-1 flex flex-col pt-10">
        <Navbar />
        
        <section className="flex flex-col items-center px-6 pt-20 pb-12 w-full max-w-[1400px] mx-auto flex-1">
          <div className="text-center max-w-4xl mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6 transition-colors duration-300">
              Elevate Your Career with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">AI-Powered</span> Analysis
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
              Get intelligent, actionable feedback on your resume. Optimize for ATS and land your dream job faster.
            </p>
          </div>

          {loadingResumes ? (
            <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
              <img src="/images/resume-scan-2.gif" alt="Loading" className="w-32 h-32 object-contain opacity-80" />
              <p className="text-gray-500 font-medium mt-4">Loading your analyses...</p>
            </div>
          ) : resumes.length === 0 ? (
            <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center shadow-xl shadow-blue-900/5 dark:shadow-none animate-in fade-in slide-in-from-bottom-8 duration-700 transition-colors duration-300">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">No Resumes Found</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto transition-colors duration-300">
                You haven't uploaded any resumes yet. Upload your first resume to get an instant, detailed AI review.
              </p>
              <Link to="/upload" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-full hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all shadow-lg shadow-blue-500/30 dark:shadow-blue-900/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                Upload Your Resume
              </Link>
            </div>
          ) : (
            <div className="w-full animate-in fade-in duration-700 mt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 w-full px-2 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Your Recent Analyses</h2>
                <Link to="/upload" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  + New Analysis
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
