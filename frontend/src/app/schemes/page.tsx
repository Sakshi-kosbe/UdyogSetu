import Link from "next/link";

export default function SchemesPage() {
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
          GOVERNMENT SUPPORT DISCOVERY
        </p>

        <h1>
          Discover Government Schemes
          <span> Relevant to Your Business</span>
        </h1>

        <p>
          Explore government support schemes that may be relevant
          to your business profile, industry, location and
          business characteristics.
        </p>
      </section>

      <section className="feature-content">

        <div className="feature-info-grid">

          <article className="info-card">
            <div className="info-icon">🎯</div>

            <h2>Personalized Discovery</h2>

            <p>
              Identify schemes that may match your business
              profile and industrial sector.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">🏭</div>

            <h2>Industry Matching</h2>

            <p>
              Match available government schemes with your
              industry and business characteristics.
            </p>
          </article>

          <article className="info-card">
            <div className="info-icon">📍</div>

            <h2>Location Awareness</h2>

            <p>
              Consider location and state-level applicability
              while discovering relevant schemes.
            </p>
          </article>

        </div>

        <div className="coming-soon-card">
          <p className="section-eyebrow">
            SCHEME RECOMMENDATION SYSTEM
          </p>

          <h2>
            Find Schemes for Your Business
          </h2>

          <p>
            Start by creating or selecting a business profile.
            Udyog Setu can then use structured matching logic
            to identify potentially relevant government support
            schemes.
          </p>

          <Link
            href="/businesses"
            className="primary-button"
          >
            Select a Business →
          </Link>
        </div>

      </section>
    </main>
  );
}