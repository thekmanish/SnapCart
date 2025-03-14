import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/product/Rating";
import Loader from "../components/Loader";
import useProductStore from "../store/useProductStore";
import Message from "../components/Message";

const ProductDetails = () => {

  const { product, error, loading, fetchProductById } = useProductStore();
  const { individualProductId } = useParams();

  useEffect(() => {
      fetchProductById(individualProductId);
    }, [individualProductId]);

    if (loading) return <Loader />;
    if (error) return <Message type="error" message={error} />;
    if (!product) return <p className="text-center text-gray-500">Product not found.</p>;
  

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg mt-6">
      {/* Product Details Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-3">{product.description}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center mt-3">
            <Rating rating={product.ratings} />
            <span className="ml-2 text-gray-600">
              ({product.reviewCounts} reviews)
            </span>
          </div>

          {/* Price and Stock */}
          <p className="text-3xl font-semibold text-blue-600 mt-4">
            ${product.price}
          </p>
          <p
            className={`mt-2 font-medium ${
              product.inStock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.inStock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Extra Info */}
          <div className="mt-4">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              className={`px-6 py-2 rounded text-white font-semibold transition ${
                product.countInStock > 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
            <button
              className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
                product.countInStock > 0 ? "" : "cursor-not-allowed opacity-50"
              }`}
              disabled={product.countInStock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
