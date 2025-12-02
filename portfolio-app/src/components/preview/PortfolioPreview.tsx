"use client";

import Image from "next/image";
import { PortfolioData, TemplateMeta } from "@/types/forms";

type PortfolioPreviewProps = {
  data: PortfolioData;
  template: TemplateMeta;
  profilePhotoUrl?: string;
};

const sectionClass = "rounded-2xl bg-white/10 p-4 text-white";

const ExperienceBlock = ({ data }: { data: PortfolioData }) => (
  <div className={sectionClass}>
    <h4 className="text-lg font-semibold">Experience</h4>
    <div className="mt-3 space-y-3">
      {data.experiences.map((experience) => (
        <div key={experience.id}>
          <p className="text-sm font-semibold">{experience.role}</p>
          <p className="text-xs uppercase tracking-wide text-white/70">
            {experience.company} · {experience.startDate} – {experience.endDate}
          </p>
          <p className="text-sm text-white/80">{experience.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const EducationBlock = ({ data }: { data: PortfolioData }) => (
  <div className={sectionClass}>
    <h4 className="text-lg font-semibold">Education</h4>
    <div className="mt-3 space-y-3">
      {data.education.map((item) => (
        <div key={item.id}>
          <p className="text-sm font-semibold">{item.degree}</p>
          <p className="text-xs uppercase tracking-wide text-white/70">
            {item.school} · {item.startDate} – {item.endDate}
          </p>
          <p className="text-sm text-white/80">{item.details}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProjectsBlock = ({ data }: { data: PortfolioData }) => (
  <div className={sectionClass}>
    <h4 className="text-lg font-semibold">Projects</h4>
    <div className="mt-3 space-y-3">
      {data.projects.map((project) => (
        <div key={project.id}>
          <p className="text-sm font-semibold">{project.name}</p>
          <p className="text-sm text-white/80">{project.summary}</p>
          <a
            href={project.link}
            className="text-xs text-white underline"
            target="_blank"
            rel="noreferrer"
          >
            {project.link}
          </a>
        </div>
      ))}
    </div>
  </div>
);

const SkillsBlock = ({ data }: { data: PortfolioData }) => (
  <div className={sectionClass}>
    <h4 className="text-lg font-semibold">Skills</h4>
    <div className="mt-3 flex flex-wrap gap-2">
      {data.skills.map((skill) => (
        <span
          key={skill}
          className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/90"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ContactBlock = ({ data }: { data: PortfolioData }) => (
  <div className={sectionClass}>
    <h4 className="text-lg font-semibold">Contact</h4>
    <p className="text-sm text-white/80">{data.contactEmail}</p>
    <p className="text-sm text-white/80">{data.contactPhone}</p>
    <p className="text-sm text-white/80">{data.location}</p>
    <div className="mt-3 space-y-1">
      {data.socials.map((social) => (
        <a
          key={social.id}
          href={social.url}
          className="block text-xs text-white underline"
          target="_blank"
          rel="noreferrer"
        >
          {social.label}
        </a>
      ))}
    </div>
  </div>
);

export const PortfolioPreview = ({
  data,
  template,
  profilePhotoUrl,
}: PortfolioPreviewProps) => {
  const layoutClasses: Record<TemplateMeta["layout"], string> = {
    hero: "grid gap-4 lg:grid-cols-[2fr,1fr]",
    split: "grid gap-4 lg:grid-cols-2",
    stacked: "space-y-4",
    columns: "grid gap-4 md:grid-cols-2",
    minimal: "space-y-4",
  };

  return (
    <div
      className="rounded-3xl p-6 text-white shadow-2xl"
      style={{ background: template.background }}
    >
      <header className="flex flex-col items-start gap-4 border-b border-white/20 pb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            {template.name}
          </p>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p
            className="text-lg font-medium"
            style={{ color: template.accent }}
          >
            {data.title}
          </p>
          <p className="mt-2 max-w-2xl text-sm text-white/80">{data.about}</p>
        </div>
        {profilePhotoUrl && (
          <Image
            src={profilePhotoUrl}
            alt={`${data.name} headshot`}
            width={128}
            height={128}
            className="h-32 w-32 rounded-2xl border-4 border-white/40 object-cover"
            unoptimized
          />
        )}
      </header>

      <div className={`mt-6 ${layoutClasses[template.layout]}`}>
        <ExperienceBlock data={data} />
        <ProjectsBlock data={data} />
        <SkillsBlock data={data} />
        <EducationBlock data={data} />
        <ContactBlock data={data} />
      </div>
    </div>
  );
};

