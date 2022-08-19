/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="mb-5 block rounded-lg border border-gray-200  shadow-md">
      <div className="mb-2 items-center flex">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.image}
              alt={product.name}
              className="rounded shadow"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product._id}`}>
          <a className="text-veryDarkBlue">
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2 mt-2 text-gray-500">{product.brand}</p>
        <div className="flex justify-between items-center">
          <a className="text-newRed font-semibold pr-6">${product.price}</a>
          <button
            className="add-button"
            type="button"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
