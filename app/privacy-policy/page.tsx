import LegalPageLayout from "../components/marketing/LegalPageLayout";

const sections = [
  {
    title: "Information we collect",
    items: [
      "Account details such as name, email address and phone number.",
      "Business information such as business name and vendor contact details.",
      "Inventory information, phone listings, prices, quantities and images.",
      "Customer and sales records entered by vendors.",
      "Support messages, feedback and communications.",
      "Basic technical information required to operate and secure the platform.",
    ],
  },
  {
    title: "How we use information",
    items: [
      "To create and manage user accounts.",
      "To provide inventory, sales and marketplace functionality.",
      "To display vendor phone listings to marketplace visitors.",
      "To connect interested customers with the correct vendor.",
      "To provide support and respond to enquiries.",
      "To detect misuse, improve security and maintain the platform.",
      "To understand how PhoneStock is used and improve its features.",
    ],
  },
  {
    title: "Legal grounds for processing",
    paragraphs: [
      "Depending on the activity, information may be processed to provide requested services, comply with legal obligations, protect legitimate platform interests or act with the user's consent.",
    ],
  },
  {
    title: "Public marketplace information",
    paragraphs: [
      "Phone details, images, prices, vendor business names and vendor contact details may be displayed publicly where a vendor chooses to publish a marketplace listing.",
      "Vendors should not include private or unnecessary personal information inside public product descriptions.",
    ],
  },
  {
    title: "Service providers",
    paragraphs: [
      "PhoneStock may use trusted technology providers for authentication, database hosting, file storage, deployment, email delivery, analytics and related platform operations.",
      "These providers may process information only as required to provide their services and subject to their applicable terms and safeguards.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      "Information is kept only for as long as it is reasonably required to provide the service, maintain records, resolve disputes, protect the platform or meet legal obligations.",
      "Some information may remain in secure backups for a limited period after deletion.",
    ],
  },
  {
    title: "Your privacy rights",
    items: [
      "Request access to personal information held about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion where legally applicable.",
      "Object to or restrict certain processing where applicable.",
      "Withdraw consent where processing depends on consent.",
      "Submit a complaint to the appropriate data-protection authority.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "PhoneStock uses reasonable technical and organisational measures intended to protect information against unauthorised access, alteration, loss or misuse.",
      "No internet-based service can guarantee absolute security, so users should also protect their passwords and devices.",
    ],
  },
  {
    title: "Children",
    paragraphs: [
      "PhoneStock is intended for business users and is not designed for children. Users should not submit children's personal information unless there is a lawful and necessary reason to do so.",
    ],
  },
  {
    title: "International processing",
    paragraphs: [
      "Some service providers may process information outside Nigeria. Where this occurs, appropriate safeguards should be used as required by applicable law.",
    ],
  },
  {
    title: "Policy updates",
    paragraphs: [
      "This Privacy Policy may be updated to reflect product, operational or legal changes. Important changes may also be communicated through the platform.",
    ],
  },
  {
    title: "Contact and requests",
    paragraphs: [
      "Privacy questions and requests can be submitted through the PhoneStock support page. We may need to verify your identity before completing a request.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      description="How PhoneStock collects, uses, stores and protects personal and business information."
      lastUpdated="13 July 2026"
      sections={sections}
    />
  );
}