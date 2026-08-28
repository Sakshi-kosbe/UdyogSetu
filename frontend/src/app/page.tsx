import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/common/SectionHeader";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";

const capabilities = [
  {
    number: "01",
    title: "Discover Requirements",
    description:
      "Understand which approvals, registrations, licences, and compliance requirements may apply to your business.",
  },
  {
    number: "02",
    title: "Know Why They Apply",
    description:
      "View the business factors and structured rules behind every potentially applicable requirement.",
  },
  {
    number: "03",
    title: "Prepare Documents",
    description:
      "Follow organised document checklists and track application readiness before starting a workflow.",
  },
  {
    number: "04",
    title: "Track Applications",
    description:
      "Monitor simulated application stages, officer reviews, queries, responses, decisions, and follow-up actions.",
  },
];

const businessBenefits = [
  "Create a structured business profile",
  "Discover potentially applicable requirements",
  "Understand why each requirement applies",
  "Track document readiness",
  "Monitor application workflows",
  "Stay aware of compliance and renewals",
];

const officerBenefits = [
  "Review applications in a structured workflow",
  "Access relevant business and document information",
  "Raise and manage clarification queries",
  "Track workflow progress and pending actions",
  "Identify application bottlenecks",
  "Monitor compliance follow-up activities",
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero">
          <PageContainer>
            <div className="hero__content">
              <div className="hero__badge">
                <Badge variant="info">SIH 2026 Prototype</Badge>
              </div>

              <p className="eyebrow">
                INDUSTRIAL APPROVALS • COMPLIANCE • GOVERNMENT SUPPORT
              </p>

              <h1>
                A clearer path through
                <span> industrial approvals.</span>
              </h1>

              <p className="hero__description">
                Udyog Setu helps businesses understand what may apply to them,
                why it applies, and what they need to prepare before entering
                approval and compliance workflows.
              </p>

              <div className="hero__actions">
                <a href="#get-started">
                  <Button>Explore the Platform</Button>
                </a>

                <a href="#how-it-works">
                  <Button variant="outline">How It Works</Button>
                </a>
              </div>

              <div className="hero__trust">
                <span>Structured guidance</span>
                <span>Verified sources</span>
                <span>Transparent reasoning</span>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero-panel">
                <div className="hero-panel__header">
                  <div>
                    <p className="hero-panel__label">BUSINESS PROFILE</p>
                    <h3>ABC Manufacturing</h3>
                  </div>

                  <Badge variant="success">Profile Ready</Badge>
                </div>

                <div className="hero-panel__grid">
                  <div>
                    <span>Industry</span>
                    <strong>Manufacturing</strong>
                  </div>

                  <div>
                    <span>Business Size</span>
                    <strong>Medium</strong>
                  </div>

                  <div>
                    <span>Location</span>
                    <strong>Demo Region</strong>
                  </div>

                  <div>
                    <span>Activity</span>
                    <strong>Industrial Unit</strong>
                  </div>
                </div>

                <div className="hero-panel__result">
                  <div>
                    <span className="result-icon">✓</span>

                    <div>
                      <p>Requirement Discovery Complete</p>
                      <strong>8 potential requirements identified</strong>
                    </div>
                  </div>

                  <span className="result-arrow">→</span>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Core Differentiator */}
        <section className="differentiator">
          <PageContainer>
            <div className="differentiator__content">
              <div>
                <p className="eyebrow">THE CORE QUESTION</p>

                <h2>“What applies to my business?”</h2>

                <p>
                  Businesses often have to navigate fragmented information,
                  multiple departments, and complex eligibility conditions.
                  Udyog Setu starts with the business itself.
                </p>
              </div>

              <div className="differentiator__steps">
                <div className="mini-step">
                  <span>01</span>
                  <p>Understand your business</p>
                </div>

                <div className="mini-step">
                  <span>02</span>
                  <p>Evaluate structured rules</p>
                </div>

                <div className="mini-step">
                  <span>03</span>
                  <p>Explain potential requirements</p>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section">
          <PageContainer>
            <SectionHeader
              eyebrow="HOW IT WORKS"
              title="From business profile to compliance follow-up."
              description="A guided journey that brings requirement discovery, readiness, workflow visibility, and compliance tracking into one structured experience."
            />

            <div className="journey">
              <div className="journey__item">
                <span>1</span>
                <h3>Business Profile</h3>
                <p>Capture the key details of the business and project.</p>
              </div>

              <div className="journey__line" />

              <div className="journey__item">
                <span>2</span>
                <h3>Requirement Discovery</h3>
                <p>Identify potentially applicable requirements using rules.</p>
              </div>

              <div className="journey__line" />

              <div className="journey__item">
                <span>3</span>
                <h3>Readiness</h3>
                <p>Prepare documents and understand missing information.</p>
              </div>

              <div className="journey__line" />

              <div className="journey__item">
                <span>4</span>
                <h3>Workflow</h3>
                <p>Track review, queries, responses, and decisions.</p>
              </div>

              <div className="journey__line" />

              <div className="journey__item">
                <span>5</span>
                <h3>Compliance</h3>
                <p>Monitor follow-up obligations and renewal timelines.</p>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="section section--muted">
          <PageContainer>
            <SectionHeader
              eyebrow="PLATFORM CAPABILITIES"
              title="One foundation for the complete journey."
              description="The prototype is designed around reusable workflows that can support businesses, officers, and administrators."
            />

            <div className="capability-grid">
              {capabilities.map((capability) => (
                <Card key={capability.number}>
                  <span className="capability__number">
                    {capability.number}
                  </span>

                  <h3>{capability.title}</h3>

                  <p>{capability.description}</p>
                </Card>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* Users */}
        <section id="users" className="section">
          <PageContainer>
            <SectionHeader
              eyebrow="BUILT FOR BOTH SIDES"
              title="Designed for businesses and government officers."
              description="Different users need different views, but they should operate on a shared and transparent workflow foundation."
            />

            <div className="user-grid">
              <Card className="user-card">
                <Badge variant="info">BUSINESS USER</Badge>

                <h3>Know what to prepare.</h3>

                <p>
                  Move from uncertainty toward a structured understanding of
                  requirements, documents, applications, and compliance.
                </p>

                <ul className="feature-list">
                  {businessBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </Card>

              <Card className="user-card">
                <Badge variant="success">GOVERNMENT OFFICER</Badge>

                <h3>Review with better context.</h3>

                <p>
                  Work with organised application information, documents,
                  queries, workflow states, and operational insights.
                </p>

                <ul className="feature-list">
                  {officerBenefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </PageContainer>
        </section>

        {/* Demo Notice */}
        <section className="demo-section">
          <PageContainer>
            <div className="demo-notice">
              <Badge variant="warning">IMPORTANT</Badge>

              <div>
                <h3>Built as an SIH 2026 prototype.</h3>

                <p>
                  Udyog Setu currently demonstrates simulated workflows and
                  demo data. It does not replace government portals, perform
                  statutory decisions, or claim live government integration.
                </p>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* CTA */}
        <section id="get-started" className="cta-section">
          <PageContainer>
            <div className="cta">
              <div>
                <p className="eyebrow">START WITH THE BUSINESS</p>

                <h2>Build a clearer path to industrial readiness.</h2>

                <p>
                  The next stages of Udyog Setu will turn this interface
                  foundation into a working platform for requirement discovery,
                  application workflows, and compliance tracking.
                </p>
              </div>

              <Button>Explore Udyog Setu</Button>
            </div>
          </PageContainer>
        </section>
      </main>

      <Footer />
    </>
  );
}