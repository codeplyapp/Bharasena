import { getSiteMode, getHeroInfo, getAbout, getGuestStars, getRundown, getOfficialGuests, getCommittee, getProposals, getSponsorshipTiers, getContacts, getPhotos } from "@/lib/data";
import { resolveDefaultDay } from "@/lib/mode";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { GuestStarSection } from "@/components/sections/GuestStarSection";
import { RundownSection } from "@/components/sections/RundownSection";
import { GuestsSection } from "@/components/sections/GuestsSection";
import { CommitteeSection } from "@/components/sections/CommitteeSection";
import { ProposalSection } from "@/components/sections/ProposalSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export default async function HomePage() {
  // Pemuat data server-side secara paralel
  const [
    mode,
    hero,
    about,
    guestStars,
    rundown,
    officialGuests,
    committee,
    proposals,
    sponsorshipTiers,
    contacts,
    photos,
  ] = await Promise.all([
    getSiteMode(),
    getHeroInfo(),
    getAbout(),
    getGuestStars(),
    getRundown(),
    getOfficialGuests(),
    getCommittee(),
    getProposals(),
    getSponsorshipTiers(),
    getContacts(),
    getPhotos(),
  ]);

  const defaultDay = resolveDefaultDay(mode);

  return (
    <div className="min-h-screen bg-charcoal-900 text-stone-100 flex flex-col selection:bg-gold-400 selection:text-charcoal-900">
      {/* Sticky Navbar (Client Island) */}
      <Navbar mode={mode} />

      {/* Main Content Sections (Server Components) */}
      <main className="flex-1">
        <Hero
          eventName={hero.eventName}
          dateRange={hero.dateRange}
          venue={hero.venue}
          tagline={hero.tagline}
          mode={mode}
        />

        <AboutSection about={about} />

        <GuestStarSection guests={guestStars} />

        <RundownSection items={rundown} defaultDay={defaultDay} />

        <GuestsSection guests={officialGuests} />

        <CommitteeSection sections={committee} />

        {/* Section Kondisional Berdasarkan Server Mode */}
        {mode === "pre" && (
          <ProposalSection
            proposals={proposals}
            tiers={sponsorshipTiers}
          />
        )}

        {mode === "event" && (
          <GallerySection
            photos={photos}
            defaultDay={defaultDay}
          />
        )}

        <ContactSection contacts={contacts} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
