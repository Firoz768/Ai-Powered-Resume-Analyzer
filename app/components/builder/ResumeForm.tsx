import React, { type ChangeEvent } from "react";
import { generateUUID } from "~/lib/utils";
import type { ResumeDraft, Experience, Education } from "~/types/resume";

interface Props {
  data: ResumeDraft;
  onChange: (data: ResumeDraft) => void;
}

export default function ResumeForm({ data, onChange }: Props) {
  const updatePersonal = (field: keyof ResumeDraft["personalInfo"], value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: generateUUID(), company: "", role: "", startDate: "", endDate: "", description: "" },
      ],
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((exp) => exp.id !== id) });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: generateUUID(), institution: "", degree: "", startDate: "", endDate: "" },
      ],
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((edu) => edu.id !== id) });
  };

  const handleSkillsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim());
    onChange({ ...data, skills: skillsArray });
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Personal Info */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" value={data.personalInfo.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} placeholder="John Doe" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" value={data.personalInfo.email} onChange={(e) => updatePersonal("email", e.target.value)} placeholder="john@example.com" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <input type="tel" value={data.personalInfo.phone} onChange={(e) => updatePersonal("phone", e.target.value)} placeholder="+1 234 567 890" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <input type="text" value={data.personalInfo.location} onChange={(e) => updatePersonal("location", e.target.value)} placeholder="New York, NY" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website / LinkedIn</label>
            <input type="text" value={data.personalInfo.website} onChange={(e) => updatePersonal("website", e.target.value)} placeholder="linkedin.com/in/johndoe" className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Summary</label>
            <textarea rows={4} value={data.personalInfo.summary} onChange={(e) => updatePersonal("summary", e.target.value)} placeholder="A brief summary of your professional background..." className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h2>
          <button onClick={addExperience} className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">+ Add Experience</button>
        </div>
        <div className="flex flex-col gap-6">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 relative">
              <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1">
                ✕
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Company</label>
                  <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="Google" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Role</label>
                  <input type="text" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} placeholder="Software Engineer" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Start Date</label>
                  <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} placeholder="Jan 2020" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">End Date</label>
                  <input type="text" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} placeholder="Present" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Description</label>
                  <textarea rows={3} value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} placeholder="Developed key features..." className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
              </div>
            </div>
          ))}
          {data.experience.length === 0 && <p className="text-sm text-gray-500 italic">No experience added yet.</p>}
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Education</h2>
          <button onClick={addEducation} className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">+ Add Education</button>
        </div>
        <div className="flex flex-col gap-6">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 relative">
              <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-1">
                ✕
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Institution</label>
                  <input type="text" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} placeholder="Stanford University" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Degree</label>
                  <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="B.S. Computer Science" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">Start Date</label>
                  <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} placeholder="Sep 2016" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400">End Date</label>
                  <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} placeholder="Jun 2020" className="p-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:text-white" />
                </div>
              </div>
            </div>
          ))}
          {data.education.length === 0 && <p className="text-sm text-gray-500 italic">No education added yet.</p>}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">List your skills (comma separated)</label>
          <textarea 
            rows={3} 
            value={data.skills.join(', ')} 
            onChange={handleSkillsChange} 
            placeholder="React, TypeScript, Node.js, Project Management" 
            className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
      </section>
    </div>
  );
}
