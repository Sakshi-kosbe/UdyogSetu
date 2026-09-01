"use client";

import { useEffect, useState } from "react";

import {
  DashboardStats,
  getDashboardStats,
} from "@/lib/api/dashboard";

export default function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const data =
          await getDashboardStats();

        setStats(data);

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Dashboard unavailable</h2>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <section>
      <h1>Udyog Setu Dashboard</h1>

      <p>
        Real-time overview of your industrial
        approvals and compliance workflow.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <DashboardCard
          title="Businesses"
          value={stats?.businesses || 0}
        />

        <DashboardCard
          title="Requirements"
          value={stats?.requirements || 0}
        />

        <DashboardCard
          title="Applications"
          value={stats?.applications || 0}
        />

        <DashboardCard
          title="Compliance Records"
          value={stats?.compliances || 0}
        />

        <DashboardCard
          title="Overdue Compliance"
          value={stats?.overdueCompliance || 0}
        />

        <DashboardCard
          title="Government Schemes"
          value={stats?.schemes || 0}
        />
      </div>
    </section>
  );
}

interface DashboardCardProps {
  title: string;
  value: number;
}

function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <p>{title}</p>

      <h2>{value}</h2>
    </div>
  );
}