import { EventMode } from "./types";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  showIn: "both" | "pre" | "event";
}

export const SECTION_IDS = {
  HERO: "hero",
  ABOUT: "tentang",
  GUEST_STAR: "guest-star",
  RUNDOWN: "rundown",
  GUESTS: "undangan",
  COMMITTEE: "panitia",
  PROPOSAL: "proposal",
  GALLERY: "galeri",
  CONTACT: "kontak",
} as const;

export const ALL_NAV_ITEMS: NavItem[] = [
  { id: SECTION_IDS.HERO, label: "Beranda", href: `#${SECTION_IDS.HERO}`, showIn: "both" },
  { id: SECTION_IDS.ABOUT, label: "Tentang", href: `#${SECTION_IDS.ABOUT}`, showIn: "both" },
  { id: SECTION_IDS.GUEST_STAR, label: "Guest Star", href: `#${SECTION_IDS.GUEST_STAR}`, showIn: "both" },
  { id: SECTION_IDS.RUNDOWN, label: "Rundown", href: `#${SECTION_IDS.RUNDOWN}`, showIn: "both" },
  { id: SECTION_IDS.GUESTS, label: "Undangan", href: `#${SECTION_IDS.GUESTS}`, showIn: "both" },
  { id: SECTION_IDS.COMMITTEE, label: "Panitia", href: `#${SECTION_IDS.COMMITTEE}`, showIn: "both" },
  { id: SECTION_IDS.PROPOSAL, label: "Proposal & Sponsor", href: `#${SECTION_IDS.PROPOSAL}`, showIn: "pre" },
  { id: SECTION_IDS.GALLERY, label: "Momen Acara", href: `#${SECTION_IDS.GALLERY}`, showIn: "event" },
  { id: SECTION_IDS.CONTACT, label: "Kontak", href: `#${SECTION_IDS.CONTACT}`, showIn: "both" },
];

export function getNavItems(mode: EventMode): NavItem[] {
  return ALL_NAV_ITEMS.filter((item) => {
    if (item.showIn === "both") return true;
    return item.showIn === mode;
  });
}
