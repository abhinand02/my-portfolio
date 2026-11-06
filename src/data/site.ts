// Edit this file to change all the text on your portfolio.
// The site follows the "Abhi, the app" storyline: each section is a screen.
// Words wrapped in *asterisks* are shown in the italic serif accent style.

export type App = {
  name: string;
  oneLiner: string;
  tech: string;
  status: string; // small badge, e.g. "Live on both stores"
  colors: [string, string]; // app icon gradient
  icon?: string; // optional real icon in /public, e.g. "/icons/valo.png"
  href?: string; // optional store / website link
  problem: string;
  built: string;
  learned: string;
};

export const site = {
  name: "Abhinand",
  fullName: "Abhinand Madhu",
  role: "Flutter Developer",
  location: "Kottayam, Kerala",
  email: "abhinandmadhu08@gmail.com",
  whatsapp: "918156888469", // country code, no +. Leave "" to hide it from the footer.
  linkedin: "https://www.linkedin.com/in/abhinand-madhu-a0b1b1213",
  resumeUrl: "/resume.pdf",
  year: "2026", // shown in the footer copyright

  // Links in the top bar and footer (each points at a screen's id).
  nav: [
    { label: "Story", href: "#onboarding" },
    { label: "Changelog", href: "#changelog" },
    { label: "Apps", href: "#apps" },
    { label: "Skills", href: "#settings" },
    { label: "Contact", href: "#contact" },
  ],

  // The one line every screen supports.
  thread: "I started by *shipping one app*, learned to *ship many*, and now I'm *building my own*.",

  // Screen 1 — Splash
  splash: {
    quote: "I build the apps people open every day: *chatting*, *booking*, *buying*, *learning*.",
    compiled: "3+ years compiled",
  },

  // Screen 2 — Onboarding (who I am, in 3 swipes)
  onboarding: [
    {
      title: "I ship.",
      text: "Five production apps on the Play Store and App Store, from first commit to store release.",
    },
    {
      title: "I own the whole feature.",
      text: "Requirements with Product and UX, architecture, testing, CI/CD, release.",
    },
    {
      title: "I build my own things too.",
      text: "Lawtus, an edtech platform for law aspirants, is my current build.",
    },
  ],

  // Screen 3 — Changelog (the career story)
  changelog: [
    {
      version: "v0.1",
      title: "Compiling",
      when: "2019 – 2022",
      where: "Mar Augusthinose College, Ramapuram",
      text: "BCA. Where the interest in building things became a skill.",
    },
    {
      version: "v1.0",
      title: "First release",
      when: "Jun 2023",
      where: "Expereal Technologies",
      text: "Took BuyWalkin, a social commerce app, from development to production on Android and iOS. Learned what shipping takes: BLoC/Cubit, Firebase, push notifications, payments, and Codemagic pipelines that made releases routine.",
    },
    {
      version: "v2.0",
      title: "Multi-app support",
      when: "Oct 2024",
      where: "Codesvera Infotech",
      text: "Went from one product to many: Flamor (dating), Valo (hotel and chalet booking), Waves (ERP) and on-demand apps. Each domain brought new problems: real-time chat and location matching, secure booking payments, data-heavy business modules. Here Clean Architecture and reusable modules stopped being theory and became how I work.",
    },
    {
      version: "v2.5",
      title: "Stability patch",
      when: "Ongoing",
      where: "",
      text: "The less glamorous work that matters most: chasing crashes in Crashlytics, fixing rendering and performance issues in DevTools, writing tests, and working with QA so releases land stable.",
    },
    {
      version: "v3.0",
      title: "Building my own",
      when: "Now",
      where: "Lawtus Edu",
      text: "A law entrance prep platform for Kerala students (CLAT, AILET, KLEE, CUET). A Flutter app with in-app course purchases, plus the organisation website in React/Next.js. My first time owning a product's direction, not just its code.",
    },
  ],

  // Screen 4 — App Drawer (projects). Each icon opens a short case study.
  // NOTE: problem / built / learned are drafted from your résumé and storyline — check them.
  apps: [
    {
      name: "Lawtus Edu",
      oneLiner: "Exam prep for law aspirants, with shareable course-invitation cards for social promotion",
      tech: "Flutter · Next.js · In-App Purchases",
      status: "Building now",
      colors: ["#6d5dfc", "#2b1f8f"],
      problem: "Law aspirants in Kerala preparing for CLAT, AILET, KLEE and CUET need classes, practice and mentoring in one place.",
      built: "A Flutter app with in-app course purchases, live and recorded classes, mock tests with performance analysis and one-on-one mentorship — plus the organisation website in React/Next.js with shareable course-invitation cards.",
      learned: "My first time owning a product's direction, not just its code.",
    },
    {
      name: "Flamor",
      oneLiner: "Dating app with real-time chat and location-based matching on Supabase",
      tech: "Flutter · Supabase · PostgreSQL",
      status: "Shipped",
      colors: ["#ff4f7b", "#c2185b"],
      problem: "A dating app only works if matches and conversations feel instant.",
      built: "Real-time chat, location-based matching, push notifications and In-App Purchases on Supabase/PostgreSQL.",
      learned: "How to keep real-time features reliable — and why Clean Architecture matters once an app grows fast.",
    },
    {
      name: "Valo",
      oneLiner: "Hotel and chalet booking with secure payments, live on both stores",
      tech: "Flutter · REST APIs",
      status: "Live on both stores",
      colors: ["#1ec8a5", "#0b6e8a"],
      problem: "Guests need to find, book and pay for hotels and chalets without friction or risk.",
      built: "Booking management and secure payments over RESTful APIs, released on the Play Store and App Store.",
      learned: "Getting payments right, and what it takes to keep a live app stable on two stores.",
    },
    {
      name: "Waves",
      oneLiner: "ERP covering inventory, HR, invoicing and attendance",
      tech: "Flutter · GetX · REST APIs",
      status: "Shipped",
      colors: ["#3a8dff", "#1b3fa8"],
      problem: "Businesses juggle inventory, HR, invoicing and attendance across separate tools.",
      built: "Inventory, HR, invoicing, attendance and reporting modules in one Flutter app with GetX.",
      learned: "Structuring data-heavy business modules so they stay reusable and easy to extend.",
    },
    {
      name: "BuyWalkin",
      oneLiner: "Social commerce, my first end-to-end release",
      tech: "Flutter · Firebase · BLoC/Cubit",
      status: "Shipped",
      colors: ["#ff8a1f", "#d4430b"],
      problem: "A social commerce app had to go from development to live on Android and iOS.",
      built: "Scalable modules with BLoC/Cubit, Firebase Auth and Firestore, OneSignal push notifications, payment gateways and Codemagic CI/CD.",
      learned: "What shipping really takes — and Codemagic pipelines that made releases routine.",
    },
  ] as App[],

  // Smaller "In the lab" row, so concepts aren't confused with shipped work.
  lab: [
    {
      name: "Driverundo",
      kind: "App concept",
      text: "A driver-booking app with emergency instant booking and dynamic pricing. Product thinking and system design.",
    },
    {
      name: "Skeletal",
      kind: "Flutter package",
      text: "A declarative shimmer / skeleton loading package for Flutter.",
    },
  ],

  // Screen 5 — Settings (skills), shown as toggles that are all switched on.
  settings: [
    "Dart & Flutter",
    "Bloc/Cubit · GetX · Provider",
    "Clean Architecture & MVVM",
    "Firebase & Supabase",
    "REST & GraphQL",
    "Payments & IAP",
    "Codemagic CI/CD",
    "Testing",
  ],

  // Screen 6 — Contact (the "Install" button)
  install: {
    pitch: "Looking for someone who can take your app from *idea to the App Store*? Let's talk.",
    stats: ["3+ yrs", "5 apps shipped", "Android & iOS"],
  },
};
