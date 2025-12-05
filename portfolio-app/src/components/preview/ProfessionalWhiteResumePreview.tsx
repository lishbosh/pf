"use client";

import { ResumeData, TemplateMeta } from "@/types/forms";

type ProfessionalWhiteResumePreviewProps = {
  data: ResumeData;
  template: TemplateMeta;
};

export const ProfessionalWhiteResumePreview = ({ data, template }: ProfessionalWhiteResumePreviewProps) => {
  return (
    <div 
      className="w-full bg-white p-8 text-slate-900 print:p-0 print:m-0"
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Header */}
      <header className="border-b border-gray-300 pb-4 print:border-b print:border-gray-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 print:text-3xl">{data.personal.fullName}</h1>
          <p className="text-lg font-semibold text-blue-700 mt-1 print:text-lg">{data.personal.headline}</p>
          <div className="mt-2 flex justify-center flex-wrap gap-3 text-sm text-slate-600 print:text-sm">
            <span>{data.personal.email}</span>
            <span>|</span>
            <span>{data.personal.phone}</span>
            <span>|</span>
            <span>{data.personal.location}</span>
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mt-6 print:mt-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-gray-300 pb-1 print:text-lg print:border-b print:border-gray-300">PROFESSIONAL SUMMARY</h2>
          <p className="mt-2 text-sm text-slate-700 print:text-sm">{data.summary}</p>
        </section>
      )}

      <div className="mt-6 grid grid-cols-3 gap-6 print:mt-6 print:gap-6">
        {/* Left Column - Skills, Education, Certifications */}
        <div className="col-span-1 space-y-6 print:space-y-6">
          {/* Skills */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-gray-300 pb-1 print:text-lg print:border-b print:border-gray-300">SKILLS</h2>
            <div className="mt-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 mr-2 mb-2 rounded print:text-xs print:px-2 print:py-1">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-gray-300 pb-1 print:text-lg print:border-b print:border-gray-300">EDUCATION</h2>
            <div className="mt-2 space-y-3 print:space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-semibold text-slate-900 print:text-sm">{edu.degree}</p>
                  <p className="text-xs text-slate-600 print:text-xs">{edu.school}</p>
                  <p className="text-xs text-slate-600 print:text-xs">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.details && (
                    <p className="text-xs text-slate-700 mt-1 print:text-xs">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 border-b border-gray-300 pb-1 print:text-lg print:border-b print:border-gray-300">CERTIFICATIONS</h2>
              <ul className="mt-2 space-y-1 print:space-y-1">
                {data.certifications.map((cert) => (
                  <li key={cert.id} className="text-sm text-slate-700 print:text-sm">
                    <span className="font-semibold">{cert.name}</span> - {cert.issuer} ({cert.year})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 border-b border-gray-300 pb-1 print:text-lg print:border-b print:border-gray-300">LANGUAGES</h2>
              <p className="mt-2 text-sm text-slate-700 print:text-sm">{data.languages.join(", ")}</p>
            </section>
          )}
        </div>

        {/* Right Column - Experience */}
        <div className="col-span-2">
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-gray-300 pb-1 print:text-lg print:border-b print:border-gray-300">PROFESSIONAL EXPERIENCE</h2>
            <div className="mt-2 space-y-4 print:space-y-4">
              {data.experiences.map((experience) => (
                <div key={experience.id}>
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-slate-900 print:text-sm">{experience.role}</p>
                    <p className="text-sm text-slate-600 print:text-sm">
                      {experience.startDate} - {experience.endDate}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-blue-700 print:text-sm">{experience.company}</p>
                  <ul className="mt-1 space-y-1">
                    {experience.description.split('\n').map((line, index) => (
                      <li key={index} className="text-sm text-slate-700 flex print:text-sm">
                        <span className="mr-2">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};