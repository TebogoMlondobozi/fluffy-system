import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AlertMessage from "../../components/alerts/alert-message";
import { config } from "../../config";
import useProductCatalog from "../../hooks/use-product-catalog";
import { requestDELETE, requestPOST } from "../../utils/network-requests";

export default function Admin() {
  const { server_url } = config(process.env.NODE_ENV);
  const [isUploading, setIsUploading] = useState();
  const [deleteMessage, setDeleteMessage] = useState();
  const { handleSubmit, register } = useForm();

  const productCatalog = useProductCatalog();

  const deletedProduct = async (id) => {
    let deletedProduct = undefined;
    try {
      const { message } = await requestDELETE({
        url: `${server_url}/catalog/product/${id}`,
      });
      if (message) {
        setDeleteMessage(message);
      }
    } catch (e) {
      console.log("Failed deleting the product", e);
      setDeleteMessage(deletedProduct?.mesage);
    } finally {
      setTimeout(() => {
        setDeleteMessage();
      }, 2000);
    }
  };

  const submitProduct = async (formData) => {
    try {
      const uploaded = await requestPOST({
        url: `${server_url}/bucket/upload`,
        formData,
      });
      if (uploaded) {
        console.log("---", uploaded);
      }
    } catch (e) {}
  };

  return (
    <div>
      <form
        // onSubmit={handleSubmit(submitProduct)}
        className="flex flex-col items-center"
        action={`${server_url}/bucket/upload`}
        method="post"
        enctype="multipart/form-data"
      >
        <div className="grid grid-cols-2">
          <label htmlFor="product_img">Upload product image:</label>
          <input
            className="border-2 border-red-100"
            type="file"
            name="uploaded_file"
          />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="product_name">Name:</label>
          <input className="border-2 border-red-100" type="text" name="name" />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="description">Description</label>
          <input
            className="border-2 border-red-100"
            type="description"
            name="description"
          />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="category">Category:</label>
          <input
            className="border-2 border-red-100"
            type="text"
            name="category"
          />
        </div>

        <div className="grid grid-cols-2">
          <label htmlFor="category">Unit price:</label>
          <input
            className="border-2 border-red-100"
            type="text"
            name="unit_price"
          />
        </div>

        <div>
          <button className="bg-blue-400">Submit</button>
        </div>
      </form>

      <div className="p-20">
        <h1>Product catalog</h1>

        <AlertMessage alertMessage={deleteMessage} />

        <ul>
          {productCatalog?.catalog?.map((product) => (
            <li className="grid grid-cols-4 gap-4 m-4" key={product._id}>
              <span>{product.name}</span>
              <span className="col-start-2 col-span-2">
                {product.description}
              </span>
              <button
                className="rounded-lg p-2 bg-red-300"
                onClick={() => deletedProduct(product._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
