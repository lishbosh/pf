"use client";

import { ResumeData, TemplateMeta } from "@/types/forms";

type ResumePreviewProps = {
  data: ResumeData;
  template: TemplateMeta;
};

export const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  return (
    <div
      className="rounded-3xl border border-black/10 bg-white p-6 text-slate-900 shadow-2xl"
      style={{ background: template.background }}
    >
      <header className="border-b border-black/10 pb-4">
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: template.accent }}>
          {template.name}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{data.personal.fullName}</h1>
        <p className="text-lg font-semibold" style={{ color: template.accent }}>
          {data.personal.headline}
        </p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
          <span>{data.personal.email}</span>
          <span>{data.personal.phone}</span>
          <span>{data.personal.location}</span>
        </div>
        <p className="mt-3 text-sm text-slate-700">{data.summary}</p>
      </header>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr,0.7fr]">
        <section className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            Experience
          </h4>
          {data.experiences.map((experience) => (
            <article key={experience.id} className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <div className="flex items-baseline justify-between text-xs text-slate-500">
                <span>{experience.company}</span>
                <span>
                  {experience.startDate} – {experience.endDate}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-900">{experience.role}</p>
              <p className="text-sm text-slate-700">{experience.description}</p>
            </article>
          ))}

          <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-700">
            Education
          </h4>
          {data.education.map((edu) => (
            <article key={edu.id} className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{edu.degree}</p>
              <p className="text-xs text-slate-500">
                {edu.school} · {edu.startDate} – {edu.endDate}
              </p>
              <p className="text-sm text-slate-700">{edu.details}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-2xl bg-white/70 p-4 shadow-inner">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Skills
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-300/80 px-3 py-1 text-xs font-semibold text-slate-700"
                  style={{ borderColor: template.accent, color: template.accent }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Certifications
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {data.certifications.map((cert) => (
                <li key={cert.id}>
                  {cert.name} · {cert.issuer} · {cert.year}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Languages
            </h4>
            <p className="text-sm text-slate-700">{data.languages.join(", ")}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Hobbies
            </h4>
            <p className="text-sm text-slate-700">{data.hobbies.join(", ")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

