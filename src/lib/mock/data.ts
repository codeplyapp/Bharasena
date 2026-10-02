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
} from "../types";

/**
 * Fixture Data Mock untuk Development (Semua data bertanda [GANTI])
 */

export const mockHero: HeroProps = {
  eventName: "BHARASENA",
  dateRange: "11–13 Desember 2026",
  venue: "[GANTI] Gedung Graha Bhayangkara, Banyuwangi",
  tagline: "Merajut Asa, Mengukir Jejak Kesatria Taruna Menuju Puncak Gemilang",
};

export const mockAbout: AboutInfo = {
  tujuan:
    "[GANTI] Mewadahi perayaan kelulusan dan pelepasan Taruna Bhayangkara Angkatan 6 dengan penuh kehormatan, mempererat tali kekeluargaan, serta mempersembahkan rasa syukur atas dedikasi dan pengabdian selama masa pendidikan di SMAN 2 Taruna Bhayangkara.",
  harapan:
    "[GANTI] Menjadi momentum bersejarah yang menginspirasi setiap lulusan untuk terus melangkah berani, menjaga integritas kesatria, dan menjadi garda terdepan pembawa perubahan positif bagi nusa dan bangsa.",
  artiNama:
    "[GANTI] Bhara Arsa Nawasena melambangkan kesatria tangguh (Bhara) yang dipenuhi dengan semangat dan kebahagiaan (Arsa) dalam menempuh masa depan yang cerah dan penuh kejayaan (Nawasena).",
  filosofiLogo:
    "[GANTI] Lambang perisai emas melambangkan ketangguhan perlindungan, nyala api merah menyimbolkan keberanian membara, dan bintang navigasi mencerminkan arah masa depan gemilang angkatan keenam.",
  logoUrl: "/logo.webp",
};

export const mockGuestStars: GuestStar[] = [
  {
    id: 1,
    name: "[GANTI] Sheila on 7",
    role: "Special Guest Performer",
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
    order: 1,
  },
  {
    id: 2,
    name: "[GANTI] Hindia & Feast",
    role: "Guest Artist & Live Band",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    order: 2,
  },
  {
    id: 3,
    name: "[GANTI] DJ Alffy Rev",
    role: "Musical & Cinematic Finale Show",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    order: 3,
  },
];

export const mockRundown: RundownItem[] = [
  // Day 1
  {
    id: 1,
    day: 1,
    time: "15.00 - 16.30",
    title: "[GANTI] Registrasi & Welcome Gathering",
    description:
      "[GANTI] Penyambutan kedatangan seluruh taruna, wali murid, dan penyerahan kit souvenir prom.",
    order: 1,
  },
  {
    id: 2,
    day: 1,
    time: "16.30 - 18.00",
    title: "[GANTI] Upacara Pembukaan Bhara Nawasena",
    description:
      "[GANTI] Defile kehormatan, sambutan Kepala Satuan Pendidikan, dan pemukulan gong pembukaan.",
    order: 2,
  },
  {
    id: 3,
    day: 1,
    time: "19.30 - 22.00",
    title: "[GANTI] Malam Keakraban & Akustik Taruna",
    description:
      "[GANTI] Penampilan band lokal angkatan dan sesi ramah tamah antarkompi.",
    order: 3,
  },
  // Day 2
  {
    id: 4,
    day: 2,
    time: "08.00 - 11.30",
    title: "[GANTI] Parade Budaya & Seni Taruna",
    description:
      "[GANTI] Penampilan tari nusantara, kolaborasi orkestra mini, dan pameran karya inovasi.",
    order: 1,
  },
  {
    id: 5,
    day: 2,
    time: "13.30 - 17.00",
    title: "[GANTI] Panggung Apresiasi & Awarding Angkatan",
    description:
      "[GANTI] Penganugerahan penghargaan kategori prestasi akademik, kepemimpinan, dan kepribadian.",
    order: 2,
  },
  {
    id: 6,
    day: 2,
    time: "19.00 - 23.00",
    title: "[GANTI] Konser Musik & Guest Star Performance",
    description:
      "[GANTI] Penampilan panggung utama dari Guest Star nasional dan kolaborasi penari latar.",
    order: 3,
  },
  // Day 3
  {
    id: 7,
    day: 3,
    time: "09.00 - 11.30",
    title: "[GANTI] Gala Dinner Prom Night & Puncak Pelepasan",
    description:
      "[GANTI] Jamuan makan malam resmi, pemutaran film dokumenter perjalanan 3 tahun, dan ikrar alumni.",
    order: 1,
  },
  {
    id: 8,
    day: 3,
    time: "12.30 - 14.30",
    title: "[GANTI] Farewell Ceremony & Kembang Api",
    description:
      "[GANTI] Prosesi penyerahan tongkat estafet tradisi, pelepasan lampion cita-cita, dan penutupan resmi.",
    order: 2,
  },
];

