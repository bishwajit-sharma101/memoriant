import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard | MEMORIANT Bookmarks",
  description: "Manage your private Pocket vault references, tag bookmarks, and publish elements to your bio link.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
