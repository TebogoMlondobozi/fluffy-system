import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { PageLayout } from "../../components/structure";
import useProductCatalog from "../../hooks/use-product-catalog";

import Catalog from "./catalog";

export default function Shop() {
  const productCatalog = useProductCatalog();

  console.log("----", productCatalog);
  return (
    <PageLayout>
      <div className="pb-10 flex flex-col items-center">
        <h1>DRY CLEANING &amp; LAUNDRY SERVICES</h1>
      </div>

      {!productCatalog ? (
        <ul className="grid gap-4 grid-cols-3">
          {[
            Skeleton,
            Skeleton,
            Skeleton,
            Skeleton,
            Skeleton,
            Skeleton,
            Skeleton,
            Skeleton,
            Skeleton,
          ].map((el, index) => (
            <li key={index}>
              <div className="w-60">
                <Skeleton count={1} className="h-36" />
              </div>
              <div className="flex flex-col">
                <div className="w-40">
                  <Skeleton count={2} className="h-5" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Catalog {...productCatalog} />
      )}
    </PageLayout>
  );
}
