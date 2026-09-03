"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  Business,
} from "@/lib/business";

import {
  getBusinesses,
} from "@/lib/business-api";

import {
  DocumentReadiness,
} from "@/lib/document";

import {
  getDocumentReadiness,
} from "@/lib/document-api";


export default function ReadinessPage() {

  const [
    businesses,
    setBusinesses,
  ] = useState<Business[]>([]);

  const [
    selectedBusinessId,
    setSelectedBusinessId,
  ] = useState("");

  const [
    readiness,
    setReadiness,
  ] = useState<DocumentReadiness | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    loadingReadiness,
    setLoadingReadiness,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");


  async function loadBusinesses() {

    try {

      setLoading(true);

      setError("");

      const data =
        await getBusinesses();

      setBusinesses(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load businesses."
      );

    } finally {

      setLoading(false);

    }

  }


  async function loadReadiness(
    businessId: string
  ) {

    if (!businessId) {

      setReadiness(null);

      return;

    }

    try {

      setLoadingReadiness(true);

      setError("");

      const data =
        await getDocumentReadiness(
          businessId
        );

      setReadiness(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load application readiness."
      );

    } finally {

      setLoadingReadiness(false);

    }

  }


  useEffect(() => {

    loadBusinesses();

  }, []);


  const selectedBusiness =
    businesses.find(
      (business) =>
        business.id ===
        selectedBusinessId
    );


  const readinessLabel = () => {

    if (!readiness) {
      return "Not Started";
    }

    if (
      readiness.readiness_percentage === 100
    ) {
      return "Ready";
    }

    if (
      readiness.readiness_percentage >= 50
    ) {
      return "In Progress";
    }

    if (
      readiness.readiness_percentage > 0
    ) {
      return "Getting Started";
    }

    return "Not Started";

  };


  if (loading) {

    return (

      <main className="readiness-page">

        <div className="readiness-loading">

          Loading businesses...

        </div>

      </main>

    );

  }


  return (

    <main className="readiness-page">

      {/* HERO */}

      <section className="readiness-hero">

        <div>

          <p className="section-eyebrow">

            APPLICATION READINESS

          </p>

          <h1>

            Are You Ready to Apply?

          </h1>

          <p>

            Track your document preparation and
            understand how ready your business is
            for the next stage of its industrial
            journey.

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

              See what is complete and what
              still needs preparation.

            </p>

          </div>

        </div>

      </section>


      {/* BUSINESS SELECTOR */}

      <section className="readiness-business-selector">

        <div>

          <label>

            Select Business Profile

          </label>

          <select
            value={selectedBusinessId}
            onChange={(event) => {

              const businessId =
                event.target.value;

              setSelectedBusinessId(
                businessId
              );

              loadReadiness(
                businessId
              );

            }}
          >

            <option value="">

              Select your business

            </option>


            {businesses.map(
              (business) => (

                <option
                  key={business.id}
                  value={business.id}
                >

                  {business.name}

                </option>

              )
            )}

          </select>

        </div>

      </section>


      {error && (

        <div className="readiness-error">

          {error}

        </div>

      )}


      {!selectedBusinessId && (

        <section className="readiness-empty-state">

          <div className="empty-state-icon">

            📊

          </div>

          <h2>

            Select a Business

          </h2>

          <p>

            Choose a business profile to view
            its document readiness and
            preparation progress.

          </p>

        </section>

      )}


      {loadingReadiness && (

        <div className="readiness-loading">

          Calculating application readiness...

        </div>

      )}


      {readiness &&
        selectedBusiness &&
        !loadingReadiness && (

          <>

            {/* OVERALL READINESS */}

            <section className="overall-readiness-card">

              <div className="overall-readiness-content">

                <div>

                  <p className="section-eyebrow">

                    OVERALL APPLICATION READINESS

                  </p>

                  <h2>

                    {selectedBusiness.name}

                  </h2>

                  <p>

                    Complete the remaining
                    documents to improve your
                    application preparation.

                  </p>

                </div>


                <div className="readiness-score">

                  <strong>

                    {readiness.readiness_percentage}%

                  </strong>

                  <span>

                    {readinessLabel()}

                  </span>

                </div>

              </div>


              <div className="large-progress-bar">

                <div
                  className="large-progress-fill"
                  style={{

                    width:
                      `${readiness.readiness_percentage}%`,

                  }}
                />

              </div>


              <div className="readiness-stats">

                <div className="readiness-stat">

                  <strong>

                    {readiness.total_documents}

                  </strong>

                  <span>

                    Total Documents

                  </span>

                </div>


                <div className="readiness-stat success">

                  <strong>

                    {readiness.completed_documents}

                  </strong>

                  <span>

                    Prepared

                  </span>

                </div>


                <div className="readiness-stat danger">

                  <strong>

                    {readiness.missing_documents}

                  </strong>

                  <span>

                    Missing

                  </span>

                </div>

              </div>

            </section>


            {/* READINESS EXPLANATION */}

            <section className="readiness-next-step">

              <div>

                <p className="section-eyebrow">

                  NEXT STEP

                </p>

                <h2>

                  Continue preparing your business

                </h2>

                <p>

                  Review your document checklist
                  and update the preparation
                  status of each required item.

                </p>

              </div>


              <Link
                href="/documents"
                className="primary-button"
              >

                Manage Documents →

              </Link>

            </section>

          </>

        )}

    </main>

  );

}