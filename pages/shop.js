import { Listbox, Menu, Transition } from '@headlessui/react';
import { CloudIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

const PAGE_SIZE = 3;

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
export default function AllProducts(props) {
  const router = useRouter();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
  } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    categoryProducts,
    brandProducts,
    products,
    countProducts,
    categories,
    brands,
  } = props;

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
      <section id="all-products">
        <div className="grid grid-cols-5 pt-36">
          <div className="grid col-span-1">
            <Listbox value={category} onChange={categoryHandler}>
              <Listbox.Button>Categories</Listbox.Button>
              <Listbox.Options>
                <Listbox.Option value="all">All</Listbox.Option>
                {categories &&
                  categories.map((category) => (
                    <Listbox.Option key={category} value={category}>
                      {category}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div className="grid col-span-4">
            <div>
              {' '}
              {products.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {brand !== 'all' && ' : ' + brand}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              price !== 'all' ? (
                <button onClick={() => router.push('/shop')}>
                  <CloudIcon />
                </button>
              ) : null}
            </div>
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
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...categoryFilter,
      ...brandFilter,
    },
    '-reviews'
  )
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...categoryFilter,
    ...brandFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      countProducts,
      products,
      categories,
      brands,
      prices,
    },
  };
}
