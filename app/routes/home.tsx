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
    { title: "ResumAi" },
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
  }, [auth.isAuthenticated])


  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parseResumes = resumes?.map((item) => {
        const resume = JSON.parse(item.value) as Resume;
        return resume;
      });
      setResumes(parseResumes);
      console.log('Resumes fetched:', parseResumes);

      setLoadingResumes(false);
    }
    fetchResumes();
  }, [])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover" >
    <Navbar />
    <section className="main-section" >
      <div className="page-heading py-16" >
        <h1>Track Your Applications & Resume Rating</h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2> No Resumes Found. Upload a resume to get started </h2>):(
        <h2>
          Smart Feedback for your Resume
        </h2>
        )}
      </div>

      {loadingResumes && (
        <div className="flex flex-col items-center justify-center" >
          <img src="/images/resume-scan-2.gif" alt="" className="w-[200px] " />
        </div>
      )}
    </section>

    {!loadingResumes && resumes.length > 0 && (
      <div className="resumes-section" >
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))
        }
      </div>

    )}

    {!loadingResumes && resumes?.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-10 gap-4">
    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
      Upload Resume
    </Link>
  </div>
)}

    <Footer />
  </main>

}
