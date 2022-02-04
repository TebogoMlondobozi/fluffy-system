import React, { useState } from "react";
import { NavLink } from ".";
import useAuth from "../../hooks/use-auth";
import useCart from "../../hooks/use-cart";

export default function SiteTopNav() {
  const { user, signOut } = useAuth();
  const { itemsCount } = useCart();

  return (
    <div className="flex items-center">
      <div className="lg:inline-flex md:inline-block space-x-4">
        <nav
          className="lg:inline-flex md:items-center md:justify-center lg:space-x-2"
          id="myLinks"
        >
          <NavLink to="/shop">SHOP</NavLink>
          {!user && <NavLink to="/login">SIGN IN</NavLink>}
          <NavLink to="/profile">PROFILE</NavLink>
          {!user && <NavLink to="/register">SIGN UP</NavLink>}
          <NavLink to="/cart">
            {itemsCount > 0 ? `CART(${itemsCount})` : "CART"}
          </NavLink>
        </nav>
        {user ? (
          <button
            className="text-left w-20 rounded-lg border-b-2 hover:bg-blue-500 hover:text-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        ) : null}
      </div>
    </div>
  );
}
