import React from "react";
import type { ResumeDraft } from "~/types/resume";

interface Props {
  data: ResumeDraft;
}

export default function ResumePreview({ data }: Props) {
  const { personalInfo, experience, education, skills } = data;

  // Filter out completely empty skills
  const validSkills = skills.filter(s => s.trim() !== '');

  return (
    <div className="p-8 md:p-12 text-gray-900 font-sans text-[11pt] w-full h-full bg-white text-black print:text-black print:p-0 leading-tight">
      {/* Header */}
      <header className="border-b-[1.5px] border-gray-800 pb-3 mb-4 text-center">
        <div role="heading" aria-level={1} className="text-2xl font-bold uppercase tracking-widest mb-2 text-black print:text-black">{personalInfo.fullName || "Your Name"}</div>
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-700">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <p className="text-sm leading-relaxed text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <div role="heading" aria-level={2} className="text-[13pt] font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1">Experience</div>
          <div className="flex flex-col gap-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-[2px]">
                  <div role="heading" aria-level={3} className="font-bold text-[11pt] text-gray-900">{exp.role || "Role"}</div>
                  <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                    {exp.startDate} {exp.startDate && exp.endDate && "-"} {exp.endDate}
                  </span>
                </div>
                <div className="font-medium text-gray-700 italic text-[10.5pt] mb-1.5">{exp.company || "Company"}</div>
                {exp.description && (
                  <p className="text-[10pt] text-gray-800 whitespace-pre-wrap leading-relaxed pl-3 border-l-2 border-gray-200">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <div role="heading" aria-level={2} className="text-[13pt] font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1">Education</div>
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-[2px]">
                  <div role="heading" aria-level={3} className="font-bold text-[11pt] text-gray-900">{edu.degree || "Degree"}</div>
                  <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                    {edu.startDate} {edu.startDate && edu.endDate && "-"} {edu.endDate}
                  </span>
                </div>
                <div className="font-medium text-gray-700 text-[10.5pt]">{edu.institution || "Institution"}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {validSkills.length > 0 && (
        <section>
          <div role="heading" aria-level={2} className="text-[13pt] font-bold uppercase tracking-wider border-b border-gray-300 mb-3 pb-1">Skills</div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {validSkills.map((skill, idx) => (
              <span key={idx} className="text-[10pt] font-medium text-gray-800">
                {skill}{idx < validSkills.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
