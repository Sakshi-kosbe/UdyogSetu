import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";

import SectionHeader from "@/components/common/SectionHeader";

const industryOptions = [
  {
    label: "Select industry",
    value: "",
  },
  {
    label: "Manufacturing",
    value: "manufacturing",
  },
  {
    label: "Textiles",
    value: "textiles",
  },
  {
    label: "Information Technology",
    value: "information-technology",
  },
  {
    label: "Food Processing",
    value: "food-processing",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <PageContainer>
            <div className="hero__content">
              <span className="hero__badge">
                Udyog Setu Platform Foundation
              </span>

              <h1>
                Building a simpler path through industrial approvals.
              </h1>

              <p>
                A reusable interface foundation for businesses,
                government officers, and administrators.
              </p>

              <div className="hero__actions">
                <Button size="lg">
                  Explore Components
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </PageContainer>
        </section>

        <section id="components" className="section">
          <PageContainer>
            <SectionHeader
              eyebrow="UI Foundation"
              title="Reusable Components"
              description="These components will be reused across the business, officer, and admin interfaces."
            />

            <div className="component-grid">
              <Card>
                <h3>Buttons</h3>

                <div className="component-stack">
                  <Button>Primary Action</Button>

                  <Button variant="secondary">
                    Secondary
                  </Button>

                  <Button variant="outline">
                    Outline
                  </Button>

                  <Button variant="danger">
                    Danger
                  </Button>
                </div>
              </Card>

              <Card>
                <h3>Status Badges</h3>

                <div className="badge-row">
                  <Badge variant="success">
                    Approved
                  </Badge>

                  <Badge variant="warning">
                    Pending Review
                  </Badge>

                  <Badge variant="danger">
                    Action Required
                  </Badge>

                  <Badge variant="info">
                    Information
                  </Badge>

                  <Badge>
                    Draft
                  </Badge>
                </div>
              </Card>

              <Card>
                <h3>Form Controls</h3>

                <div className="form-stack">
                  <Input
                    label="Business Name"
                    name="businessName"
                    placeholder="Enter your business name"
                  />

                  <Select
                    label="Industry"
                    name="industry"
                    options={industryOptions}
                    defaultValue=""
                  />
                </div>
              </Card>

              <Card>
                <h3>Sample Requirement</h3>

                <Badge variant="warning">
                  Potentially Applicable
                </Badge>

                <h4 className="requirement-title">
                  Factory Registration
                </h4>

                <p>
                  This card demonstrates how requirement information
                  can be presented later in the platform.
                </p>

                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Card>
            </div>
          </PageContainer>
        </section>
      </main>
    </>
  );
}