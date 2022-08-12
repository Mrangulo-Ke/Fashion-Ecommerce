import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function FeaturedProducts(props) {
  const { state, dispatch } = useContext(Store);
  const featuredProducts = props;
  return (
    <section id="Featured products">
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
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find({ isFeatured: true })
    .lean()
    .limit(3);

  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
    },
  };
}
