"use client";

import { FormEvent, useEffect, useState } from "react";

import { Business } from "@/lib/business";

import {
  createBusiness,
  getBusinesses,
} from "@/lib/business-api";


export default function BusinessesPage() {

  const [businesses, setBusinesses] =
    useState<Business[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");


  const [name, setName] =
    useState("");

  const [industry, setIndustry] =
    useState("");

  const [businessSize, setBusinessSize] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [activity, setActivity] =
    useState("");


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
        "Unable to load businesses. Make sure the backend is running."
      );

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    loadBusinesses();

  }, []);


  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    try {

      setSubmitting(true);
      setError("");

      const newBusiness =
        await createBusiness({
          name,
          industry,
          business_size: businessSize,
          location,
          activity,
        });


      setBusinesses(
        (currentBusinesses) => [
          ...currentBusinesses,
          newBusiness,
        ]
      );


      setName("");
      setIndustry("");
      setBusinessSize("");
      setLocation("");
      setActivity("");

    } catch (error) {

      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to create the business."
      );

    } finally {

      setSubmitting(false);

    }
  }


  return (

    <main className="business-page">

      <section className="business-header">

        <p className="eyebrow">
          UDYOG SETU PLATFORM
        </p>

        <h1>
          Business Profiles
        </h1>

        <p>
          Create and manage industrial business profiles.
          Data is stored through the Udyog Setu backend.
        </p>

      </section>


      <section className="business-layout">


        <div className="business-form-card">

          <h2>
            Create Business
          </h2>


          <form onSubmit={handleSubmit}>


            <div className="form-group">

              <label htmlFor="name">
                Business Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="ABC Manufacturing Pvt Ltd"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="industry">
                Industry
              </label>

              <select
                id="industry"
                value={industry}
                onChange={(event) =>
                  setIndustry(event.target.value)
                }
                required
              >

                <option value="">
                  Select industry
                </option>

                <option value="Manufacturing">
                  Manufacturing
                </option>

                <option value="Textiles">
                  Textiles
                </option>

                <option value="Information Technology">
                  Information Technology
                </option>

                <option value="Food Processing">
                  Food Processing
                </option>

                <option value="Automobile">
                  Automobile
                </option>

              </select>

            </div>


            <div className="form-group">

              <label htmlFor="businessSize">
                Business Size
              </label>

              <select
                id="businessSize"
                value={businessSize}
                onChange={(event) =>
                  setBusinessSize(event.target.value)
                }
                required
              >

                <option value="">
                  Select business size
                </option>

                <option value="Micro">
                  Micro
                </option>

                <option value="Small">
                  Small
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Large">
                  Large
                </option>

              </select>

            </div>


            <div className="form-group">

              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                placeholder="City or Region"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                required
              />

            </div>


            <div className="form-group">

              <label htmlFor="activity">
                Activity
              </label>

              <input
                id="activity"
                type="text"
                placeholder="Industrial Unit"
                value={activity}
                onChange={(event) =>
                  setActivity(event.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >

              {submitting
                ? "Creating..."
                : "Create Business"}

            </button>

          </form>

        </div>


        <div className="business-list-card">


          <div className="list-header">

            <div>

              <p className="eyebrow">
                DATABASE RECORDS
              </p>

              <h2>
                Businesses
              </h2>

            </div>


            <button
              type="button"
              className="secondary-button"
              onClick={loadBusinesses}
            >
              Refresh
            </button>

          </div>


          {loading && (

            <p className="status-message">
              Loading businesses...
            </p>

          )}


          {error && (

            <div className="error-message">
              {error}
            </div>

          )}


          {!loading &&
            !error &&
            businesses.length === 0 && (

              <p className="status-message">
                No businesses found. Create your first
                business profile.
              </p>

            )}


          <div className="business-list">

            {businesses.map((business) => (

              <article
                key={business.id}
                className="business-card"
              >

                <div className="business-card-header">

                  <div>

                    <p className="eyebrow">
                      {business.industry}
                    </p>

                    <h3>
                      {business.name}
                    </h3>

                  </div>


                  <span className="business-size-badge">
                    {business.business_size}
                  </span>

                </div>


                <div className="business-details">

                  <div>

                    <span>
                      Location
                    </span>

                    <strong>
                      {business.location}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Activity
                    </span>

                    <strong>
                      {business.activity}
                    </strong>

                  </div>

                </div>


                <p className="business-id">
                  ID: {business.id}
                </p>

              </article>

            ))}

          </div>

        </div>

      </section>

    </main>

  );
}