export const mockOfficialGuests: OfficialGuest[] = [
  {
    id: 1,
    name: "[GANTI] Kombes Pol. Dr. H. Hendra Wijaya, S.I.K., M.Si.",
    role: "Kepala Satuan Pendidikan SMAN 2 Taruna Bhayangkara",
    category: "kepala",
  },
  {
    id: 2,
    name: "[GANTI] AKBP Rahmat Santoso, S.Pd., M.M.",
    role: "Wakil Kepala Bidang Pengasuhan & Kedisiplinan",
    category: "wakil",
  },
  {
    id: 3,
    name: "[GANTI] Dra. Hj. Sri Wahyuni, M.Pd.",
    role: "Wakil Kepala Bidang Kurikulum & Akademik",
    category: "wakil",
  },
  {
    id: 4,
    name: "[GANTI] Mayor Pol. Ahmad Fauzi, S.H.",
    role: "Pembina Utama Batalyon Angkatan 6",
    category: "pembina",
  },
  {
    id: 5,
    name: "[GANTI] Letda Inf. Bambang Supriyadi",
    role: "Instruktur Pembinaan Karakter Taruna",
    category: "pembina",
  },
  {
    id: 6,
    name: "[GANTI] Ketua Komite Sekolah & Dewan Alumni Kehormatan",
    role: "Tamu Kehormatan Yayasan Taruna",
    category: "lainnya",
  },
];

