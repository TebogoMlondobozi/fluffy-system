import React from "react";

import { PageLayout } from "../../components/structure";
import Catalog from "./catalog";

export default function Shop() {
  return (
    <PageLayout>
      <div className="pb-10 flex flex-col items-center">
        <h1>DRY CLEANING &amp; LAUNDRY SERVICES</h1>
      </div>

      <div className="flex justify-center items-center">
        <Catalog />
      </div>
    </PageLayout>
  );
}
