"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DocumentStatus = {
  id: string;
  name: string;
  completed: boolean;
};

type RequirementReadiness = {
  requirement_id: string;
  requirement_name: string;
  status: string;
  readiness_percentage: number;
  documents: DocumentStatus[];
};

type ReadinessData = {
  business_id: string;
  overall_readiness: number;
  total_requirements: number;
  ready_requirements: number;
  in_progress_requirements: number;
  missing_documents: number;
  requirements: RequirementReadiness[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";


export default function ReadinessPage() {
  const [data, setData] =
    useState<ReadinessData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const businessId = "demo-business-1";


  async function loadReadiness() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/readiness/${businessId}`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load application readiness."
        );
      }

      const readinessData =
        await response.json();

      setData(readinessData);

    } catch (error) {
      console.error(error);

      setError(
        "Unable to load application readiness. Please check the backend API."
      );

    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadReadiness();
  }, []);


  async function updateDocument(
    documentId: string,
    completed: boolean
  ) {
    try {
      const response = await fetch(
        `${API_URL}/api/readiness/${businessId}/documents/${documentId}?completed=${completed}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to update document status."
        );
      }

      await loadReadiness();

    } catch (error) {
      console.error(error);

      alert(
        "Unable to update document status."
      );
    }
  }


  if (loading) {
    return (
      <main className="readiness-page">
        <div className="readiness-loading">
          Loading application readiness...
        </div>
      </main>
    );
  }


  return (
    <main className="readiness-page">

      {/* Header */}

      <section className="readiness-hero">

        <div>

          <p className="section-eyebrow">
            APPLICATION READINESS
          </p>

          <h1>
            Are You Ready to Apply?
          </h1>

          <p>
            Track your document preparation and understand
            how ready your business is for the next stage
            of the application process.
          </p>

        </div>


        <div className="readiness-hero-card">

          <div className="readiness-icon">
            ✓
          </div>

          <div>

            <strong>
              Smart Readiness Tracking
            </strong>

            <p>
              See what is complete and what still needs
              preparation.
            </p>

          </div>

        </div>

      </section>


      {error && (

        <div className="readiness-error">
          {error}
        </div>

      )}


      {data && (

        <>

          {/* Overall Readiness */}

          <section className="overall-readiness-card">

            <div className="overall-readiness-content">

              <div>

                <p className="section-eyebrow">
                  OVERALL APPLICATION READINESS
                </p>

                <h2>
                  Your Business Preparation Progress
                </h2>

                <p>
                  Complete the remaining documents to
                  improve your application readiness.
                </p>

              </div>


              <div className="readiness-score">

                <strong>
                  {data.overall_readiness}%
                </strong>

                <span>
                  Ready
                </span>

              </div>

            </div>


            <div className="large-progress-bar">

              <div
                className="large-progress-fill"
                style={{
                  width:
                    `${data.overall_readiness}%`,
                }}
              />

            </div>


            <div className="readiness-stats">

              <div className="readiness-stat">

                <strong>
                  {data.total_requirements}
                </strong>

                <span>
                  Total Requirements
                </span>

              </div>


              <div className="readiness-stat success">

                <strong>
                  {data.ready_requirements}
                </strong>

                <span>
                  Ready
                </span>

              </div>


              <div className="readiness-stat warning">

                <strong>
                  {data.in_progress_requirements}
                </strong>

                <span>
                  In Progress
                </span>

              </div>


              <div className="readiness-stat danger">

                <strong>
                  {data.missing_documents}
                </strong>

                <span>
                  Missing Documents
                </span>

              </div>

            </div>

          </section>


          {/* Requirement Readiness */}

          <section className="requirement-readiness-section">

            <div className="readiness-section-heading">

              <div>

                <p className="section-eyebrow">
                  REQUIREMENT-WISE PROGRESS
                </p>

                <h2>
                  Application Preparation Status
                </h2>

                <p>
                  Review each requirement and complete
                  the remaining preparation items.
                </p>

              </div>


              <Link
                href="/requirements"
                className="secondary-button"
              >
                View Requirements →
              </Link>

            </div>


            <div className="readiness-requirements-list">

              {data.requirements.map(
                (requirement) => (

                  <article
                    className="readiness-requirement-card"
                    key={
                      requirement.requirement_id
                    }
                  >

                    <div className="requirement-readiness-header">

                      <div>

                        <h3>
                          {
                            requirement.requirement_name
                          }
                        </h3>

                        <span
                          className={`readiness-status ${
                            requirement.status
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )
                          }`}
                        >
                          {requirement.status}
                        </span>

                      </div>


                      <div className="small-readiness-score">

                        <strong>
                          {
                            requirement.readiness_percentage
                          }%
                        </strong>

                        <span>
                          Complete
                        </span>

                      </div>

                    </div>


                    <div className="small-progress-bar">

                      <div
                        className="small-progress-fill"
                        style={{
                          width:
                            `${requirement.readiness_percentage}%`,
                        }}
                      />

                    </div>


                    <div className="document-checklist">

                      <h4>
                        Document Checklist
                      </h4>


                      {requirement.documents.map(
                        (document) => (

                          <label
                            className={`document-item ${
                              document.completed
                                ? "completed"
                                : ""
                            }`}
                            key={document.id}
                          >

                            <input
                              type="checkbox"
                              checked={
                                document.completed
                              }
                              onChange={(event) =>
                                updateDocument(
                                  document.id,
                                  event.target.checked
                                )
                              }
                            />

                            <span className="custom-checkbox">
                              {document.completed
                                ? "✓"
                                : ""}
                            </span>

                            <span>
                              {document.name}
                            </span>

                          </label>

                        )
                      )}

                    </div>

                  </article>

                )
              )}

            </div>

          </section>


          {/* Next Step */}

          <section className="readiness-next-step">

            <div>

              <p className="section-eyebrow">
                NEXT STEP
              </p>

              <h2>
                Continue preparing your business
              </h2>

              <p>
                Complete the remaining documents and
                review applicable requirements before
                proceeding with official application
                processes.
              </p>

            </div>


            <Link
              href="/requirements"
              className="primary-button"
            >
              Review Requirements →
            </Link>

          </section>

        </>

      )}

    </main>
  );
}