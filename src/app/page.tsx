import Splash from "@/components/Splash";
import Scene from "@/components/Scene";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Onboarding from "@/components/Onboarding";
import Changelog from "@/components/Changelog";
import AppDrawer from "@/components/AppDrawer";
import Settings from "@/components/Settings";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// "Abhi, the app": each section is a screen (see src/data/site.ts).
// Splash must come first so it can tell Hero and the phone when to start animating.
// On large screens <main> leaves room on the right for the phone in <Scene />.
export default function Home() {
  return (
    <>
      <Splash />
      <Scene />
      <Nav />
      <main className="relative z-10 lg:pr-[22rem] xl:pr-[27rem]">
        <Hero />
        <Onboarding />
        <Changelog />
        <AppDrawer />
        <Settings />
        <Contact />
      </main>
      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </>
  );
}
