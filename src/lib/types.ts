/**
 * View-Model Contracts — BHARASENA Website
 * Sumber kebenaran tunggal tipe data antara Frontend & Backend.
 */

export type EventMode = "pre" | "event";

export interface AboutInfo {
  tujuan: string;
  harapan: string;
  artiNama: string;
  filosofiLogo: string;
  logoUrl?: string;
}

export interface GuestStar {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  order: number;
}

export interface RundownItem {
  id: number;
  day: number; // 1 | 2 | 3
  time: string; // e.g., "08.00 - 10.00"
  title: string;
  description: string;
  order: number;
}

export type OfficialGuestCategory =
  | "kepala"
  | "wakil"
  | "pembina"
  | "lainnya";

export interface OfficialGuest {
  id: number;
  name: string;
  role: string;
  category: OfficialGuestCategory | string;
}

export interface CommitteeMember {
  id: number;
  name: string;
  role: string;
  order: number;
}

export interface CommitteeSection {
  id: number;
  title: string;
  order: number;
  members: CommitteeMember[];
}

export interface Proposal {
  id: number;
  type: "kegiatan" | "sponsorship" | "umkm";
  title: string;
  description: string;
  pdfUrl: string;
}

export interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  benefits: string[];
  highlight?: boolean;
  order?: number;
}

export interface ContactPerson {
  id: number;
  type: "humas" | "sponsorship" | "umkm";
  label: string;
  name: string;
  phoneWa: string;
}

export interface DocumentationPhoto {
  id: number;
  day: number; // 1 | 2 | 3
  imageUrl: string;
  caption: string;
  order: number;
  createdAt?: string;
}

export interface HeroProps {
  eventName: string;
  dateRange: string;
  venue: string;
  tagline: string;
  mode?: EventMode;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string;
  updatedAt?: string;
}
