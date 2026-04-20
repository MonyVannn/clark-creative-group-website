const sectionClassName = "space-y-4";

export default function PrivacyContent() {
  return (
    <section className="mx-auto max-w-3xl py-32 md:py-36">
      <div className="space-y-10">
        <header className="space-y-4">
          <p className="font-satoshi text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Privacy & Cookies
          </p>
          <h1 className="font-clash-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Privacy / Cookies Policy
          </h1>
          <p className="font-satoshi text-base leading-relaxed text-muted-foreground md:text-lg">
            This page explains what information we collect, how we use it, and
            how cookies are handled when you visit Clark Creative Group.
          </p>
          <p className="font-satoshi text-sm text-muted-foreground">
            Last updated: March 31, 2026
          </p>
        </header>

        <div className="space-y-8 font-satoshi text-sm leading-relaxed text-muted-foreground md:text-base">
          <section className={sectionClassName}>
            <h2 className="font-clash-display text-2xl font-medium text-foreground md:text-3xl">
              1) Information we collect
            </h2>
            <p>
              We may collect the information you choose to share with us through
              contact forms, including your name, email address, phone number,
              company name, and message details.
            </p>
            <p>
              We also receive basic technical data from your browser (for
              example, device type, browser type, and pages viewed) to keep the
              website functioning and improve performance.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="font-clash-display text-2xl font-medium text-foreground md:text-3xl">
              2) How we use your information
            </h2>
            <p>
              We use submitted information to respond to inquiries, provide
              requested services, and communicate about potential work.
            </p>
            <p>
              We do not sell your personal information. We only use your
              information for legitimate business operations and communication.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="font-clash-display text-2xl font-medium text-foreground md:text-3xl">
              3) Cookies
            </h2>
            <p>
              Cookies are small text files stored on your device that help sites
              remember settings and understand how pages are used.
            </p>
            <p>
              This website primarily uses cookies that are necessary for basic
              site functionality. If optional analytics or marketing tools are
              added in the future, this policy will be updated to describe those
              cookies and your choices.
            </p>
            <p>
              You can manage or disable cookies in your browser settings at any
              time, though some site features may not function as expected.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="font-clash-display text-2xl font-medium text-foreground md:text-3xl">
              4) Third-party links and services
            </h2>
            <p>
              Our site may link to third-party websites or services, such as our
              client portal. Their privacy practices are governed by their own
              policies, not this one.
            </p>
          </section>

          <section className={sectionClassName}>
            <h2 className="font-clash-display text-2xl font-medium text-foreground md:text-3xl">
              5) Contact us
            </h2>
            <p>
              If you have questions about this policy, please contact us through
              the contact form on this website.
            </p>
          </section>
        </div>

        <p className="border-t border-border/15 pt-6 font-satoshi text-xs leading-relaxed text-muted-foreground">
          This policy is provided as general website information and is not
          legal advice.
        </p>
      </div>
    </section>
  );
}
