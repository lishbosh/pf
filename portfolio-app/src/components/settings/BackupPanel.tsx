"use client";

import { PortfolioData, ResumeData } from "@/types/forms";
import { downloadBackup, restoreBackupFromFile } from "@/utils/storage";

type BackupPanelProps = {
  portfolio: PortfolioData;
  resume: ResumeData;
  onRestore: (payload: { portfolio: PortfolioData; resume: ResumeData }) => void;
};

export const BackupPanel = ({
  portfolio,
  resume,
  onRestore,
}: BackupPanelProps) => {
  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const parsed = await restoreBackupFromFile<{
      portfolio: PortfolioData;
      resume: ResumeData;
    }>(file);
    if (parsed) {
      onRestore(parsed);
    }
  };

  return (
    <section className="rounded-3xl border border-white/15 bg-white/5 p-4 text-white">
      <h3 className="text-lg font-semibold">Settings & Local Backup</h3>
      <p className="text-sm text-white/70">
        Works offline. Export a JSON backup before large edits.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          onClick={() =>
            downloadBackup({ portfolio, resume }, "portfolio-resume-backup.json")
          }
        >
          Download Backup
        </button>
        <label className="flex cursor-pointer items-center justify-center rounded-full border border-dashed border-white/30 px-4 py-2 text-sm text-white/80">
          Restore Backup
          <input type="file" className="hidden" accept="application/json" onChange={handleRestore} />
        </label>
      </div>
    </section>
  );
};

