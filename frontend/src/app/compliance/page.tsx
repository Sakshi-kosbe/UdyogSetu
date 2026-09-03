"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

type ComplianceRecord = {
  id: string;
  business_id: string;

  title: string;
  category: string;
  description?: string;

  status: string;

  authority?: string;

  due_date?: string;
  renewal_date?: string;
};

const API_URL = API_BASE_URL;

export default function CompliancePage() {
  const [complianceRecords, setComplianceRecords] =
    useState<ComplianceRecord[]>([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    business_id: "demo-business-001",

    title: "",
    category: "",
    description: "",

    status: "pending",

    authority: "",

    due_date: "",
    renewal_date: "",
  });

  const loadCompliance = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      `${API_URL}/compliance/`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to load compliance records: ${response.status}`
      );
    }

    const data = await response.json();

    setComplianceRecords(
      Array.isArray(data) ? data : []
    );
  } catch (error) {
    console.error(
      "Failed to load compliance records:",
      error
    );

    setComplianceRecords([]);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  try {
    const response = await fetch(
      `${API_URL}/compliance/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "Backend error:",
        errorText
      );

      throw new Error(
        `Failed to save compliance record: ${response.status}`
      );
    }

    await response.json();

    setFormData({
      business_id: "demo-business-001",

      title: "",
      category: "",
      description: "",

      status: "pending",

      authority: "",

      due_date: "",
      renewal_date: "",
    });

    setShowForm(false);

    await loadCompliance();

    alert(
      "Compliance record saved successfully!"
    );
  } catch (error) {
    console.error(
      "Failed to create compliance record:",
      error
    );

    alert(
      "Unable to save the compliance record. Check whether the backend is running."
    );
  }
};

  const updateStatus = async (
  id: string,
  status: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/compliance/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update compliance: ${response.status}`
      );
    }

    await loadCompliance();
  } catch (error) {
    console.error(
      "Failed to update compliance:",
      error
    );

    alert(
      "Unable to update compliance status."
    );
  }
};

  const deleteCompliance = async (
  id: string
) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this compliance record?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/compliance/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete compliance: ${response.status}`
      );
    }

    await loadCompliance();

    alert(
      "Compliance record deleted successfully!"
    );
  } catch (error) {
    console.error(
      "Failed to delete compliance:",
      error
    );

    alert(
      "Unable to delete compliance record."
    );
  }
};

  const getStatusClass = (
    status: string
  ) => {
    return `status-badge ${status}`;
  };

  const total = complianceRecords.length;

  const pending =
    complianceRecords.filter(
      (record) =>
        record.status === "pending"
    ).length;

  const active =
    complianceRecords.filter(
      (record) =>
        record.status === "active"
    ).length;

  const completed =
    complianceRecords.filter(
      (record) =>
        record.status === "completed"
    ).length;

  const overdue =
    complianceRecords.filter(
      (record) =>
        record.status === "overdue"
    ).length;

  return (
    <main className="compliance-page">
      <section className="compliance-hero">
        <div>
          <p className="page-eyebrow">
            COMPLIANCE MANAGEMENT
          </p>

          <h1>
            Track Your Business Compliance
          </h1>

          <p>
            Monitor industrial obligations, licenses,
            registrations and important compliance activities
            from one place.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "Close Form"
            : "+ Add Compliance"}
        </button>
      </section>

      {/* Statistics */}

      <section className="compliance-stats">
        <div className="compliance-stat-card">
          <span>📋</span>

          <div>
            <strong>{total}</strong>

            <p>Total Records</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <span>⏳</span>

          <div>
            <strong>{pending}</strong>

            <p>Pending</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <span>✓</span>

          <div>
            <strong>{active}</strong>

            <p>Active</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <span>✓</span>

          <div>
            <strong>{completed}</strong>

            <p>Completed</p>
          </div>
        </div>

        <div className="compliance-stat-card">
          <span>⚠</span>

          <div>
            <strong>{overdue}</strong>

            <p>Overdue</p>
          </div>
        </div>
      </section>

      {/* Add Form */}

      {showForm && (
        <section className="compliance-form-section">
          <h2>
            Add Compliance Record
          </h2>

          <form
            className="compliance-form"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <div>
                <label>
                  Compliance Title
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Factory License"
                  required
                />
              </div>

              <div>
                <label>
                  Category
                </label>

                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="License / Registration"
                  required
                />
              </div>

              <div>
                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="overdue">
                    Overdue
                  </option>
                </select>
              </div>

              <div>
                <label>
                  Authority
                </label>

                <input
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                  placeholder="Government Authority"
                />
              </div>

              <div>
                <label>
                  Due Date
                </label>

                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>
                  Renewal Date
                </label>

                <input
                  type="date"
                  name="renewal_date"
                  value={formData.renewal_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this compliance obligation..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="primary-button"
            >
              Save Compliance Record
            </button>
          </form>
        </section>
      )}

      {/* Compliance Records */}

      <section className="compliance-records">
        <div className="records-heading">
          <div>
            <p className="page-eyebrow">
              YOUR RECORDS
            </p>

            <h2>
              Compliance Obligations
            </h2>
          </div>

          <p>
            {total} record
            {total !== 1 ? "s" : ""}
          </p>
        </div>

        {loading ? (
          <div className="empty-state">
            Loading compliance records...
          </div>
        ) : complianceRecords.length === 0 ? (
          <div className="empty-state">
            <span>📋</span>

            <h3>
              No Compliance Records Yet
            </h3>

            <p>
              Start by adding a compliance obligation,
              license or registration.
            </p>
          </div>
        ) : (
          <div className="compliance-grid">
            {complianceRecords.map(
              (record) => (
                <article
                  className="compliance-card"
                  key={record.id}
                >
                  <div className="compliance-card-header">
                    <div>
                      <p className="compliance-category">
                        {record.category}
                      </p>

                      <h3>
                        {record.title}
                      </h3>
                    </div>

                    <span
                      className={getStatusClass(
                        record.status
                      )}
                    >
                      {record.status}
                    </span>
                  </div>

                  {record.description && (
                    <p className="compliance-description">
                      {record.description}
                    </p>
                  )}

                  <div className="compliance-details">
                    {record.authority && (
                      <p>
                        <strong>
                          Authority:
                        </strong>

                        {record.authority}
                      </p>
                    )}

                    {record.due_date && (
                      <p>
                        <strong>
                          Due Date:
                        </strong>

                        {record.due_date}
                      </p>
                    )}

                    {record.renewal_date && (
                      <p>
                        <strong>
                          Renewal:
                        </strong>

                        {record.renewal_date}
                      </p>
                    )}
                  </div>

                  <div className="compliance-actions">
                    <select
                      value={record.status}
                      onChange={(event) =>
                        updateStatus(
                          record.id,
                          event.target.value
                        )
                      }
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="active">
                        Active
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                      <option value="overdue">
                        Overdue
                      </option>
                    </select>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteCompliance(record.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}