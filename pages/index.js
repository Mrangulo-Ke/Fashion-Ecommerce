import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

import freeDeliverlyImg from '../public/images/location.png';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/solid';
import WhyUsListItem from '../components/WhyUsList';

export default function Home(props) {
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts, products } = props;

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry, Product out of stock!');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Link Masters">
      <Hero />

      <section id="featured-products" className="main">
        <div className="">
          <h1 className="text-center text-4xl font-semibold mb-10">
            Featured Products
          </h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductItem
                product={product}
                key={product.slug}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            ))}
          </div>
        </div>
      </section>
      <section id="why-us" className="main">
        <div className="min-h-[75vh] container flex flex-col md:flex-row px-6 mx-auto items-center mt-24 space-y-0 md:space-y-0">
          <div className="w-1/2 flex items-center">
            <Image src={freeDeliverlyImg} alt=""></Image>
          </div>
          <div className="flex flex-col pb-12 md:w-1/2 ">
            <h2 className="text-3xl md:text-5xl text-semibold text-left mb-10">
              Why <span className="text-newRed">Us?</span>
            </h2>
            <p className="text-base text-gray-500 md:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              minus. Tempora reprehenderit a corporis velit, laboriosam vitae
              ullam, repellat illo sequi odio esse iste fugiat dolor, optio
              incidunt eligendi deleniti!
            </p>
            <li className="mt-4 list-none">
              <WhyUsListItem title="Quick deliverly.">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                voluptatibus.
              </WhyUsListItem>
              <WhyUsListItem title="Quality services.">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                voluptatibus.
              </WhyUsListItem>
              <WhyUsListItem title="Order from any location.">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia,
                voluptatibus.
              </WhyUsListItem>
            </li>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProductsDocs = await Product.find({ isFeatured: true })
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: -1,
    })
    .limit(3);

  return {
    props: {
      products: products.map(db.convertDocToObj),
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
