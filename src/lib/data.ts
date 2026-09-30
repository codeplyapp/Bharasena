import {
  AboutInfo,
  GuestStar,
  RundownItem,
  OfficialGuest,
  CommitteeSection,
  Proposal,
  SponsorshipTier,
  ContactPerson,
  DocumentationPhoto,
  HeroProps,
  EventMode,
} from "./types";
import {
  mockAbout,
  mockGuestStars,
  mockRundown,
  mockOfficialGuests,
  mockCommittee,
  mockProposals,
  mockSponsorshipTiers,
  mockContacts,
  mockPhotos,
  mockHero,
} from "./mock/data";
import { resolveServerMode } from "./mode";

/**
 * Data Loader Layer — Abstraksi pemuat data untuk Server Components.
 * Menyediakan data mock selama DB belum siap, dan dapat disambungkan ke Prisma query.
 */

export async function getSiteMode(): Promise<EventMode> {
  // Nantinya dapat membaca override dari SiteSetting DB jika terhubung
  return resolveServerMode();
}

export async function getHeroInfo(): Promise<HeroProps> {
  return mockHero;
}

export async function getAbout(): Promise<AboutInfo> {
  return mockAbout;
}

export async function getGuestStars(): Promise<GuestStar[]> {
  // Pastikan terurut berdasarkan kolom order
  return [...mockGuestStars].sort((a, b) => a.order - b.order);
}

export async function getRundown(): Promise<RundownItem[]> {
  // Pastikan terurut berdasarkan day kemudian order
  return [...mockRundown].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.order - b.order;
  });
}

export async function getOfficialGuests(): Promise<OfficialGuest[]> {
  const categoryPriority: Record<string, number> = {
    kepala: 1,
    wakil: 2,
    pembina: 3,
    lainnya: 4,
  };

  return [...mockOfficialGuests].sort((a, b) => {
    const pA = categoryPriority[a.category] ?? 99;
    const pB = categoryPriority[b.category] ?? 99;
    return pA - pB;
  });
}

export async function getCommittee(): Promise<CommitteeSection[]> {
  return [...mockCommittee]
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      ...section,
      members: [...section.members].sort((a, b) => a.order - b.order),
    }));
}

export async function getProposals(): Promise<Proposal[]> {
  return mockProposals;
}

export async function getSponsorshipTiers(): Promise<SponsorshipTier[]> {
  return [...mockSponsorshipTiers].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );
}

export async function getContacts(): Promise<ContactPerson[]> {
  return mockContacts;
}

export async function getPhotos(): Promise<DocumentationPhoto[]> {
  return [...mockPhotos].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.order - b.order;
  });
}
