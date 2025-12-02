"use client";

import { nanoid } from "nanoid";
import {
  ResumeData,
  ExperienceItem,
  EducationItem,
  CertificationItem,
} from "@/types/forms";

type ResumeFormProps = {
  data: ResumeData;
  onChange: (value: ResumeData) => void;
};

const inputClass =
  "w-full rounded-xl border border-slate-200/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none";
const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-white/60";

export const ResumeForm = ({ data, onChange }: ResumeFormProps) => {
  const updateField = <K extends keyof ResumeData>(
    key: K,
    value: ResumeData[K]
  ) => {
    onChange({ ...data, [key]: value });
  };

  const updatePersonal = <K extends keyof ResumeData["personal"]>(
    key: K,
    value: ResumeData["personal"][K]
  ) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [key]: value,
      },
    });
  };

  const updateList = <T extends { id: string }>(
    key: keyof ResumeData,
    items: T[]
  ) => {
    onChange({ ...data, [key]: items as ResumeData[keyof ResumeData] });
  };

  const renderSimpleList = (
    label: string,
    values: string[],
    onValuesChange: (vals: string[]) => void
  ) => (
    <div className="rounded-2xl border border-white/10 p-4">
      <p className="mb-2 text-sm font-semibold text-white">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <input
            key={index}
            className={`${inputClass} max-w-[200px]`}
            value={value}
            onChange={(e) =>
              onValuesChange(
                values.map((item, idx) => (idx === index ? e.target.value : item))
              )
            }
          />
        ))}
        <button
          type="button"
          className="rounded-xl border border-dashed border-white/30 px-3 py-2 text-xs text-white/70"
          onClick={() => onValuesChange([...values, "New entry"])}
        >
          + add
        </button>
      </div>
    </div>
  );

  const renderRichList = <T extends { id: string }>(
    listKey: keyof ResumeData,
    title: string,
    items: T[],
    fields: Array<{ key: keyof T; label: string; placeholder?: string }>
  ) => (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-semibold text-white">{title}</p>
        <button
          type="button"
          className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
          onClick={() =>
            updateList(
              listKey,
              [
                ...items,
                {
                  id: nanoid(),
                  ...(Object.fromEntries(
                    fields.map((field) => [field.key, ""])
                  ) as T),
                },
              ]
            )
          }
        >
          + Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-white/10 p-3">
            {fields.map((field) => (
              <label key={String(field.key)} className="block pb-2">
                <span className={labelClass}>{field.label}</span>
                <input
                  className={inputClass}
                  value={(item as Record<string, string>)[field.key as string] ?? ""}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    updateList(listKey, items.map((current) =>
                      current.id === item.id
                        ? { ...current, [field.key]: e.target.value }
                        : current
                    ))
                  }
                />
              </label>
            ))}
            <button
              type="button"
              className="text-xs text-red-300"
              onClick={() =>
                updateList(
                  listKey,
                  items.filter((current) => current.id !== item.id)
                )
              }
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
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Full Name</span>
          <input
            className={inputClass}
            value={data.personal.fullName}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Headline</span>
          <input
            className={inputClass}
            value={data.personal.headline}
            onChange={(e) => updatePersonal("headline", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className={labelClass}>Email</span>
          <input
            className={inputClass}
            value={data.personal.email}
            onChange={(e) => updatePersonal("email", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Phone</span>
          <input
            className={inputClass}
            value={data.personal.phone}
            onChange={(e) => updatePersonal("phone", e.target.value)}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Location</span>
          <input
            className={inputClass}
            value={data.personal.location}
            onChange={(e) => updatePersonal("location", e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Professional Summary</span>
        <textarea
          className={`${inputClass} min-h-[96px]`}
          value={data.summary}
          onChange={(e) => updateField("summary", e.target.value)}
        />
      </label>

      {renderRichList<ExperienceItem>(
        "experiences",
        "Experiences",
        data.experiences,
        [
          { key: "company", label: "Company" },
          { key: "role", label: "Role" },
          { key: "startDate", label: "Start" },
          { key: "endDate", label: "End" },
          { key: "description", label: "Achievements" },
        ]
      )}

      {renderRichList<EducationItem>(
        "education",
        "Education",
        data.education,
        [
          { key: "school", label: "School" },
          { key: "degree", label: "Degree" },
          { key: "startDate", label: "Start" },
          { key: "endDate", label: "End" },
          { key: "details", label: "Details" },
        ]
      )}

      {renderRichList<CertificationItem>(
        "certifications",
        "Certifications",
        data.certifications,
        [
          { key: "name", label: "Name" },
          { key: "issuer", label: "Issuer" },
          { key: "year", label: "Year" },
        ]
      )}

      {renderSimpleList("Skills", data.skills, (values) =>
        updateField("skills", values)
      )}

      {renderSimpleList("Languages", data.languages, (values) =>
        updateField("languages", values)
      )}

      {renderSimpleList("Hobbies", data.hobbies, (values) =>
        updateField("hobbies", values)
      )}
    </form>
  );
};

