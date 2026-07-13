import LegalPageLayout from "../components/marketing/LegalPageLayout";

const sections = [
  {
    title: "Acceptance of these terms",
    paragraphs: [
      "By creating an account, accessing PhoneStock, listing a phone, browsing the marketplace, or using any part of the platform, you agree to these Terms and Conditions.",
      "If you do not agree to these terms, you should not use PhoneStock.",
    ],
  },
  {
    title: "About PhoneStock",
    paragraphs: [
      "PhoneStock provides inventory, sales, customer-management and marketplace tools for phone vendors.",
      "PhoneStock may help buyers discover listed phones and contact the vendor responsible for a listing. Unless expressly stated otherwise, PhoneStock is not the seller of phones listed by independent vendors.",
    ],
  },
  {
    title: "Account responsibilities",
    items: [
      "You must provide accurate registration and business information.",
      "You are responsible for protecting your password and account access.",
      "You must notify support if you believe your account has been accessed without permission.",
      "You must not impersonate another person or business.",
    ],
  },
  {
    title: "Vendor responsibilities",
    items: [
      "Vendors must provide accurate descriptions, prices, quantities and product conditions.",
      "Vendors must only list products they are legally permitted to sell.",
      "Vendors are responsible for communicating with customers and completing transactions honestly.",
      "Listings must not contain fraudulent, misleading, unlawful or abusive content.",
    ],
  },
  {
    title: "Marketplace transactions",
    paragraphs: [
      "Customers may contact vendors through information provided with a listing. Any purchase, delivery, warranty, refund or payment arrangement made directly between a vendor and customer is primarily the responsibility of those parties.",
      "Customers should independently verify a product and vendor before making payment.",
    ],
  },
  {
    title: "Acceptable use",
    items: [
      "Do not use PhoneStock for fraud, spam or unlawful activity.",
      "Do not attempt to access another vendor's records.",
      "Do not interfere with the platform, security systems or other users.",
      "Do not upload malicious code or content that violates another person's rights.",
    ],
  },
  {
    title: "Suspension and termination",
    paragraphs: [
      "PhoneStock may restrict or terminate access where an account is used fraudulently, unlawfully, abusively or in violation of these terms.",
      "Where reasonably possible, affected users may be contacted before permanent account action is taken.",
    ],
  },
  {
    title: "Service availability",
    paragraphs: [
      "We aim to keep PhoneStock available and reliable, but uninterrupted operation is not guaranteed.",
      "Features may be changed, improved, suspended or removed as the product develops.",
    ],
  },
  {
    title: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by applicable law, PhoneStock is not responsible for indirect losses, vendor misconduct, inaccurate listings, failed third-party communications or transactions completed outside the platform.",
      "Nothing in these terms excludes liability that cannot legally be excluded.",
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: [
      "These terms may be updated when the platform, legal requirements or business practices change. The updated date will be shown on this page.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "Questions about these terms can be submitted through the PhoneStock support page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms and Conditions"
      description="The rules that apply when vendors, customers and visitors use PhoneStock."
      lastUpdated="13 July 2026"
      sections={sections}
    />
  );
}