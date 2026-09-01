"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getBusinesses,
} from "@/lib/business-api";

import {
  Business,
} from "@/lib/business";

import {
  discoverRequirements,
} from "@/lib/requirement-api";

import {
  Requirement,
} from "@/lib/requirement";


export default function RequirementsPage() {

  const [businesses, setBusinesses] =
    useState<Business[]>([]);

  const [selectedBusinessId, setSelectedBusinessId] =
    useState("");

  const [requirements, setRequirements] =
    useState<Requirement[]>([]);

  const [loadingBusinesses, setLoadingBusinesses] =
    useState(true);

  const [discovering, setDiscovering] =
    useState(false);

  const [error, setError] =
    useState("");


  async function loadBusinesses() {

    try {

      setLoadingBusinesses(true);

      setError("");

      const data =
        await getBusinesses();

      setBusinesses(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load businesses. Please make sure the backend is running."
      );

    } finally {

      setLoadingBusinesses(false);

    }
  }


  useEffect(() => {

    loadBusinesses();

  }, []);


  async function handleDiscover() {

    if (!selectedBusinessId) {

      setError(
        "Please select a business first."
      );

      return;
    }

    try {

      setDiscovering(true);

      setError("");

      setRequirements([]);

      const result =
        await discoverRequirements(
          selectedBusinessId
        );

      const discoveredRequirements =
        result.requirements ||
        result.matched_requirements ||
        [];

      setRequirements(
        discoveredRequirements
      );

    } catch (error) {

      console.error(error);

      setError(
        "Unable to discover requirements. Please check the backend connection."
      );

    } finally {

      setDiscovering(false);

    }
  }


  return (

    <main className="requirements-page">

      <section className="requirements-header">

        <p className="eyebrow">
          INTELLIGENT DISCOVERY
        </p>

        <h1>
          What applies to my business?
        </h1>

        <p>
          Select your business profile and let
          Udyog Setu identify potentially
          applicable industrial requirements
          using structured regulatory rules.
        </p>

      </section>


      <section className="discovery-card">

        <div className="discovery-controls">

          <div className="form-group">

            <label htmlFor="business">

              Select Business

            </label>

            <select
              id="business"
              value={selectedBusinessId}
              onChange={(event) =>
                setSelectedBusinessId(
                  event.target.value
                )
              }
              disabled={loadingBusinesses}
            >

              <option value="">

                Select a business

              </option>


              {businesses.map((business) => (

                <option
                  key={business.id}
                  value={business.id}
                >

                  {business.name}

                </option>

              ))}

            </select>

          </div>


          <button
            type="button"
            className="discover-button"
            onClick={handleDiscover}
            disabled={
              discovering ||
              loadingBusinesses
            }
          >

            {discovering
              ? "Discovering..."
              : "Discover Requirements"}

          </button>

        </div>


        {loadingBusinesses && (

          <p className="status-message">

            Loading business profiles...

          </p>

        )}


        {error && (

          <div className="error-message">

            {error}

          </div>

        )}

      </section>


      <section className="requirements-results">

        <div className="results-header">

          <div>

            <p className="eyebrow">

              DISCOVERY RESULTS

            </p>

            <h2>

              Applicable Requirements

            </h2>

          </div>


          {requirements.length > 0 && (

            <span className="results-count">

              {requirements.length} Found

            </span>

          )}

        </div>


        {!discovering &&
          requirements.length === 0 &&
          selectedBusinessId && (

            <div className="empty-results">

              <h3>

                Ready to discover requirements

              </h3>

              <p>

                Click Discover Requirements to
                identify potentially applicable
                approvals and compliance
                requirements.

              </p>

            </div>

          )}


        <div className="requirements-grid">

          {requirements.map(
            (requirement, index) => (

              <article
                key={
                  requirement.id ||
                  requirement.requirement_id ||
                  index
                }
                className="requirement-card"
              >

                <div className="requirement-card-header">

                  <span className="requirement-number">

                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}

                  </span>


                  <span className="requirement-category">

                    {requirement.category ||
                      "Requirement"}

                  </span>

                </div>


                <h3>

                  {requirement.name ||
                    requirement.title ||
                    "Unnamed Requirement"}

                </h3>


                {requirement.description && (

                  <p className="requirement-description">

                    {requirement.description}

                  </p>

                )}


                <div className="requirement-info">

                  {requirement.authority && (

                    <div>

                      <span>

                        Authority

                      </span>

                      <strong>

                        {requirement.authority}

                      </strong>

                    </div>

                  )}


                  {requirement.priority && (

                    <div>

                      <span>

                        Priority

                      </span>

                      <strong>

                        {requirement.priority}

                      </strong>

                    </div>

                  )}

                </div>


                {(requirement.applicability_reason ||
                  requirement.why_applies) && (

                  <div className="why-applies">

                    <strong>

                      Why it may apply

                    </strong>

                    <p>

                      {requirement.applicability_reason ||
                        requirement.why_applies}

                    </p>

                  </div>

                )}

              </article>

            )
          )}

        </div>

      </section>


      <section className="disclaimer-card">

        <strong>

          Important

        </strong>

        <p>

          Udyog Setu provides structured
          guidance based on configured
          regulatory information and rules.
          Final statutory applicability and
          approval decisions remain with the
          relevant government authorities.

        </p>

      </section>

    </main>

  );
}