import Link from "next/link";

import PageContainer from "@/components/layout/PageContainer";

export default function Footer() {
  return (
    <footer className="site-footer">
      <PageContainer>
        <div className="footer__content">
          <div className="footer__brand">
            <Link href="/" className="navbar__brand">
              <span className="navbar__brand-mark">U</span>

              <span>
                <strong>Udyog Setu</strong>
                <small>Industrial Guidance Platform</small>
              </span>
            </Link>

            <p>
              Intelligent guidance for industrial approvals, compliance, and
              government support services.
            </p>
          </div>

          <div className="footer__links">
            <div>
              <h4>Platform</h4>
              <a href="#how-it-works">How It Works</a>
              <a href="#capabilities">Capabilities</a>
            </div>

            <div>
              <h4>For Users</h4>
              <a href="#users">Businesses</a>
              <a href="#users">Government Officers</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Udyog Setu. SIH 2026 Prototype.</p>

          <p className="footer__notice">
            Demo platform. Workflows and data are simulated.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}