export const mockCommittee: CommitteeSection[] = [
  {
    id: 1,
    title: "Badan Pengurus Harian (BPH)",
    order: 1,
    members: [
      { id: 1, name: "[GANTI] M. Farhan Ardiansyah", role: "Ketua Pelaksana", order: 1 },
      { id: 2, name: "[GANTI] Alifia Nur Ramadhani", role: "Wakil Ketua Pelaksana", order: 2 },
      { id: 3, name: "[GANTI] Daffa Rizqi Pratama", role: "Sekretaris I", order: 3 },
      { id: 4, name: "[GANTI] Nabila Putri Az-Zahra", role: "Bendahara I", order: 4 },
    ],
  },
  {
    id: 2,
    title: "Divisi Acara & Protokoler",
    order: 2,
    members: [
      { id: 5, name: "[GANTI] Kevin Aditya", role: "Koordinator Acara", order: 1 },
      { id: 6, name: "[GANTI] Zahra Maulida", role: "Staf Protokoler & Upacara", order: 2 },
      { id: 7, name: "[GANTI] Rayhan Putra", role: "Staf Stage Management", order: 3 },
    ],
  },
  {
    id: 3,
    title: "Divisi Sponsorship & Dana Usaha",
    order: 3,
    members: [
      { id: 8, name: "[GANTI] Dimas Arya Sena", role: "Koordinator Sponsorship", order: 1 },
      { id: 9, name: "[GANTI] Tiara Kusuma", role: "Hubungan Korporasi", order: 2 },
      { id: 10, name: "[GANTI] Bima Sakti", role: "Hubungan UMKM & Bazar", order: 3 },
    ],
  },
  {
    id: 4,
    title: "Divisi Publikasi & Dokumentasi",
    order: 4,
    members: [
      { id: 11, name: "[GANTI] Bagas Pratama", role: "Koordinator Pubdok", order: 1 },
      { id: 12, name: "[GANTI] Clarissa Aurelia", role: "Desainer Grafis & Media", order: 2 },
      { id: 13, name: "[GANTI] Gilang Ramadhan", role: "Videografer & IT", order: 3 },
    ],
  },
  {
    id: 5,
    title: "Divisi Perlengkapan & Logistik",
    order: 5,
    members: [
      { id: 14, name: "[GANTI] Fikri Haikal", role: "Koordinator Logistik", order: 1 },
      { id: 15, name: "[GANTI] Rendy Febrian", role: "Staf Tata Panggung & Lighting", order: 2 },
    ],
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 1,
    type: "kegiatan",
    title: "Proposal Kegiatan Prom Night BHARASENA 2026",
    description:
      "[GANTI] Berkas resmi legalitas acara mencakup latar belakang, tujuan, rancangan teknis 3 hari pelaksanaan, dan susunan kepanitiaan resmi.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    type: "sponsorship",
    title: "Proposal Sponsorship & Kerjasama Brand",
    description:
      "[GANTI] Paket kemitraan eksklusif untuk korporasi, institusi pendidikan tinggi, dan brand partner dengan jangkauan audiens 1.500+ peserta.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 3,
    type: "umkm",
    title: "Proposal Kemitraan Bazar & UMKM Kuliner",
    description:
      "[GANTI] Peluang pembukaan tenant booth makanan, minuman, souvenir, dan produk kreatif selama rangkaian acara berlangsung.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

export const mockSponsorshipTiers: SponsorshipTier[] = [
  {
    id: "platinum",
    name: "Platinum Partner",
    price: "[GANTI] Rp 25.000.000+",
    benefits: [
      "[GANTI] Penempatan Logo Utama pada Backdrop Utama & Semua Media Cetak",
      "[GANTI] Pemutaran Video Iklan 60 detik sebelum Penampilan Guest Star",
      "[GANTI] Booth Eksklusif VIP Ukuran 4x4m di Area Utama",
      "[GANTI] Hak Penyebutan Nama Sponsor (Ad-libs) oleh MC di Setiap Sesi",
      "[GANTI] Akses 10 Tiket VIP Gala Dinner & Tempat Duduk Kehormatan",
    ],
    highlight: true,
    order: 1,
  },
  {
    id: "gold",
    name: "Gold Partner",
    price: "[GANTI] Rp 15.000.000",
    benefits: [
      "[GANTI] Penempatan Logo Menengah pada Backdrop & Baliho Promosi",
      "[GANTI] Pemutaran Video Iklan 30 detik pada Jeda Acara",
      "[GANTI] Booth Standar Ukuran 3x3m di Area Festival",
      "[GANTI] Penyebutan Nama Sponsor oleh MC sebanyak 4 kali per hari",
      "[GANTI] Akses 5 Tiket VIP Acara",
    ],
    highlight: false,
    order: 2,
  },
  {
    id: "silver",
    name: "Silver Partner",
    price: "[GANTI] Rp 7.500.000",
    benefits: [
      "[GANTI] Penempatan Logo pada Flyer Digital, Website Resmi, dan TIKET",
      "[GANTI] Booth Produk Ukuran 2x2m",
      "[GANTI] Penyebutan Sponsor oleh MC sebanyak 2 kali per hari",
      "[GANTI] Akses 2 Tiket Tamu Undangan",
    ],
    highlight: false,
    order: 3,
  },
  {
    id: "perunggu",
    name: "Bronze / In-Kind Partner",
    price: "[GANTI] Rp 3.000.000 / Barter Produk",
    benefits: [
      "[GANTI] Penempatan Logo pada Website & Buku Panduan Acara",
      "[GANTI] Display Banner Roll di Area Selasar",
      "[GANTI] Sertifikat Apresiasi Resmi Kemitraan",
    ],
    highlight: false,
    order: 4,
  },
];

export const mockContacts: ContactPerson[] = [
  {
    id: 1,
    type: "humas",
    label: "Humas & Informasi Umum",
    name: "[GANTI] Kevin Aditya (Acara)",
    phoneWa: "6281234567890",
  },
  {
    id: 2,
    type: "humas",
    label: "Humas & Keprotokolan",
    name: "[GANTI] Zahra Maulida",
    phoneWa: "6281234567891",
  },
  {
    id: 3,
    type: "humas",
    label: "Sekretariat Acara",
    name: "[GANTI] Daffa Rizqi Pratama",
    phoneWa: "6281234567892",
  },
  {
    id: 4,
    type: "sponsorship",
    label: "Koordinator Sponsorship Utama",
    name: "[GANTI] Dimas Arya Sena",
    phoneWa: "6281234567893",
  },
  {
    id: 5,
    type: "sponsorship",
    label: "Kemitraan Korporasi",
    name: "[GANTI] Tiara Kusuma",
    phoneWa: "6281234567894",
  },
  {
    id: 6,
    type: "sponsorship",
    label: "Administrasi & MoU Sponsor",
    name: "[GANTI] Nabila Putri Az-Zahra",
    phoneWa: "6281234567895",
  },
  {
    id: 7,
    type: "umkm",
    label: "Koordinator Bazar & Tenant",
    name: "[GANTI] Bima Sakti (UMKM)",
    phoneWa: "6281234567896",
  },
  {
    id: 8,
    type: "umkm",
    label: "Staf Registrasi Stand Kuliner",
    name: "[GANTI] Alifia Nur",
    phoneWa: "6281234567897",
  },
  {
    id: 9,
    type: "umkm",
    label: "Operasional Tenant Bazar",
    name: "[GANTI] Rendy Febrian",
    phoneWa: "6281234567898",
  },
];

export const mockPhotos: DocumentationPhoto[] = [
  // Day 1
  {
    id: 1,
    day: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Suasana kemeriahan registrasi dan defile pembukaan hari pertama",
    order: 1,
  },
  {
    id: 2,
    day: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Upacara sakral pembukaan dan penyalaan obor Bhara Nawasena",
    order: 2,
  },
  {
    id: 3,
    day: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Malam keakraban dan penampilan akustik santai seluruh kompi",
    order: 3,
  },
  // Day 2
  {
    id: 4,
    day: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Pagelaran tari kreasi nusantara oleh perwakilan taruni",
    order: 1,
  },
  {
    id: 5,
    day: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Panggung spektakuler konser musik dan live performance Guest Star",
    order: 2,
  },
  {
    id: 6,
    day: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Antusiasme ratusan taruna menyaksikan penampilan panggung megah",
    order: 3,
  },
  // Day 3
  {
    id: 7,
    day: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Jamuan resmi Gala Dinner Prom Night bersama orang tua dan dewan pembina",
    order: 1,
  },
  {
    id: 8,
    day: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop",
    caption: "[GANTI] Prosesi haru pelepasan lampion cita-cita dan kembang api penutupan",
    order: 2,
  },
];
