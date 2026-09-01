"use client";

import { useEffect, useState } from "react";

import { Business } from "@/lib/business";

import {
  getBusinesses,
} from "@/lib/business-api";

import {
  discoverRequirements,
} from "@/lib/requirement-api";

import {
  Requirement,
} from "@/lib/requirement";


export default function RequirementsPage() {

  const [businesses, setBusinesses] =
    useState<Business[]>([]);

  const [selectedBusinessId,
    setSelectedBusinessId] =
    useState("");

  const [requirements,
    setRequirements] =
    useState<Requirement[]>([]);

  const [loadingBusinesses,
    setLoadingBusinesses] =
    useState(true);

  const [discovering,
    setDiscovering] =
    useState(false);

  const [error,
    setError] =
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
        "Unable to load businesses. Make sure the backend is running."
      );

    } finally {

      setLoadingBusinesses(false);

    }

  }


  useEffect(() => {

    loadBusinesses();

  }, []);


  async function handleDiscovery() {

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

      const data =
        await discoverRequirements(
          selectedBusinessId
        );

      setRequirements(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to discover requirements. Please check the backend API."
      );

    } finally {

      setDiscovering(false);

    }

  }


  const selectedBusiness =
    businesses.find(
      (business) =>
        business.id === selectedBusinessId
    );


  return (

    <main className="requirements-page">

      {/* HERO */}

      <section className="requirements-hero">

        <div className="requirements-hero-content">

          <div className="requirements-hero-text">

            <p className="eyebrow">
              INTELLIGENT REQUIREMENT DISCOVERY
            </p>

            <h1>
              What Applies to
              <span> My Business?</span>
            </h1>

            <p className="requirements-description">
              Select a business profile and discover potentially
              applicable industrial approvals, registrations,
              licences and compliance requirements.
            </p>

          </div>


          <div className="requirements-hero-info">

            <div className="hero-info-icon">
              🔍
            </div>

            <div>

              <strong>
                Smart Requirement Discovery
              </strong>

              <p>
                Structured rules help identify requirements
                that may apply to your business.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* DISCOVERY */}

      <section className="requirements-content">

        <div className="requirements-discovery-layout">

          {/* SELECT BUSINESS */}

          <div className="business-selection-card">

            <div className="card-heading">

              <div className="card-icon">
                🏢
              </div>

              <div>

                <h2>
                  Select Business Profile
                </h2>

                <p>
                  Choose the business you want to analyse.
                </p>

              </div>

            </div>


            {loadingBusinesses ? (

              <p className="status-message">
                Loading business profiles...
              </p>

            ) : (

              <>

                <div className="requirements-select-wrapper">

                  <label>
                    Business Profile
                  </label>

                  <select
                    value={selectedBusinessId}
                    onChange={(event) =>
                      setSelectedBusinessId(
                        event.target.value
                      )
                    }
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

                          {business.name} — {business.industry}

                        </option>

                      )
                    )}

                  </select>

                </div>


                <button
                  type="button"
                  className="primary-button discover-button"
                  onClick={handleDiscovery}
                  disabled={
                    discovering ||
                    !selectedBusinessId
                  }
                >

                  {discovering
                    ? "Discovering Requirements..."
                    : "Discover Requirements →"}

                </button>

              </>

            )}

          </div>


          {/* SELECTED BUSINESS */}

          <div className="selected-profile-card">

            {selectedBusiness ? (

              <>

                <p className="eyebrow">
                  SELECTED BUSINESS
                </p>

                <h2>
                  {selectedBusiness.name}
                </h2>

                <p className="selected-profile-subtitle">
                  Business profile information used for
                  requirement discovery.
                </p>


                <div className="selected-profile-details">

                  <div className="profile-detail">

                    <span>
                      Industry
                    </span>

                    <strong>
                      {selectedBusiness.industry}
                    </strong>

                  </div>


                  <div className="profile-detail">

                    <span>
                      Business Size
                    </span>

                    <strong>
                      {selectedBusiness.business_size}
                    </strong>

                  </div>


                  <div className="profile-detail">

                    <span>
                      Location
                    </span>

                    <strong>
                      {selectedBusiness.location}
                    </strong>

                  </div>


                  <div className="profile-detail">

                    <span>
                      Activity
                    </span>

                    <strong>
                      {selectedBusiness.activity}
                    </strong>

                  </div>

                </div>

              </>

            ) : (

              <div className="no-business-selected">

                <div className="empty-profile-icon">
                  🏢
                </div>

                <h2>
                  No Business Selected
                </h2>

                <p>
                  Select a business profile to view its
                  information and discover applicable
                  requirements.
                </p>

              </div>

            )}

          </div>

        </div>


        {error && (

          <div className="error-message">

            {error}

          </div>

        )}


        {/* RESULTS */}

        <section className="requirements-results-section">

          <div className="requirements-results-heading">

            <div>

              <p className="eyebrow">
                DISCOVERY RESULTS
              </p>

              <h2>
                Potentially Applicable Requirements
              </h2>

              <p>
                Review the requirements identified based
                on your selected business profile.
              </p>

            </div>


            {requirements.length > 0 && (

              <div className="requirements-found-badge">

                <strong>
                  {requirements.length}
                </strong>

                <span>
                  Requirements Found
                </span>

              </div>

            )}

          </div>


          {!discovering &&
            requirements.length === 0 &&
            selectedBusinessId && (

              <div className="requirements-empty-state">

                <div className="empty-state-icon">
                  🔍
                </div>

                <h3>
                  Ready to Discover Requirements
                </h3>

                <p>

                  Click the "Discover Requirements" button
                  to analyse your business profile.

                </p>

              </div>

            )}


          {discovering && (

            <div className="requirements-loading-state">

              <div className="loading-spinner" />

              <p>
                Analysing your business profile and
                discovering potentially applicable
                requirements...
              </p>

            </div>

          )}


          <div className="requirements-grid">

            {requirements.map(
              (requirement) => (

                <article
                  key={requirement.id}
                  className="discovered-requirement-card"
                >

                  <div className="requirement-card-top">

                    <span className="requirement-category-badge">

                      {requirement.category ||
                        "Requirement"}

                    </span>


                    {requirement.status && (

                      <span className="requirement-status-badge">

                        {requirement.status}

                      </span>

                    )}

                  </div>


                  <h3>

                    {requirement.name}

                  </h3>


                  {requirement.description && (

                    <p className="requirement-description">

                      {requirement.description}

                    </p>

                  )}


                  {requirement.authority && (

                    <div className="requirement-authority">

                      <span>
                        Authority
                      </span>

                      <strong>

                        {requirement.authority}

                      </strong>

                    </div>

                  )}


                  {(requirement.applicability_reason ||
                    requirement.reason) && (

                    <div className="why-requirement-applies">

                      <div className="why-applies-heading">

                        <span>
                          ✓
                        </span>

                        <h4>
                          Why this may apply
                        </h4>

                      </div>

                      <p>

                        {requirement.applicability_reason ||
                          requirement.reason}

                      </p>

                    </div>

                  )}

                </article>

              )
            )}

          </div>

        </section>

      </section>

    </main>

  );

}