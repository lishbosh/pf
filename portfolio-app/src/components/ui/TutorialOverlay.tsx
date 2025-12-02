"use client";

import { useState } from "react";

const steps = [
  {
    title: "Pick a template",
    copy: "Browse 10 curated portfolio and resume looks.",
  },
  {
    title: "Fill once, sync everywhere",
    copy: "We auto-save locally and allow offline editing.",
  },
  {
    title: "Preview & export",
    copy: "Live preview updates as you type. Export PDF or share link.",
  },
];

export const TutorialOverlay = () => {
  const [open, setOpen] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  if (!open) return null;

  const step = steps[stepIndex];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="max-w-md rounded-3xl bg-slate-900 p-6 text-white shadow-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Guide</p>
        <h3 className="text-2xl font-semibold">{step.title}</h3>
        <p className="mt-2 text-sm text-white/70">{step.copy}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <span
                key={index}
                className={`h-1 rounded-full ${index === stepIndex ? "w-8 bg-white" : "w-4 bg-white/30"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-full border border-white/30 px-3 py-1 text-xs uppercase tracking-wide"
              onClick={() => setOpen(false)}
            >
              Skip
            </button>
            <button
              className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-slate-900"
              onClick={() =>
                stepIndex === steps.length - 1
                  ? setOpen(false)
                  : setStepIndex(stepIndex + 1)
              }
            >
              {stepIndex === steps.length - 1 ? "Got it" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

