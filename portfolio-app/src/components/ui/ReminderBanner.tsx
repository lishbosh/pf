"use client";

import { useMemo, useState } from "react";
import { ReminderSetting } from "@/types/forms";
import { loadLocalJSON, persistLocalJSON } from "@/utils/storage";

const KEY = "portfolio-reminder-settings";

const defaultSetting: ReminderSetting = {
  remindEveryDays: 14,
};

export const ReminderBanner = () => {
  const [settings, setSettings] = useState<ReminderSetting>(() =>
    loadLocalJSON(KEY, defaultSetting)
  );
  const showReminder = useMemo(() => {
    const lastReminder = settings.lastReminder
      ? new Date(settings.lastReminder).getTime()
      : 0;
    const diff = Date.now() - lastReminder;
    return diff > settings.remindEveryDays * 24 * 60 * 60 * 1000;
  }, [settings]);

  const snooze = (days: number) => {
    const updated = {
      ...settings,
      lastReminder: new Date().toISOString(),
      remindEveryDays: days,
    };
    setSettings(updated);
    persistLocalJSON(KEY, updated);
  };

  if (!showReminder) return null;

  return (
    <div className="rounded-2xl border border-amber-300/30 bg-amber-500/15 p-4 text-amber-50">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Time to refresh your portfolio</p>
          <p className="text-xs text-amber-100">
            Keep things current. Hiring teams love fresh wins.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-white/20 px-3 py-1 text-xs"
            onClick={() => snooze(settings.remindEveryDays)}
          >
            Snooze {settings.remindEveryDays}d
          </button>
          <button
            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700"
            onClick={() => snooze(7)}
          >
            Remind Weekly
          </button>
        </div>
      </div>
    </div>
  );
};

