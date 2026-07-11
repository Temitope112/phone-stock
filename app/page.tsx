import LandingNavbar from "./components/marketing/LandingNavbar";
import LandingHero from "./components/marketing/LandingHero";
import LandingTrusted from "./components/marketing/LandingTrusted";
import LandingDashboardPreview from "./components/marketing/LandingDashboardPreview";
import LandingFeatures from "./components/marketing/LandingFeatures";
import LandingHowItWorks from "./components/marketing/LandingHowItWorks";
import LandingStats from "./components/marketing/LandingStats";
import LandingTestimonials from "./components/marketing/LandingTestimonials";
import LandingPricing from "./components/marketing/LandingPricing";
import LandingFAQ from "./components/marketing/LandingFAQ";
import LandingCTA from "./components/marketing/LandingCTA";
import LandingFooter from "./components/marketing/LandingFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <LandingNavbar />
      <LandingHero />
      <LandingTrusted />
      <LandingDashboardPreview />
      <LandingFeatures />
      <LandingHowItWorks />
      <LandingStats />
      <LandingTestimonials />
      <LandingPricing />
      <LandingFAQ />
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}