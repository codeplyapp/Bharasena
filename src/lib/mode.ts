import { EventMode } from "./types";

/**
 * Cutoff tanggal pelaksanaan acara (Asia/Jakarta)
 * Acara berlangsung: 11, 12, 13 Desember 2026
 */
export const EVENT_START_DATE = "2026-12-11";
export const EVENT_DAY_2_DATE = "2026-12-12";
export const EVENT_DAY_3_DATE = "2026-12-13";

/**
 * Mendapatkan tanggal saat ini dalam format YYYY-MM-DD zona waktu Asia/Jakarta
 */
export function getJakartaDateString(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}

/**
 * Menghitung mode sistem secara server-side:
 * - 'event' jika tanggal Jakarta >= 2026-12-11
 * - 'pre' jika sebelumnya
 * - Jika ada override manual ('pre' | 'event'), gunakan override
 */
export function resolveServerMode(manualOverride?: string | null): EventMode {
  if (manualOverride === "pre" || manualOverride === "event") {
    return manualOverride;
  }

  const todayJakarta = getJakartaDateString();
  if (todayJakarta >= EVENT_START_DATE) {
    return "event";
  }

  return "pre";
}

/**
 * Menentukan hari default (1, 2, atau 3) secara server-side berdasarkan tanggal Jakarta saat ini
 */
export function resolveDefaultDay(currentMode: EventMode): number {
  if (currentMode === "pre") {
    return 1;
  }

  const todayJakarta = getJakartaDateString();
  if (todayJakarta === EVENT_DAY_2_DATE) {
    return 2;
  }
  if (todayJakarta >= EVENT_DAY_3_DATE) {
    return 3;
  }
  return 1;
}
