/* ==========================================================================
   WEDDING CONFIG — edit only this file to update the invitation.
   Photos go in  assets/photos/   Videos in  assets/video/   Music in assets/music/
   Leave a field "" (empty) to hide it on the page.
   ========================================================================== */
window.WEDDING = {
  blessing: "|| Sri Ammaji Krupe || Sri Maradi Ranganatha Swamy Prasanna ||",
  elders: "With the blessings of Smt. Puttamma & Sri Late Palyada Kamegowda",
  groom: {
    name: "Arun Gowda K",
    kannada: "ಅರುಣ್ ಗೌಡ ಕೆ",
    title: "Chi. Ry. · B.E",
    parents: "S/o Smt. M. Chandramma & Sri K. Kantharaju",
    place: "Kallambella, Sira Taluk, Tumkur Dist.",
    photo: "",              // e.g. "assets/photos/groom.jpg"
  },
  bride: {
    name: "Likhitha H K",
    kannada: "ಲಿಖಿತಾ ಎಚ್ ಕೆ",
    title: "Chi. Sou. · B.E",
    parents: "D/o Smt. Bhagyalakshmi G.M & Sri Krishnappa H.K",
    place: "Halenahalli Kallambella (H), Sira Taluk, Tumkur Dist.",
    photo: "",              // e.g. "assets/photos/bride.jpg"
  },

  // Muhurtham — drives the countdown
  weddingDate: "2026-11-12T08:00:00+05:30",
  city: "Sira, Tumkur",
  lagna: "Vrishchika Lagna",
  hashtag: "#ArunWedsLikhitha",

  story: [
    "Some stories are written in the stars, and blessed by the elders. Ours began with two families, a shared smile, and the quiet certainty that this was meant to be.",
    "With the blessings of our parents and the grace of Sri Maradi Ranganatha Swamy, we now begin our forever — and it would mean the world to have you beside us.",
  ],

  events: [
    {
      name: "Reception",
      kannada: "ಆರತಕ್ಷತೆ",
      start: "2026-11-11T18:30:00+05:30",
      end:   "2026-11-11T22:00:00+05:30",
      timeLabel: "6:30 pm onwards",
      venue: "Sri Annapoorneshwari Kalyana Mantapa, Sira",
      mapQuery: "Sri Annapoorneshwari Kalyana Mantapa, Jyothinagara, Sira",
      dress: "",
      icon: "reception",
    },
    {
      name: "Muhurtham",
      kannada: "ಶುಭ ಮುಹೂರ್ತ",
      start: "2026-11-12T08:00:00+05:30",
      end:   "2026-11-12T08:45:00+05:30",
      note:  "Vrishchika Lagna",
      venue: "Sri Annapoorneshwari Kalyana Mantapa, Sira",
      mapQuery: "Sri Annapoorneshwari Kalyana Mantapa, Jyothinagara, Sira",
      dress: "",
      icon: "muhurtham",
    },
  ],

  venue: {
    name: "Sri Annapoorneshwari Kalyana Mantapa",
    address: "Sachin Layout, Jyothinagara, Sira Town, Tumkur Dist., Karnataka",
    mapQuery: "Sri Annapoorneshwari Kalyana Mantapa, Jyothinagara, Sira",
    mapsLink: "https://share.google/KvGPh3R1ogPxDKvGd",   // used by every "Directions"/"Map" button
  },

  // "Awaiting your presence"
  hosts: [
    "Smt. M. Chandramma & Sri K. Kantharaju",
    "Smt. Bhagyalakshmi G.M & Sri Krishnappa H.K",
    "Smt. Vidyashree K & Sri Narasimhamurthy P.R",
    "Smt. Chandramma K & Sri Late Gangadharaiah B.C",
  ],

  // Top-right social icons
  whatsapp: "",             // number with country code, e.g. "919876543210" (empty = share the invitation on WhatsApp)
  instagram: "",            // e.g. "https://instagram.com/yourhandle" (empty = #ArunWedsLikhitha hashtag page)

  // RSVP goes to WhatsApp. Country code + number, digits only, e.g. "919876543210"
  rsvpWhatsApp: "",
  rsvpBy: "",

  heroImage: "",
  gallery: [],
  video: { youtubeId: "", file: "", poster: "" },
  music: "",
};
