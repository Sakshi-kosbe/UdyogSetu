"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


type DocumentItem = {
  id: string;
  name: string;
  description?: string;
  mandatory: boolean;
  status: string;
};


type Requirement = {
  id: string;
  name: string;
  category: string;
  description: string;
  authority: string;
  priority: string;

  why_applies: string[];

  documents: DocumentItem[];

  application_process?: string;
};


export default function RequirementDetailsPage() {

  const params = useParams();

  const requirementId = params.id as string;

  const [requirement, setRequirement] =
    useState<Requirement | null>(null);

  const [loading, setLoading] =
    useState(true);


  // TEMPORARY DEMO DATA

  useEffect(() => {

    const loadRequirement = async () => {

      try {

        /*
        PHASE 17 NOTE:

        Replace this demo data with your selected business ID.

        Example:

        const response = await fetch(
          `http://127.0.0.1:8000/requirements/${businessId}/${requirementId}`
        );

        const data = await response.json();
        setRequirement(data);
        */

        const demoRequirements: Record<
          string,
          Requirement
        > = {

          "gst-registration": {

            id: "gst-registration",

            name: "GST Registration",

            category: "Registration",

            description:
              "GST registration may be required for businesses meeting applicable turnover and business criteria.",

            authority:
              "Goods and Services Tax Network",

            priority:
              "High",

            why_applies: [

              "Your business profile indicates commercial activity.",

              "Businesses meeting applicable GST criteria may require registration.",

              "Final applicability should be verified using official GST rules."

            ],

            documents: [

              {
                id: "pan",

                name: "PAN Card",

                description:
                  "PAN details of the business or applicant.",

                mandatory: true,

                status: "ready"
              },

              {
                id: "address-proof",

                name: "Business Address Proof",

                description:
                  "Proof of the registered business address.",

                mandatory: true,

                status: "pending"
              },

              {
                id: "bank-details",

                name: "Bank Account Details",

                description:
                  "Business bank account information.",

                mandatory: true,

                status: "pending"
              }

            ],

            application_process:
              "Review official GST eligibility requirements and proceed through the official registration process."

          },


          "factory-license": {

            id: "factory-license",

            name: "Factory License",

            category:
              "Industrial Approval",

            description:
              "Industrial manufacturing establishments may require factory-related approvals depending on applicable laws.",

            authority:
              "Factory Inspectorate / State Authority",

            priority:
              "High",

            why_applies: [

              "Your business profile indicates manufacturing activity.",

              "Industrial establishments may be subject to factory regulations.",

              "Final applicability depends on applicable statutory and state rules."

            ],

            documents: [

              {
                id: "factory-layout",

                name:
                  "Factory Layout Plan",

                description:
                  "Prepared factory layout documentation.",

                mandatory: true,

                status: "pending"
              },

              {
                id: "ownership-proof",

                name:
                  "Land / Building Ownership Proof",

                description:
                  "Ownership or legal occupancy documents.",

                mandatory: true,

                status: "ready"
              },

              {
                id: "safety-plan",

                name:
                  "Safety Documentation",

                description:
                  "Relevant workplace safety documentation.",

                mandatory: true,

                status: "missing"
              }

            ],

            application_process:
              "Review applicable factory regulations and follow the official application process."

          }

        };


        setRequirement(
          demoRequirements[requirementId]
          || demoRequirements["gst-registration"]
        );

      }

      catch (error) {

        console.error(
          "Failed to load requirement",
          error
        );

      }

      finally {

        setLoading(false);

      }

    };


    loadRequirement();

  }, [requirementId]);


  const updateDocumentStatus = (

    documentId: string,

    status: string

  ) => {

    if (!requirement) return;


    const updatedDocuments =
      requirement.documents.map(
        (document) => {

          if (
            document.id === documentId
          ) {

            return {
              ...document,
              status
            };

          }

          return document;

        }
      );


    setRequirement({

      ...requirement,

      documents:
        updatedDocuments

    });

  };


  if (loading) {

    return (

      <main className="details-page">

        <p>Loading requirement...</p>

      </main>

    );

  }


  if (!requirement) {

    return (

      <main className="details-page">

        <h1>
          Requirement not found
        </h1>

        <Link href="/requirements">

          ← Back to Requirements

        </Link>

      </main>

    );

  }


  const readyDocuments =
    requirement.documents.filter(
      (document) =>
        document.status === "ready"
    ).length;


  const totalDocuments =
    requirement.documents.length;


  const readiness =
    totalDocuments > 0
      ? Math.round(
          (
            readyDocuments /
            totalDocuments
          ) * 100
        )
      : 0;


  return (

    <main className="details-page">


      {/* HEADER */}

      <section className="details-header">

        <Link
          href="/requirements"
          className="back-link"
        >

          ← Back to Requirements

        </Link>


        <div className="requirement-title-row">

          <div>

            <p className="section-eyebrow">

              {requirement.category}

            </p>


            <h1>

              {requirement.name}

            </h1>


            <p className="details-description">

              {requirement.description}

            </p>

          </div>


          <span
            className={`priority-badge ${requirement.priority.toLowerCase()}`}
          >

            {requirement.priority} Priority

          </span>

        </div>


        <div className="requirement-meta">

          <div>

            <span>Authority</span>

            <strong>

              {requirement.authority}

            </strong>

          </div>


          <div>

            <span>Category</span>

            <strong>

              {requirement.category}

            </strong>

          </div>


          <div>

            <span>Documents Ready</span>

            <strong>

              {readyDocuments}
              /
              {totalDocuments}

            </strong>

          </div>

        </div>

      </section>


      {/* WHY APPLIES */}

      <section className="details-card">

        <div className="card-heading">

          <div>

            <p className="section-eyebrow">

              EXPLAINABLE GUIDANCE

            </p>


            <h2>

              Why this may apply

            </h2>

          </div>


          <span className="card-icon">

            💡

          </span>

        </div>


        <div className="reason-list">

          {requirement.why_applies.map(
            (reason, index) => (

              <div
                key={index}
                className="reason-item"
              >

                <span>

                  ✓

                </span>


                <p>

                  {reason}

                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* DOCUMENT CHECKLIST */}

      <section className="details-card">


        <div className="document-header">


          <div>

            <p className="section-eyebrow">

              APPLICATION PREPARATION

            </p>


            <h2>

              Document Checklist

            </h2>


            <p>

              Track the documents you have prepared
              before proceeding to the official
              application process.

            </p>

          </div>


          <div className="readiness-box">

            <strong>

              {readiness}%

            </strong>


            <span>

              Ready

            </span>

          </div>


        </div>


        <div className="readiness-progress">

          <div
            className="readiness-fill"
            style={{
              width: `${readiness}%`
            }}
          />

        </div>


        <div className="document-list">

          {requirement.documents.map(
            (document) => (

              <div
                key={document.id}
                className="document-item"
              >


                <div className="document-main">


                  <div
                    className={`document-status ${document.status}`}
                  >

                    {document.status === "ready"
                      ? "✓"
                      : document.status === "missing"
                      ? "!"
                      : "○"}

                  </div>


                  <div>

                    <div className="document-name-row">

                      <h3>

                        {document.name}

                      </h3>


                      {document.mandatory && (

                        <span className="mandatory-badge">

                          Required

                        </span>

                      )}

                    </div>


                    <p>

                      {document.description}

                    </p>

                  </div>


                </div>


                <select

                  value={document.status}

                  onChange={(event) =>

                    updateDocumentStatus(

                      document.id,

                      event.target.value

                    )

                  }

                >

                  <option value="pending">

                    Pending

                  </option>


                  <option value="ready">

                    Ready

                  </option>


                  <option value="missing">

                    Missing

                  </option>

                </select>


              </div>

            )
          )}

        </div>

      </section>


      {/* APPLICATION PROCESS */}

      <section className="details-card">

        <div className="card-heading">

          <div>

            <p className="section-eyebrow">

              NEXT STEP

            </p>


            <h2>

              Application Guidance

            </h2>

          </div>


          <span className="card-icon">

            → 

          </span>

        </div>


        <p className="application-guidance">

          {requirement.application_process}

        </p>


        <div className="guidance-note">

          <span>

            ℹ

          </span>


          <p>

            Udyog Setu provides structured guidance
            and readiness support. Official applications
            and statutory decisions remain with the
            relevant government authorities.

          </p>

        </div>

      </section>


      {/* NEXT ACTION */}

      <section className="next-action-card">

        <div>

          <p className="section-eyebrow">

            YOUR NEXT ACTION

          </p>


          <h2>

            Continue your industrial journey

          </h2>


          <p>

            Review your document readiness and
            continue exploring other potentially
            applicable requirements.

          </p>

        </div>


        <Link
          href="/requirements"
          className="primary-button"
        >

          View All Requirements →

        </Link>
        <Link
  href={`/requirements/${requirement.id}`}
>
  View Details →
</Link>

      </section>


    </main>

  );

}