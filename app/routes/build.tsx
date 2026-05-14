import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import ResumeForm from "~/components/builder/ResumeForm";
import ResumePreview from "~/components/builder/ResumePreview"
import type { ResumeDraft } from "~/types/resume";

const defaultResumeData: ResumeDraft = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
};

export default function BuildResume() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeDraft>(defaultResumeData);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load draft on mount
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/build");
      return;
    }

    const loadDraft = async () => {
      try {
        const draftStr = await kv.get("draft:resume");
        if (draftStr) {
          const parsed = JSON.parse(draftStr);
          setResumeData({
            ...defaultResumeData,
            ...parsed,
            personalInfo: { ...defaultResumeData.personalInfo, ...(parsed.personalInfo || {}) },
            experience: parsed.experience || [],
            education: parsed.education || [],
            skills: parsed.skills || []
          });
        }
      } catch (e) {
        console.error("Failed to load draft:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadDraft();
  }, [auth.isAuthenticated, kv, navigate]);

  // Save draft whenever it changes (debounced)
  useEffect(() => {
    if (isLoading) return;

    const saveDraft = async () => {
      setIsSaving(true);
      try {
        await kv.set("draft:resume", JSON.stringify(resumeData));
      } catch (e) {
        console.error("Failed to save draft:", e);
      } finally {
        setIsSaving(false);
      }
    };

    const timeout = setTimeout(saveDraft, 1500);
    return () => clearTimeout(timeout);
  }, [resumeData, isLoading, kv]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex flex-col pt-0 transition-colors duration-300 print:bg-white print:m-0 print:p-0">
      <div className="relative z-10 flex flex-col pt-6 print:hidden">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-[1800px] w-full mx-auto print:p-0 print:m-0 print:w-full print:block">
        {/* Left Column - Form (Hidden during print) */}
        <section className="flex-1 glass-panel border border-white/20 dark:border-slate-800 p-8 overflow-y-auto h-[calc(100vh-140px)] print:hidden transition-colors duration-300 shadow-xl shadow-indigo-500/5 dark:shadow-none animate-fade-in-up">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Build Your Resume</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isSaving ? "Saving..." : "Saved"}
              </span>
              <button
                onClick={handlePrint}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
              >
                Download PDF
              </button>
            </div>
          </div>

          <ResumeForm data={resumeData} onChange={setResumeData} />
        </section>

        {/* Right Column - Preview */}
        <section className="flex-1 bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-4 md:p-6 overflow-auto h-[calc(100vh-140px)] flex justify-center print:bg-white print:p-0 print:h-auto print:overflow-visible transition-colors duration-300">
          <div className="w-[210mm] min-w-[210mm] min-h-[297mm] bg-white shadow-xl dark:shadow-none print:shadow-none print:m-0 mx-auto max-sm:[zoom:0.45] sm:max-md:[zoom:0.65] md:max-lg:[zoom:0.8] lg:max-xl:[zoom:0.85] xl:[zoom:1]">
            <ResumePreview data={resumeData} />
          </div>
        </section>
      </div>
    </main>
  );
}
