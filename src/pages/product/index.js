import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../components/structure";
import useProduct from "../../hooks/use-product-id";

export default function Product() {
  const { id } = useParams();
  const product = useProduct({ id });

  return (
    <PageLayout>
      <div style={{ margin: "20px auto" }}>
        {!product ? (
          <div>Loading product...</div>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="hover:cursor-pointer">
              <div className="w-2/4">
                <img src={product.img.dataUrl} alt="not available" />
              </div>
              <div>
                <h3 className="font-bold">Product Information</h3>
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span>{product.description}</span>
                  <span>Qty: {product.qty || 0}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-start space-x-4 flex-1">
              <button className="font-bold w-10 h-10 hover:bg-blue-200 hover:text-black bg-blue-400 text-white rounded-lg p-1">
                +
              </button>
              <button className="font-bold w-10 h-10 hover:bg-gray-200 hover:text-black bg-gray-400 text-black rounded-lg p-1">
                -
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
