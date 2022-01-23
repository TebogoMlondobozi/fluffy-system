import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "../../components/navigation";
import { PageLayout } from "../../components/structure";
import useProductCatalog from "../../hooks/use-product-catalog";
import { addCartItem } from "../../features/cart/cartSlice";
import useCart from "../../hooks/use-cart";

export default function Shop() {
  const catalog = useProductCatalog();
  const { items } = useCart();
  const dispatch = useDispatch();

  return (
    <PageLayout>
      <div className="mb-4 w-2/3 flex flex-col items-center">
        <h1 className="pt-4">LAUNDRY SERVICES</h1>
      </div>

      <div className="flex justify-center items-center">
        {!catalog ? (
          <p>Loading services...</p>
        ) : (
          <div className="flex flex-col space-x-10">
            <h1 className="text-center mb-4">
              We ofer laundry services for the following variety of clothes
            </h1>
            <ul className="grid grid-cols-3">
              {catalog.map((product) => (
                <NavLink
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="hover:bg-gray-200 hover:cursor-pointer"
                >
                  <li>
                    <img src="#" alt="not available" />
                    <div className="flex flex-col">
                      <span>{product.name}</span>
                      <span>{product.description}</span>
                      <span>{product.cost}</span>
                    </div>
                    <div>
                      <button
                        className="bg-blue-400 text-lg"
                        onClick={() =>
                          !items.find(({ id }) => id === product.id)
                            ? dispatch(addCartItem([...items, product]))
                            : console.log("item already added")
                        }
                      >
                        +
                      </button>
                    </div>
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
