const BASE_URL = "https://clarkcreativegroup.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Clark Creative Group",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  email: "contact@clarkcreativegroup.com",
  description:
    "A creative advisory for founders. We design brands, build business systems, and connect the whole picture — Space, Story, System.",
  sameAs: [
    "https://www.linkedin.com/company/clarkcreative-group/",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Clark Creative Group",
  url: BASE_URL,
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema),
        }}
      />
    </>
  );
}
