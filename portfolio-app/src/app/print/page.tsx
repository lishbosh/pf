"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PortfolioPreview } from "@/components/preview/PortfolioPreview";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { ProfessionalWhiteResumePreview } from "@/components/preview/ProfessionalWhiteResumePreview";
import { portfolioTemplates, resumeTemplates } from "@/data/templates";
import { PortfolioData, ResumeData } from "@/types/forms";

export default function PrintPage() {
  const params = useSearchParams();
  const [data, setData] = useState<{mode: string; payload: any} | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const encoded = params.get("data");
      const mode = params.get("mode") || "resume";
      
      if (!encoded) {
        setError("No data provided for printing");
        return;
      }

      // Decode the data
      const decoded = atob(encoded);
      const parsed = JSON.parse(decoded);
      
      setData({
        mode,
        payload: parsed
      });
      
      // Automatically trigger print after a short delay
      setTimeout(() => {
        window.print();
      }, 1000);
    } catch (err) {
      console.error("Print page error:", err);
      setError("Failed to load print data");
    }
  }, [params]);

  if (error) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-red-600 text-xl">Error</h1>
        <p className="text-gray-700">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-700">Loading print preview...</p>
      </div>
    );
  }

  const renderPreview = () => {
    if (data.mode === "portfolio") {
      const template = portfolioTemplates.find(t => t.id === data.payload.templateId) || portfolioTemplates[0];
      return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-white">
          <PortfolioPreview 
            data={data.payload.data} 
            template={template} 
          />
        </div>
      );
    } else {
      const template = resumeTemplates.find(t => t.id === data.payload.templateId) || resumeTemplates[0];
      if (template.id === "professional-white") {
        return (
          <div className="w-full max-w-4xl mx-auto p-0 bg-white">
            <ProfessionalWhiteResumePreview 
              data={data.payload.data} 
              template={template} 
            />
          </div>
        );
      }
      return (
        <div className="w-full max-w-4xl mx-auto p-0 bg-white">
          <ResumePreview 
            data={data.payload.data} 
            template={template} 
          />
        </div>
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-0 print:p-0">
      <div className="print-container w-full max-w-none mx-0 px-0">
        {renderPreview()}
      </div>
      
      {/* Print instructions for first load */}
      <div className="hidden print:block fixed bottom-4 right-4 text-xs text-gray-500">
        Press Ctrl+P (Windows) or Cmd+P (Mac) to print
      </div>
    </div>
  );
}