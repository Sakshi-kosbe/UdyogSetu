import Link from "next/link";

import Button from "@/components/ui/Button";
import PageContainer from "@/components/layout/PageContainer";

export default function Navbar() {
  return (
    <header className="site-header">
      <PageContainer>
        <nav className="navbar">
          <Link href="/" className="navbar__brand">
            <span className="navbar__brand-mark">U</span>

            <span>
              <strong>Udyog Setu</strong>
              <small>Industrial Guidance Platform</small>
            </span>
          </Link>

          <div className="navbar__links">
            <a href="#how-it-works">How It Works</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#users">Who It Helps</a>
          </div>

          <a href="#get-started" className="navbar__cta">
            <Button>Get Started</Button>
          </a>
        </nav>
      </PageContainer>
    </header>
  );
}