import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { requestPOST } from "../../utils/network-requests";

export default function Admin() {
  const [isUploading, setIsUploading] = useState();
  const { handleSubmit, register } = useForm();

  const submitProduct = async (formData) => {
    try {
      const uploaded = await requestPOST({
        url: "http://localhost:3000/bucket/upload",
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
        action="http://localhost:3000/bucket/upload"
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
    </div>
  );
}
