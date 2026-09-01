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

            <a href="#features">Features</a>

            <a href="#workflow">Workflow</a>
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
              Udyog Setu helps businesses understand what
              requirements may apply to them, prepare documents,
              track compliance, and discover relevant government
              support services.
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
                Rules determine applicability.
                AI assists with guidance and explanations.
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
                    ◈
                  </div>

                  <div className="sidebar-item">
                    ✓
                  </div>

                  <div className="sidebar-item">
                    ⚙
                  </div>
                </div>

                <div className="dashboard-main">
                  <div className="dashboard-heading">
                    <div>
                      <p>WELCOME BACK</p>

                      <h3>
                        Your Industrial Journey
                      </h3>
                    </div>

                    <div className="profile-circle">
                      B
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
                        📄
                      </span>

                      <div>
                        <strong>12</strong>

                        <p>Documents</p>
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

                      <span>
                        View All →
                      </span>
                    </div>

                    <div className="requirement-row">
                      <div className="requirement-status pending">
                        !
                      </div>

                      <div>
                        <strong>
                          Review Required Approvals
                        </strong>

                        <p>
                          Check potentially applicable
                          industrial requirements.
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
                          Your business information is ready.
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
            From discovering requirements to tracking compliance,
            Udyog Setu provides structured guidance throughout
            the business journey.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">
              🏢
            </div>

            <h3>
              Business Profile
            </h3>

            <p>
              Create a structured business profile that helps
              determine relevant industrial requirements.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              🔍
            </div>

            <h3>
              Requirement Discovery
            </h3>

            <p>
              Identify potentially applicable approvals,
              registrations and regulatory requirements.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              📋
            </div>

            <h3>
              Document Readiness
            </h3>

            <p>
              Understand document requirements and prepare
              applications before visiting official portals.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Compliance Tracking
            </h3>

            <p>
              Track compliance records, upcoming renewals,
              deadlines and important business obligations.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Scheme Discovery
            </h3>

            <p>
              Discover government schemes that may be relevant
              to your business profile and industry.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              💬
            </div>

            <h3>
              Intelligent Guidance
            </h3>

            <p>
              Get clear explanations and guidance while keeping
              regulatory decisions based on structured rules.
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
        </div>

        <div className="workflow-grid">
          <div className="workflow-step">
            <span>01</span>

            <h3>
              Create Profile
            </h3>

            <p>
              Add your business details and industrial activity.
            </p>
          </div>

          <div className="workflow-step">
            <span>02</span>

            <h3>
              Discover Requirements
            </h3>

            <p>
              Understand what may apply to your business.
            </p>
          </div>

          <div className="workflow-step">
            <span>03</span>

            <h3>
              Prepare Documents
            </h3>

            <p>
              Check application readiness before proceeding.
            </p>
          </div>

          <div className="workflow-step">
            <span>04</span>

            <h3>
              Track Compliance
            </h3>

            <p>
              Monitor obligations, renewals and next steps.
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
            and discover what applies to you.
          </h2>

          <p>
            Start with your business information and let
            Udyog Setu guide you through the next steps.
          </p>
        </div>

        <Link
          href="/businesses"
          className="primary-button cta-button"
        >
          Create Business Profile →
        </Link>
      </section>

      {/* Footer */}

      <footer className="footer">
        <div>
          <h3>
            Udyog Setu
          </h3>

          <p>
            Intelligent Industrial Guidance Platform
          </p>
        </div>

        <p>
          Built for streamlined industrial guidance,
          readiness and compliance.
        </p>
      </footer>
    </main>
  );
}