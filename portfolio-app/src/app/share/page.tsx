"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { ProfessionalWhiteResumePreview } from "@/components/preview/ProfessionalWhiteResumePreview";
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

const SharePageInner = () => {
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
    } catch (err) {
      console.error("Decode error:", err);
      return { error: "Unable to decode shared data. The link may be invalid or corrupted." };
    }
  }, [encoded, mode]);

  if (error || !payload) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-slate-900 p-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm max-w-md w-full">
          <p className="text-lg font-semibold text-red-600">Error</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
          <p className="text-xs text-gray-500 mt-4">Ask the sender for a fresh link.</p>
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
        <div className="w-full max-w-none">
          <PortfolioPreview
            data={portfolioPayload.data.data}
            template={template}
          />
        </div>
      );
    }
    const resumePayload = payload as { data: ResumeSharePayload };
    const template =
      resumeTemplates.find((t) => t.id === resumePayload.data.templateId) ??
      resumeTemplates[0];
      
    // Use professional white template if selected
    if (template.id === "professional-white") {
      return (
        <div className="w-full max-w-none">
          <ProfessionalWhiteResumePreview 
            data={resumePayload.data.data} 
            template={template} 
          />
        </div>
      );
    }
    
    return (
      <div className="w-full max-w-none">
        <ResumePreview data={resumePayload.data.data} template={template} />
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-white py-0 text-slate-900 w-full max-w-none overflow-x-hidden">
      <div className="w-full max-w-none px-0 mx-0">
        {renderSharedPreview()}
      </div>
    </main>
  );
};

const SharePage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white text-slate-900">
          <p className="text-sm text-gray-600">Loading shared preview…</p>
        </main>
      }
    >
      <SharePageInner />
    </Suspense>
  );
};

export default SharePage;