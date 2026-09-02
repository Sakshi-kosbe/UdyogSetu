import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Navigation */}

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

      {/* Hero Section */}

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-badge">
              SMART INDUSTRIAL GUIDANCE
            </p>

            <h2>
              Simplifying Industrial
              <span> Approvals & Compliance</span>
            </h2>

            <p className="hero-description">
              Udyog Setu helps businesses understand which
              industrial requirements may apply to them, prepare
              for applications, track compliance obligations and
              discover relevant government support schemes.
            </p>

            <div className="hero-actions">
              <Link
                href="/businesses"
                className="primary-button hero-primary"
              >
                Create Business Profile
              </Link>

              <a
                href="#workflow"
                className="secondary-button hero-secondary"
              >
                Explore Workflow
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon">✓</span>

              <p>
                Structured rules determine applicability.
                Intelligent assistance helps explain and guide
                the user through the process.
              </p>
            </div>
          </div>

          {/* Dashboard Preview */}

          <div className="hero-dashboard">
            <div className="dashboard-window">
              <div className="dashboard-topbar">
                <div className="window-dots">
                  <span />
                  <span />
                  <span />
                </div>

                <p>Udyog Setu Dashboard</p>
              </div>

              <div className="dashboard-body">
                <div className="dashboard-sidebar">
                  <div className="sidebar-logo">
                    U
                  </div>

                  <div className="sidebar-item active">
                    ▣
                  </div>

                  <div className="sidebar-item">
                    🔍
                  </div>

                  <div className="sidebar-item">
                    ✓
                  </div>

                  <div className="sidebar-item">
                    🎯
                  </div>

                  <div className="sidebar-item">
                    ⚙
                  </div>
                </div>

                <div className="dashboard-main">
                  <div className="dashboard-heading">
                    <div>
                      <p>WELCOME TO</p>

                      <h3>
                        Your Industrial Journey
                      </h3>
                    </div>

                    <div className="profile-circle">
                      U
                    </div>
                  </div>

                  <div className="dashboard-stats">
                    <div className="dashboard-stat">
                      <span className="stat-icon">
                        🏭
                      </span>

                      <div>
                        <strong>1</strong>

                        <p>Business Profile</p>
                      </div>
                    </div>

                    <div className="dashboard-stat">
                      <span className="stat-icon">
                        ✓
                      </span>

                      <div>
                        <strong>8</strong>

                        <p>Potential Requirements</p>
                      </div>
                    </div>

                    <div className="dashboard-stat">
                      <span className="stat-icon">
                        🎯
                      </span>

                      <div>
                        <strong>5</strong>

                        <p>Possible Schemes</p>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-progress">
                    <div className="progress-header">
                      <div>
                        <p>APPLICATION READINESS</p>

                        <h4>
                          Overall Progress
                        </h4>
                      </div>

                      <strong>65%</strong>
                    </div>

                    <div className="progress-bar">
                      <div className="progress-fill" />
                    </div>
                  </div>

                  <div className="dashboard-requirements">
                    <div className="requirements-header">
                      <h4>
                        Suggested Next Steps
                      </h4>

                      <Link href="/requirements">
                        View All →
                      </Link>
                    </div>

                    <div className="requirement-row">
                      <div className="requirement-status pending">
                        !
                      </div>

                      <div>
                        <strong>
                          Review Applicable Requirements
                        </strong>

                        <p>
                          Check industrial approvals and
                          registrations that may apply to your
                          business.
                        </p>
                      </div>
                    </div>

                    <div className="requirement-row">
                      <div className="requirement-status complete">
                        ✓
                      </div>

                      <div>
                        <strong>
                          Business Profile Completed
                        </strong>

                        <p>
                          Your business information is ready for
                          requirement discovery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}

      <section
        id="features"
        className="features-section"
      >
        <div className="section-heading">
          <p className="section-eyebrow">
            ONE PLATFORM. COMPLETE GUIDANCE.
          </p>

          <h2>
            Everything your business needs to
            navigate industrial processes
          </h2>

          <p>
            From understanding business requirements to tracking
            compliance and discovering support schemes, Udyog
            Setu provides structured guidance throughout the
            industrial journey.
          </p>
        </div>

        <div className="features-grid">
          <Link
            href="/businesses"
            className="feature-card feature-link"
          >
            <div className="feature-icon">
              🏢
            </div>

            <h3>
              Business Profile
            </h3>

            <p>
              Create and manage a structured business profile
              that becomes the foundation for personalized
              guidance.
            </p>

            <span className="feature-action">
              Manage Business →
            </span>
          </Link>

          <Link
            href="/requirements"
            className="feature-card feature-link"
          >
            <div className="feature-icon">
              🔍
            </div>

            <h3>
              Requirement Discovery
            </h3>

            <p>
              Identify potentially applicable approvals,
              registrations and industrial requirements based
              on structured business information.
            </p>

            <span className="feature-action">
              Discover Requirements →
            </span>
          </Link>

          <article className="feature-card">
            <div className="feature-icon">
              📋
            </div>

            <h3>
              Document Readiness
            </h3>

            <p>
              Understand the documents that may be required
              and prepare application information before
              proceeding to official portals.
            </p>
          </article>

          <Link
            href="/compliance"
            className="feature-card feature-link"
          >
            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Compliance Tracking
            </h3>

            <p>
              Monitor compliance records, upcoming renewals,
              deadlines and important business obligations.
            </p>

            <span className="feature-action">
              Track Compliance →
            </span>
          </Link>

          <Link
            href="/schemes"
            className="feature-card feature-link"
          >
            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Scheme Discovery
            </h3>

            <p>
              Discover government schemes that may be relevant
              to your business profile, sector and location.
            </p>

            <span className="feature-action">
              Explore Schemes →
            </span>
          </Link>

          <article className="feature-card">
            <div className="feature-icon">
              💬
            </div>

            <h3>
              Intelligent Guidance
            </h3>

            <p>
              Receive clear explanations and structured
              guidance while keeping regulatory applicability
              decisions based on defined rules.
            </p>
          </article>
        </div>
      </section>

      {/* Workflow */}

      <section
        id="workflow"
        className="workflow-section"
      >
        <div className="section-heading">
          <p className="section-eyebrow">
            HOW UDYOG SETU WORKS
          </p>

          <h2>
            Your journey from business setup
            to compliance readiness
          </h2>

          <p>
            Udyog Setu connects the important stages of the
            industrial journey into one structured guidance
            workflow.
          </p>
        </div>

        <div className="workflow-grid">
          <div className="workflow-step">
            <span>01</span>

            <h3>
              Create Profile
            </h3>

            <p>
              Add your business details, industry, location
              and industrial activity.
            </p>
          </div>

          <div className="workflow-step">
            <span>02</span>

            <h3>
              Discover Requirements
            </h3>

            <p>
              Use structured rules to identify requirements
              that may apply to your business.
            </p>
          </div>

          <div className="workflow-step">
            <span>03</span>

            <h3>
              Prepare & Review
            </h3>

            <p>
              Understand required information and prepare
              your business for the next application steps.
            </p>
          </div>

          <div className="workflow-step">
            <span>04</span>

            <h3>
              Track Compliance
            </h3>

            <p>
              Monitor obligations, upcoming renewals and
              important compliance deadlines.
            </p>
          </div>

          <div className="workflow-step">
            <span>05</span>

            <h3>
              Discover Support
            </h3>

            <p>
              Explore government schemes that may be relevant
              to your business profile.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Principle */}

      <section className="platform-principle-section">
        <div className="section-heading">
          <p className="section-eyebrow">
            BUILT FOR RESPONSIBLE GUIDANCE
          </p>

          <h2>
            Guidance should be clear,
            explainable and trustworthy
          </h2>

          <p>
            Udyog Setu is designed to help businesses understand
            industrial processes. It does not replace government
            authorities, official portals or statutory decision
            making.
          </p>
        </div>

        <div className="principle-grid">
          <div className="principle-card">
            <span>01</span>

            <h3>
              Structured Rules
            </h3>

            <p>
              Applicability is evaluated through defined
              business and regulatory criteria.
            </p>
          </div>

          <div className="principle-card">
            <span>02</span>

            <h3>
              Explainable Results
            </h3>

            <p>
              Users should understand why a requirement or
              recommendation may be relevant.
            </p>
          </div>

          <div className="principle-card">
            <span>03</span>

            <h3>
              Official Process Awareness
            </h3>

            <p>
              Udyog Setu guides users toward the appropriate
              next steps and official processes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="cta-section">
        <div>
          <p className="section-eyebrow">
            START YOUR JOURNEY
          </p>

          <h2>
            Build your business profile
            and discover what may apply to you.
          </h2>

          <p>
            Start with your business information and let
            Udyog Setu guide you through requirements,
            compliance and relevant support opportunities.
          </p>
        </div>

        <Link
          href="/businesses"
          className="primary-button cta-button"
        >
          Create Business Profile →
        </Link>
      </section>

      {/* Professional Footer */}

      <footer className="footer">
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Main Footer Content */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(260px, 1.5fr) repeat(3, 1fr)",
              gap: "50px",
              paddingBottom: "40px",
              borderBottom: "1px solid #e4e8ef",
            }}
          >
            {/* Brand */}

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    background: "#1769e0",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: 800,
                  }}
                >
                  U
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      color: "#172033",
                      fontSize: "18px",
                    }}
                  >
                    Udyog Setu
                  </h3>

                  <p
                    style={{
                      margin: "3px 0 0",
                      fontSize: "11px",
                      color: "#687386",
                    }}
                  >
                    Industrial Guidance Platform
                  </p>
                </div>
              </div>

              <p
                style={{
                  maxWidth: "330px",
                  margin: 0,
                  lineHeight: 1.7,
                  fontSize: "13px",
                }}
              >
                Intelligent guidance for businesses navigating
                industrial requirements, compliance obligations
                and government support opportunities.
              </p>
            </div>

            {/* Platform */}

            <div>
              <h4
                style={{
                  margin: "0 0 18px",
                  color: "#172033",
                  fontSize: "14px",
                }}
              >
                Platform
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Link href="/businesses">
                  Business Profiles
                </Link>

                <Link href="/requirements">
                  Requirements
                </Link>

                <Link href="/compliance">
                  Compliance
                </Link>

                <Link href="/schemes">
                  Government Schemes
                </Link>
              </div>
            </div>

            {/* Journey */}

            <div>
              <h4
                style={{
                  margin: "0 0 18px",
                  color: "#172033",
                  fontSize: "14px",
                }}
              >
                Your Journey
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Link href="/businesses">
                  Create Profile
                </Link>

                <Link href="/requirements">
                  Discover Requirements
                </Link>

                <Link href="/compliance">
                  Track Compliance
                </Link>

                <Link href="/schemes">
                  Discover Support
                </Link>
              </div>
            </div>

            {/* Responsible Guidance */}

            <div>
              <h4
                style={{
                  margin: "0 0 18px",
                  color: "#172033",
                  fontSize: "14px",
                }}
              >
                Our Approach
              </h4>

              <p
                style={{
                  margin: 0,
                  lineHeight: 1.7,
                  fontSize: "13px",
                }}
              >
                Structured rules help determine potential
                applicability. Intelligent assistance helps
                explain processes and guide users toward
                appropriate next steps.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "18px",
                  fontSize: "12px",
                  color: "#16a36a",
                  fontWeight: 600,
                }}
              >
                <span>✓</span>

                <span>Clear & Responsible Guidance</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              paddingTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
              }}
            >
              © 2026 Udyog Setu. Industrial Guidance Platform.
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#687386",
              }}
            >
              Built for streamlined industrial guidance,
              readiness and compliance.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}