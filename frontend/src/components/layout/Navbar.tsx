import Link from "next/link";

import Button from "@/components/ui/Button";
import PageContainer from "@/components/layout/PageContainer";

export default function Navbar() {
  return (
    <header className="navbar">
      <PageContainer>
        <nav className="navbar__content">
          <Link href="/" className="navbar__brand">
            <span className="navbar__brand-mark">U</span>

            <span>
              <strong>Udyog Setu</strong>
              <small>Industrial Guidance Platform</small>
            </span>
          </Link>

          <div className="navbar__actions">
            <Link href="#components">
              Explore UI
            </Link>

            <Button size="sm">
              Get Started
            </Button>
          </div>
        </nav>
      </PageContainer>
    </header>
  );
}