import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

const PAGE_SIZE = 6;

const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $200',
    value: '51-200',
  },
  {
    name: '$201 to $1000',
    value: '201-1000',
  },
];

const ratings = [1, 2, 3, 4, 5];

function Search(props) {
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query;

  const { products, countProducts, categories, brands, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  const brandHandler = (e) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const { state, dispatch } = useContext(Store);

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
    <Layout>
      <section id="top__banner" className="mt-20">
        <div className="container m-auto mt-4 px-4">
          <h2 className="text-white text-3xl md:text-4xl">All Products</h2>
        </div>
      </section>
      <section id="all-products" className="main">
        <div className="md:grid md:grid-cols-5 flex-row">
          <div className="md:grid md:col-span-1 mt-16 flex">
            <div className="">
              <ul className="list-none px-2 pb-4">
                <li>
                  <select
                    className="rounded border-[1px] p-2 outline-none w-full border-[#fde4e4]"
                    value={category}
                    onChange={categoryHandler}
                  >
                    <option value="all">Categories</option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </li>
              </ul>
              <ul className="list-none px-2 py-4">
                <li>
                  <select
                    className="rounded border-[1px] p-2 outline-none w-full border-[#fde4e4]"
                    value={brand}
                    onChange={brandHandler}
                  >
                    <option value="all">Brands</option>
                    {brands &&
                      brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                  </select>
                </li>
              </ul>
              <ul className="list-none px-2 py-4">
                <li>
                  <select
                    className="rounded border-[1px] p-2 outline-none w-full border-[#fde4e4]"
                    value={price}
                    onChange={priceHandler}
                  >
                    <option value="all">Prices</option>
                    {prices.map((price) => (
                      <option key={price.value} value={price.value}>
                        {price.name}
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
              <ul className="list-none px-2 py-4">
                <li>
                  <select
                    className="rounded border-[1px] p-2 outline-none w-full border-[#fde4e4]"
                    value={rating}
                    onChange={ratingHandler}
                  >
                    <option value="all">Ratings</option>
                    {ratings.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                        <span>&amp; Up</span>
                      </option>
                    ))}
                  </select>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:grid md:col-span-4 flex-row">
            <div className="md:flex justify-between mb-6">
              <div className="items-center flex text-lg pl-4">
                {products.length === 0 ? 'No' : countProducts} Results
                {query !== 'all' && query !== '' && ' : ' + query}
                {category !== 'all' && ' : ' + category}
                {brand !== 'all' && ' : ' + brand}
                {price !== 'all' && ' : Price ' + price}
                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                {(query !== 'all' && query !== '') ||
                category !== 'all' ||
                brand !== 'all' ||
                rating !== 'all' ||
                price !== 'all' ? (
                  <button onClick={() => router.push('/search')}>
                    <XIcon className="text-newRed h-5 w-5"></XIcon>
                  </button>
                ) : null}
              </div>
              <div className="flex justify-end items-center">
                <select
                  value={sort}
                  onChange={sortHandler}
                  className="rounded border-[1px] p-2 outline-none w-48 border-[#fde4e4]"
                >
                  <option value="featured">Featured</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="toprated">Top Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {products.map((product) => (
                <ProductItem
                  product={product}
                  key={product.slug}
                  addToCartHandler={addToCartHandler}
                ></ProductItem>
              ))}
            </div>
            <div>
              {/* <ReactPaginate
                className="mt-2"
                defaultPage={parseInt(query.page || '1')}
                count={pages}
                onChange={pageHandler}
              ></ReactPaginate> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}

export default dynamic(() => Promise.resolve(Search), { ssr: false });
