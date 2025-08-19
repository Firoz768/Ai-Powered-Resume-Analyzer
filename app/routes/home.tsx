import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ResumAi" },
    { name: "description", content: "Smart Feedback for your Resume" },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();
    useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])
  return <main className="bg-[url('/images/bg-main.svg')] bg-cover" >
    <Navbar />
    <section className="main-section" >
      <div className="page-heading py-16" >
        <h1>Track Your Applications & Resume Rating</h1>
        <h2>
          Smart Feedback for your Resume
        </h2>
      </div>
    </section>

    {resumes.length > 0 && (
      <div className="resumes-section" >
        {resumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))
        }
      </div>

    )}

        <Footer/>
  </main>
  
}
