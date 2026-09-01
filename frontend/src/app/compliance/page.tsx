import Link from "next/link";

export default function CompliancePage() {
  return (
    <main className="feature-page">
      <nav className="navbar">
        <div className="nav-container">
          <Link href="/" className="brand">
            <div className="brand-icon">U</div>

            <div>
              <h1>Udyog Setu</h1>
              <span>Industrial Guidance Platform</span>
            </div>
          </Link>

          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/businesses">Businesses</Link>
            <Link href="/requirements">Requirements</Link>
            <Link href="/compliance">Compliance</Link>
            <Link href="/schemes">Schemes</Link>
          </div>

          <Link href="/businesses" className="nav-button">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="feature-hero">
        <p className="section-eyebrow">
          COMPLIANCE MANAGEMENT
        </p>

        <h1>
          Stay Ahead of Your
          <span> Compliance Obligations</span>
        </h1>

        <p>
          Track industrial compliance requirements, monitor
          important obligations, and stay prepared for upcoming
          renewals and deadlines.
        </p>
      </section>

      <section className="feature-content">
        <div className="feature-info-grid">

          <article className="info-card">
            <div className="info-icon">✓</div>

            <h2>Compliance Tracking</h2>

            <p>
              Monitor important compliance obligations related
              to your industrial business.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">📅</div>

            <h2>Renewal Monitoring</h2>

            <p>
              Keep track of important renewal dates and
              upcoming compliance activities.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">🔔</div>

            <h2>Important Deadlines</h2>

            <p>
              Stay informed about deadlines that may require
              attention from your business.
            </p>
          </article>

        </div>

        <div className="coming-soon-card">
          <p className="section-eyebrow">
            COMPLIANCE DASHBOARD
          </p>

          <h2>
            Select a Business to Track Compliance
          </h2>

          <p>
            Compliance tracking will use your business profile
            and applicable requirements to provide structured
            visibility into your compliance journey.
          </p>

          <Link
            href="/businesses"
            className="primary-button"
          >
            View Business Profiles →
          </Link>
        </div>
      </section>
    </main>
  );
}