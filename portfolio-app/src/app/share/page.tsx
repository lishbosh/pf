"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { portfolioTemplates, resumeTemplates } from "@/data/templates";
import { PortfolioData, ResumeData } from "@/types/forms";
import { decodeSharePayload } from "@/utils/share";

type PortfolioSharePayload = {
  templateId: string;
  data: PortfolioData;
};

type ResumeSharePayload = {
  templateId: string;
  data: ResumeData;
};

const SharePage = () => {
  const params = useSearchParams();
  const encoded = params.get("data");
  const mode = (params.get("mode") as "portfolio" | "resume") ?? "portfolio";

  const { payload, error } = useMemo(() => {
    if (!encoded) {
      return { error: "Missing data payload" };
    }
    try {
      if (mode === "portfolio") {
        return { payload: decodeSharePayload<PortfolioSharePayload>(encoded) };
      }
      return { payload: decodeSharePayload<ResumeSharePayload>(encoded) };
    } catch {
      return { error: "Unable to decode shared data" };
    }
  }, [encoded, mode]);

  if (error || !payload) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-lg font-semibold">{error}</p>
          <p className="text-sm text-white/70">Ask the sender for a fresh link.</p>
        </div>
      </main>
    );
  }

  const renderSharedPreview = () => {
  if (mode === "portfolio") {
    const portfolioPayload = payload as {
      data: PortfolioSharePayload;
    };
    const template =
      portfolioTemplates.find(
        (t) => t.id === portfolioPayload.data.templateId
      ) ?? portfolioTemplates[0];
    return (
      <PortfolioPreview
        data={portfolioPayload.data.data}
        template={template}
      />
    );
  }
  const resumePayload = payload as { data: ResumeSharePayload };
  const template =
    resumeTemplates.find((t) => t.id === resumePayload.data.templateId) ??
    resumeTemplates[0];
  return (
    <ResumePreview data={resumePayload.data.data} template={template} />
  );
  };

  return (
    <main className="min-h-screen bg-slate-950 py-10 text-white">
      <div className="mx-auto max-w-4xl space-y-4 px-4">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">
            Shared {mode}
          </p>
          <h1 className="text-3xl font-semibold">Preview</h1>
          <p className="text-sm text-white/70">
            View-only mode. Edit inside the main app.
          </p>
        </header>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          {renderSharedPreview()}
        </div>
      </div>
    </main>
  );
};

export default SharePage;

