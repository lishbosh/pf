"use client";

import { TemplateMeta } from "@/types/forms";

type TemplateSelectorProps = {
  title: string;
  templates: TemplateMeta[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export const TemplateSelector = ({
  title,
  templates,
  selectedId,
  onSelect,
}: TemplateSelectorProps) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs uppercase text-white/60">
          {templates.length} options
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 ${
              selectedId === template.id
                ? "border-2 border-white bg-white/10"
                : "border-white/20 bg-white/5"
            }`}
            style={{
              background:
                selectedId === template.id
                  ? template.background
                  : "rgba(255,255,255,0.04)",
            }}
          >
            <p className="text-sm font-semibold text-white">{template.name}</p>
            <p className="text-xs text-white/70">{template.description}</p>
            <span
              className="mt-2 inline-flex rounded-full px-2 text-[10px] uppercase tracking-wide text-white"
              style={{ backgroundColor: template.accent }}
            >
              {template.layout}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

