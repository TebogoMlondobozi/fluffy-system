import React from "react";
import { NavLink } from "../../components/navigation";
import { PageLayout } from "../../components/structure";
import useCart from "../../hooks/use-cart";

export default function Cart() {
  const { items } = useCart();

  return (
    <PageLayout>
      <div>
        <div>
          <h1>Cart Items</h1>
          <div>
            {items.map((item) => (
              <div key={item.id} className="flex flex-cols space-x-2">
                <span>{item.name}</span>
                <span>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <NavLink to="/shipping">SHIPPING DELIVERY</NavLink>
        </div>
      </div>
    </PageLayout>
  );
}
