import React from "react";
import { NavLink } from "../../components/navigation";
import { PageLayout } from "../../components/structure";

export default function Cart() {
  return (
    <PageLayout>
      <div>
        <div>
          <NavLink to="/shipping">SHIPPING DELIVERY</NavLink>
        </div>
      </div>
    </PageLayout>
  );
}
