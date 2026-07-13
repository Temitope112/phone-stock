import LegalPageLayout from "../components/marketing/LegalPageLayout";

const sections = [
  {
    title: "What cookies are",
    paragraphs: [
      "Cookies and similar browser technologies are small pieces of information used by websites to remember settings, maintain sessions and understand how services are used.",
    ],
  },
  {
    title: "Cookies PhoneStock may use",
    items: [
      "Essential cookies required for authentication and secure account sessions.",
      "Preference cookies that remember selected options and interface choices.",
      "Analytics technologies used to understand platform performance and usage.",
      "Security technologies used to detect suspicious or unauthorised activity.",
    ],
  },
  {
    title: "Essential cookies",
    paragraphs: [
      "Essential cookies are necessary for core features such as signing in, keeping a session active and protecting authenticated areas.",
      "Disabling them may prevent parts of PhoneStock from working correctly.",
    ],
  },
  {
    title: "Analytics and optional cookies",
    paragraphs: [
      "Where optional analytics or marketing technologies are introduced, PhoneStock should provide appropriate information and consent controls where required.",
    ],
  },
  {
    title: "Third-party services",
    paragraphs: [
      "Some infrastructure and service providers may place or use similar technologies as part of authentication, hosting, analytics or security functions.",
      "Their use is also governed by their own privacy and cookie notices.",
    ],
  },
  {
    title: "Managing cookies",
    paragraphs: [
      "You can manage or delete cookies through your browser settings. Blocking some cookies may affect account sessions and other essential features.",
    ],
  },
  {
    title: "Policy updates",
    paragraphs: [
      "This Cookie Policy may be updated when new tools, providers or tracking technologies are introduced.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about cookies or tracking technologies can be submitted through the PhoneStock support page.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookies"
      title="Cookie Policy"
      description="Information about the cookies and similar technologies used to operate PhoneStock."
      lastUpdated="13 July 2026"
      sections={sections}
    />
  );
}