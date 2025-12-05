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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const encoded = params.get("data");
      const mode = params.get("mode") || "resume";
      
      if (!encoded) {
        setError("No data provided for printing");
        setLoading(false);
        return;
      }

      // Decode the data
      const decoded = atob(decodeURIComponent(encoded));
      const parsed = JSON.parse(decoded);
      
      setData({
        mode,
        payload: parsed
      });
      
      setLoading(false);
      
      // Automatically trigger print after a short delay
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.print();
        }
      }, 1000);
    } catch (err) {
      console.error("Print page error:", err);
      setError("Failed to load print data");
      setLoading(false);
    }
  }, [params]);

  if (loading) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p style={{ color: '#374151' }}>Loading print preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h1 style={{ color: '#dc2626', fontSize: '1.25rem' }}>Error</h1>
        <p style={{ color: '#374151' }}>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p style={{ color: '#374151' }}>No data available for printing</p>
      </div>
    );
  }

  const renderPreview = () => {
    if (data.mode === "portfolio") {
      const template = portfolioTemplates.find(t => t.id === data.payload.templateId) || portfolioTemplates[0];
      return (
        <div style={{ width: '100%', maxWidth: '64rem', margin: '0 auto', padding: '1rem', backgroundColor: 'white' }}>
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
          <div style={{ width: '100%', maxWidth: '64rem', margin: '0 auto', padding: '0', backgroundColor: 'white' }}>
            <ProfessionalWhiteResumePreview 
              data={data.payload.data} 
              template={template} 
            />
          </div>
        );
      }
      return (
        <div style={{ width: '100%', maxWidth: '64rem', margin: '0 auto', padding: '0', backgroundColor: 'white' }}>
          <ResumePreview 
            data={data.payload.data} 
            template={template} 
          />
        </div>
      );
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'white', padding: '0', margin: '0' }}>
      <div style={{ width: '100%', maxWidth: 'none', margin: '0', padding: '0' }}>
        {renderPreview()}
      </div>
      
      {/* Print instructions for first load */}
      <div style={{ display: 'none', position: 'fixed', bottom: '1rem', right: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
        Press Ctrl+P (Windows) or Cmd+P (Mac) to print
      </div>
    </div>
  );
}

// Add dynamic export to prevent prerendering
export const dynamic = "force-dynamic";