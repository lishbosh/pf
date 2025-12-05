"use client";

import { useEffect, useState } from "react";
import { PortfolioForm } from "@/components/forms/PortfolioForm";
import { ResumeForm } from "@/components/forms/ResumeForm";
import { TemplateSelector } from "@/components/templates/TemplateSelector";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { ProfessionalWhiteResumePreview } from "@/components/preview/ProfessionalWhiteResumePreview";
import { ReminderBanner } from "@/components/ui/ReminderBanner";
import { TutorialOverlay } from "@/components/ui/TutorialOverlay";
import { BackupPanel } from "@/components/settings/BackupPanel";
import { portfolioTemplates, resumeTemplates } from "@/data/templates";
import { samplePortfolio, sampleResume } from "@/data/defaults";
import {
  PortfolioData,
  ResumeData,
  TemplateMeta,
} from "@/types/forms";
import {
  loadLocalJSON,
  persistLocalJSON,
} from "@/utils/storage";
import { exportSectionAsPdf } from "@/utils/pdf";
import { buildShareUrl, encodeSharePayload } from "@/utils/share";
import { loadImageUrl, saveImageToIndexedDB } from "@/utils/imageStore";

const Splash = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(timeout);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.6em] text-white/60">
          Portfolio OS
        </p>
        <h1 className="text-4xl font-black">Launchpad</h1>
        <p className="text-sm text-white/60">Loading your creative hub…</p>
      </div>
    </div>
  );
};

const MODE_STORAGE_KEY = "portfolio-builder-mode";
const PORTFOLIO_KEY = "portfolio-builder-data";
const RESUME_KEY = "resume-builder-data";
const PORTFOLIO_TEMPLATE_KEY = "portfolio-template";
const RESUME_TEMPLATE_KEY = "resume-template";

