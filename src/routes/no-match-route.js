import React from "react";
import { PageLayout } from "../components/structure";

export default function NoMatchRoute() {
  return (
    <PageLayout>
      <div className="p-20">
        <h3>No page is associated with this route</h3>
      </div>
    </PageLayout>
  );
}
