import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
//import FeaturedProducts from '../components/FeaturedProducts';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home(props) {
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts } = props;

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

      <section id="featured-products">
        <h1>Featured Products</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
            ></ProductItem>
          ))}
        </div>
      </section>
      <section id="toprated-products">
        <h1>Top Rated Products</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {topRatedProducts.map((product) => (
            <ProductItem
              product={product}
              key={product.slug}
              addToCartHandler={addToCartHandler}
            ></ProductItem>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const featuredProductsDocs = await Product.find({ isFeatured: true })
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, '-reviews')
    .lean()
    .sort({
      rating: 1,
    })
    .limit(3);
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
