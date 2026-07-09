import LandingNavbar from "./components/marketing/LandingNavbar";
import LandingHero from "./components/marketing/LandingHero";
import LandingFeatures from "./components/marketing/LandingFeatures";
import LandingHowItWorks from "./components/marketing/LandingHowItWorks";
import LandingPricing from "./components/marketing/LandingPricing";
import LandingCTA from "./components/marketing/LandingCTA";
import LandingFooter from "./components/marketing/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />
      <LandingHero />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingPricing />
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}