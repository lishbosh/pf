"use client";

import { nanoid } from "nanoid";
import {
  PortfolioData,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SocialLink,
  CertificationItem,
} from "@/types/forms";

type PortfolioFormProps = {
  data: PortfolioData;
  onChange: (value: PortfolioData) => void;
  onPhotoUpload: (file: File) => Promise<void>;
};

const sectionLabel = "text-xs font-semibold uppercase tracking-wide text-white/60";
const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none";

export const PortfolioForm = ({
  data,
  onChange,
  onPhotoUpload,
}: PortfolioFormProps) => {
  const updateField = <K extends keyof PortfolioData>(
    key: K,
    value: PortfolioData[K]
  ) => {
    onChange({ ...data, [key]: value });
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await onPhotoUpload(file);
    }
  };

  const renderListSection = <T extends { id: string }>(
    title: string,
    items: T[],
    fields: Array<{ key: keyof T; label: string; placeholder?: string }>,
    onItemsChange: (updated: T[]) => void
  ) => (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-white">{title}</p>
        <button
          type="button"
          className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
          onClick={() => {
            const base = Object.fromEntries(
              fields.map((field) => [field.key, ""])
            ) as T;
            const nextItem = { ...base, id: nanoid() } as T;
            onItemsChange([...items, nextItem]);
          }}
        >
          + Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 p-3">
            {fields.map((field) => (
              <label key={String(field.key)} className="block pb-2">
                <span className={sectionLabel}>{field.label}</span>
                <input
                  className={inputClass}
                  value={(item as Record<string, string>)[field.key as string] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    onItemsChange(
                      items.map((current) =>
                        current.id === item.id
                          ? { ...current, [field.key]: e.target.value }
                          : current
                      )
                    )
                  }
                />
              </label>
            ))}
            <button
              type="button"
              className="text-xs text-red-300"
              onClick={() => onItemsChange(items.filter((current) => current.id !== item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <form className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={sectionLabel}>Name</span>
          <input
            className={inputClass}
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your full name"
          />
        </label>
        <label className="block">
          <span className={sectionLabel}>Title</span>
          <input
            className={inputClass}
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="What do you do?"
          />
        </label>
      </div>
      <label className="block">
        <span className={sectionLabel}>About</span>
        <textarea
          className={`${inputClass} min-h-[96px]`}
          value={data.about}
          onChange={(e) => updateField("about", e.target.value)}
          placeholder="Two-sentence story"
        />
      </label>

      <label className="block">
        <span className={sectionLabel}>Profile Photo</span>
        <input
          type="file"
          accept="image/*"
          className="text-sm text-white"
          onChange={handleFile}
        />
      </label>

      {renderListSection<ExperienceItem>(
        "Experience",
        data.experiences,
        [
          { key: "company", label: "Company" },
          { key: "role", label: "Role" },
          { key: "startDate", label: "Start" },
          { key: "endDate", label: "End" },
          { key: "description", label: "Highlights" },
        ],
        (items) => updateField("experiences", items)
      )}

      {renderListSection<EducationItem>(
        "Education",
        data.education,
        [
          { key: "school", label: "School" },
          { key: "degree", label: "Degree" },
          { key: "startDate", label: "Start" },
          { key: "endDate", label: "End" },
          { key: "details", label: "Details" },
        ],
        (items) => updateField("education", items)
      )}

      <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
        <p className="mb-2 font-semibold text-white">Skills</p>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <input
              key={index}
              className={`${inputClass} max-w-[160px]`}
              value={skill}
              onChange={(e) =>
                updateField(
                  "skills",
                  data.skills.map((item, idx) =>
                    idx === index ? e.target.value : item
                  )
                )
              }
            />
          ))}
          <button
            type="button"
            className="rounded-xl border border-dashed border-white/30 px-3 py-2 text-xs text-white/70"
            onClick={() => updateField("skills", [...data.skills, "New skill"])}
          >
            + skill
          </button>
        </div>
      </div>

      {renderListSection<ProjectItem>(
        "Projects",
        data.projects,
        [
          { key: "name", label: "Project" },
          { key: "summary", label: "Summary" },
          { key: "link", label: "Link" },
        ],
        (items) => updateField("projects", items)
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className={sectionLabel}>Email</span>
          <input
            className={inputClass}
            value={data.contactEmail}
            onChange={(e) => updateField("contactEmail", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={sectionLabel}>Phone</span>
          <input
            className={inputClass}
            value={data.contactPhone}
            onChange={(e) => updateField("contactPhone", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={sectionLabel}>Location</span>
          <input
            className={inputClass}
            value={data.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </label>
      </div>

      {renderListSection<SocialLink>(
        "Social Links",
        data.socials,
        [
          { key: "label", label: "Label" },
          { key: "url", label: "URL" },
        ],
        (items) => updateField("socials", items)
      )}

      {renderListSection<CertificationItem>(
        "Certifications",
        data.certifications,
        [
          { key: "name", label: "Name" },
          { key: "issuer", label: "Issuer" },
          { key: "year", label: "Year" },
        ],
        (items) => updateField("certifications", items)
      )}
    </form>
  );
};