export default function Home() {
  const [mode, setMode] = useState<"portfolio" | "resume">(() =>
    loadLocalJSON(MODE_STORAGE_KEY, "portfolio")
  );
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() =>
    loadLocalJSON(PORTFOLIO_KEY, samplePortfolio)
  );
  const [resumeData, setResumeData] = useState<ResumeData>(() =>
    loadLocalJSON(RESUME_KEY, sampleResume)
  );
  const [portfolioTemplateId, setPortfolioTemplateId] = useState(() =>
    loadLocalJSON(PORTFOLIO_TEMPLATE_KEY, portfolioTemplates[0].id)
  );
  const [resumeTemplateId, setResumeTemplateId] = useState(() =>
    loadLocalJSON(RESUME_TEMPLATE_KEY, resumeTemplates[0].id)
  );
  const [shareUrl, setShareUrl] = useState<string>();
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>();

  useEffect(() => {
    persistLocalJSON(MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    persistLocalJSON(PORTFOLIO_KEY, portfolioData);
  }, [portfolioData]);

  useEffect(() => {
    persistLocalJSON(RESUME_KEY, resumeData);
  }, [resumeData]);

  useEffect(() => {
    persistLocalJSON(PORTFOLIO_TEMPLATE_KEY, portfolioTemplateId);
  }, [portfolioTemplateId]);

  useEffect(() => {
    persistLocalJSON(RESUME_TEMPLATE_KEY, resumeTemplateId);
  }, [resumeTemplateId]);

  useEffect(() => {
    loadImageUrl(portfolioData.profilePhotoId).then((url) => {
      if (url) {
        setProfilePhotoPreview(url);
      }
    });
  }, [portfolioData.profilePhotoId]);

  const activeTemplate =
    mode === "portfolio"
      ? portfolioTemplates.find((t) => t.id === portfolioTemplateId) ??
        portfolioTemplates[0]
      : resumeTemplates.find((t) => t.id === resumeTemplateId) ??
        resumeTemplates[0];

  const handleShare = async () => {
    try {
      const payload =
        mode === "portfolio"
          ? {
              templateId: portfolioTemplateId,
              data: portfolioData,
            }
          : {
              templateId: resumeTemplateId,
              data: resumeData,
            };
      const encoded = encodeSharePayload(payload);
      const url = buildShareUrl("/share", encoded, { mode });
      setShareUrl(url);
    } catch (error) {
      console.error("Share failed:", error);
      alert("Failed to create share link. Please make sure all fields are filled correctly and try again.");
    }
  };

  const handleExport = async () => {
    try {
      const id =
        mode === "portfolio" ? "portfolio-preview" : "resume-preview";
      await exportSectionAsPdf(
        id,
        mode === "portfolio" ? "portfolio.pdf" : "resume.pdf"
      );
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF. Please make sure all fields are filled correctly and try again.");
    }
  };

  const handlePhotoUpload = async (file: File) => {
    const id = await saveImageToIndexedDB(file);
    setPortfolioData({ ...portfolioData, profilePhotoId: id });
  };

  const renderForm = () =>
    mode === "portfolio" ? (
      <PortfolioForm
        data={portfolioData}
        onChange={setPortfolioData}
        onPhotoUpload={handlePhotoUpload}
      />
    ) : (
      <ResumeForm data={resumeData} onChange={setResumeData} />
    );

  const renderPreview = (template: TemplateMeta) =>
    mode === "portfolio" ? (
      <PortfolioPreview
        data={portfolioData}
        template={template}
        profilePhotoUrl={profilePhotoPreview}
      />
    ) : template.id === "professional-white" ? (
      <ProfessionalWhiteResumePreview data={resumeData} template={template} />
    ) : (
      <ResumePreview data={resumeData} template={template} />
    );

  const templateSelector =
    mode === "portfolio" ? (
      <TemplateSelector
        title="Portfolio Templates"
        templates={portfolioTemplates}
        selectedId={portfolioTemplateId}
        onSelect={setPortfolioTemplateId}
      />
    ) : (
      <TemplateSelector
        title="Resume Templates"
        templates={resumeTemplates}
        selectedId={resumeTemplateId}
        onSelect={setResumeTemplateId}
      />
    );

  return (
    <>
      <Splash />
      <TutorialOverlay />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.6em] text-white/50">
                  Portfolio & Resume OS
                </p>
                <h1 className="text-3xl font-bold">Creator Command Center</h1>
                <p className="text-sm text-white/70">
                  Pick a template, fill once, export PDF or share a live link.
                </p>
              </div>
              <div className="rounded-full bg-white/10 p-1">
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    mode === "portfolio"
                      ? "bg-white text-slate-900"
                      : "text-white/70"
                  }`}
                  onClick={() => setMode("portfolio")}
                >
                  Portfolio
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    mode === "resume"
                      ? "bg-white text-slate-900"
                      : "text-white/70"
                  }`}
                  onClick={() => setMode("resume")}
                >
                  Resume
                </button>
              </div>
            </div>
          </header>

          <ReminderBanner />

          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
            <div className="space-y-4">
              {templateSelector}
              {renderForm()}
            </div>
            <div className="space-y-4">
              <section className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Live preview</p>
                    <p className="text-xs text-white/60">
                      Updates as you type. Export-ready.
          </p>
        </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900"
                      onClick={handleExport}
                    >
                      Export PDF
                    </button>
                    <button
                      className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white"
                      onClick={handleShare}
                    >
                      Share link
                    </button>
                  </div>
                </div>
                <div
                  id={
                    mode === "portfolio"
                      ? "portfolio-preview"
                      : "resume-preview"
                  }
                  className="overflow-hidden bg-white/5 p-0 w-full"
                >
                  {renderPreview(activeTemplate)}
                </div>
                {shareUrl && (
                  <div className="mt-4 rounded-2xl border border-dashed border-white/30 bg-white/5 p-3 text-xs">
                    <p className="text-white/70">Shareable link</p>
                    <p className="truncate text-white">
                      <a className="underline" href={shareUrl} target="_blank" rel="noopener noreferrer">
                        {shareUrl}
                      </a>
                    </p>
                  </div>
                )}
              </section>
              <BackupPanel
                portfolio={portfolioData}
                resume={resumeData}
                onRestore={(payload) => {
                  setPortfolioData(payload.portfolio);
                  setResumeData(payload.resume);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
