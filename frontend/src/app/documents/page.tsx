"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Business,
} from "@/lib/business";

import {
  getBusinesses,
} from "@/lib/business-api";

import {
  BusinessDocument,
  DocumentStatus,
} from "@/lib/document";

import {
  createDocument,
  deleteDocument,
  getBusinessDocuments,
  updateDocumentStatus,
} from "@/lib/document-api";


export default function DocumentsPage() {

  const [
    businesses,
    setBusinesses,
  ] = useState<Business[]>([]);

  const [
    selectedBusinessId,
    setSelectedBusinessId,
  ] = useState("");

  const [
    documents,
    setDocuments,
  ] = useState<BusinessDocument[]>([]);

  const [
    loadingBusinesses,
    setLoadingBusinesses,
  ] = useState(true);

  const [
    loadingDocuments,
    setLoadingDocuments,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    documentName,
    setDocumentName,
  ] = useState("");

  const [
    requirementCode,
    setRequirementCode,
  ] = useState("");

  const [
    documentType,
    setDocumentType,
  ] = useState("");


  async function loadBusinesses() {

    try {

      setLoadingBusinesses(true);

      const data =
        await getBusinesses();

      setBusinesses(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load businesses."
      );

    } finally {

      setLoadingBusinesses(false);

    }

  }


  async function loadDocuments(
    businessId: string
  ) {

    if (!businessId) {

      setDocuments([]);

      return;

    }

    try {

      setLoadingDocuments(true);

      setError("");

      const data =
        await getBusinessDocuments(
          businessId
        );

      setDocuments(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load business documents."
      );

    } finally {

      setLoadingDocuments(false);

    }

  }


  useEffect(() => {

    loadBusinesses();

  }, []);


  useEffect(() => {

    loadDocuments(
      selectedBusinessId
    );

  }, [
    selectedBusinessId,
  ]);


  async function handleCreateDocument(
    event: React.FormEvent
  ) {

    event.preventDefault();

    if (
      !selectedBusinessId ||
      !documentName ||
      !requirementCode
    ) {

      setError(
        "Please complete all required fields."
      );

      return;

    }

    try {

      setError("");

      await createDocument({
        business_id:
          selectedBusinessId,

        requirement_code:
          requirementCode,

        document_name:
          documentName,

        document_type:
          documentType || undefined,
      });

      setDocumentName("");

      setRequirementCode("");

      setDocumentType("");

      setShowForm(false);

      await loadDocuments(
        selectedBusinessId
      );

    } catch (error) {

      console.error(error);

      setError(
        "Unable to create document."
      );

    }

  }


  async function handleStatusChange(
    documentId: string,
    status: DocumentStatus
  ) {

    try {

      await updateDocumentStatus(
        documentId,
        status
      );

      await loadDocuments(
        selectedBusinessId
      );

    } catch (error) {

      console.error(error);

      setError(
        "Unable to update document status."
      );

    }

  }


  async function handleDelete(
    documentId: string
  ) {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this document?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await deleteDocument(
        documentId
      );

      await loadDocuments(
        selectedBusinessId
      );

    } catch (error) {

      console.error(error);

      setError(
        "Unable to delete document."
      );

    }

  }


  const selectedBusiness =
    businesses.find(
      (business) =>
        business.id ===
        selectedBusinessId
    );


  return (

    <main className="documents-page">

      {/* HERO */}

      <section className="documents-hero">

        <div>

          <p className="eyebrow">
            DOCUMENT READINESS
          </p>

          <h1>
            Prepare Your
            <span> Documents</span>
          </h1>

          <p>
            Organise and track documents required
            for your business requirements and
            application preparation.
          </p>

        </div>


        <div className="documents-hero-info">

          <div className="hero-info-icon">
            📋
          </div>

          <div>

            <strong>
              Smart Document Tracking
            </strong>

            <p>
              See what is missing, uploaded,
              under review and ready.
            </p>

          </div>

        </div>

      </section>


      <section className="documents-content">

        {/* BUSINESS SELECTION */}

        <div className="documents-toolbar">

          <div>

            <label>
              Select Business
            </label>

            <select
              value={
                selectedBusinessId
              }
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

                    {business.name}

                  </option>

                )
              )}

            </select>

          </div>


          <button
            className="primary-button"
            onClick={() =>
              setShowForm(true)
            }
            disabled={
              !selectedBusinessId
            }
          >

            + Add Document

          </button>

        </div>


        {loadingBusinesses && (

          <p className="status-message">
            Loading businesses...
          </p>

        )}


        {selectedBusiness && (

          <section className="document-business-card">

            <div>

              <p className="eyebrow">
                SELECTED BUSINESS
              </p>

              <h2>
                {selectedBusiness.name}
              </h2>

            </div>


            <div className="business-mini-details">

              <span>
                {selectedBusiness.industry}
              </span>

              <span>
                {selectedBusiness.location}
              </span>

              <span>
                {selectedBusiness.business_size}
              </span>

            </div>

          </section>

        )}


        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        {/* CREATE FORM */}

        {showForm && (

          <section className="document-form-card">

            <div className="form-heading">

              <div>

                <p className="eyebrow">
                  ADD DOCUMENT
                </p>

                <h2>
                  Add a Document Record
                </h2>

              </div>


              <button
                className="close-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                handleCreateDocument
              }
            >

              <div className="document-form-grid">

                <div>

                  <label>
                    Document Name *
                  </label>

                  <input
                    value={documentName}
                    onChange={(event) =>
                      setDocumentName(
                        event.target.value
                      )
                    }
                    placeholder="Example: PAN Card"
                  />

                </div>


                <div>

                  <label>
                    Requirement Code *
                  </label>

                  <input
                    value={requirementCode}
                    onChange={(event) =>
                      setRequirementCode(
                        event.target.value
                      )
                    }
                    placeholder="Example: FACTORY_REG"
                  />

                </div>


                <div>

                  <label>
                    Document Type
                  </label>

                  <input
                    value={documentType}
                    onChange={(event) =>
                      setDocumentType(
                        event.target.value
                      )
                    }
                    placeholder="Example: Identity Document"
                  />

                </div>

              </div>


              <button
                type="submit"
                className="primary-button"
              >

                Add Document

              </button>

            </form>

          </section>

        )}


        {/* DOCUMENT LIST */}

        <section className="documents-list-section">

          <div className="section-heading-row">

            <div>

              <p className="eyebrow">
                DOCUMENT CHECKLIST
              </p>

              <h2>
                Your Document Preparation
              </h2>

              <p>
                Track the preparation status of
                important business documents.
              </p>

            </div>


            {selectedBusinessId && (

              <Link
                href={`/readiness?business=${selectedBusinessId}`}
                className="secondary-button"
              >

                Check Readiness →

              </Link>

            )}

          </div>


          {loadingDocuments && (

            <div className="documents-loading">
              Loading documents...
            </div>

          )}


          {!loadingDocuments &&
            selectedBusinessId &&
            documents.length === 0 && (

              <div className="documents-empty-state">

                <div>
                  📄
                </div>

                <h3>
                  No Documents Added Yet
                </h3>

                <p>
                  Add document records to start
                  tracking your application
                  preparation.
                </p>

              </div>

            )}


          <div className="documents-grid">

            {documents.map(
              (document) => (

                <article
                  key={document.id}
                  className="document-card"
                >

                  <div className="document-card-header">

                    <div>

                      <span className="document-type-badge">

                        {document.document_type ||
                          "Document"}

                      </span>


                      <h3>
                        {document.document_name}
                      </h3>

                    </div>


                    <span
                      className={`document-status ${document.status.toLowerCase()}`}
                    >

                      {document.status.replace(
                        "_",
                        " "
                      )}

                    </span>

                  </div>


                  <div className="document-requirement">

                    <span>
                      Requirement
                    </span>

                    <strong>
                      {document.requirement_code}
                    </strong>

                  </div>


                  <div className="document-actions">

                    <select
                      value={document.status}
                      onChange={(event) =>
                        handleStatusChange(
                          document.id,
                          event.target.value as DocumentStatus
                        )
                      }
                    >

                      <option value="MISSING">
                        Missing
                      </option>

                      <option value="UPLOADED">
                        Uploaded
                      </option>

                      <option value="UNDER_CHECK">
                        Under Check
                      </option>

                      <option value="READY">
                        Ready
                      </option>

                    </select>


                    <button
                      className="delete-document-button"
                      onClick={() =>
                        handleDelete(
                          document.id
                        )
                      }
                    >

                      Delete

                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        </section>

      </section>

    </main>

  );

}