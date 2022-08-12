import Product from '../models/Product';
import db from '../utils/db';

import Layout from '../components/Layout';
const categoryHandler = (e) => {
  filterSearch({ category: e.target.value });
};

export default function Category(props) {
  const { products, categories } = props;
  return (
    <Layout>
      {categories &&
        categories.map((category) => (
          <div key={category} value={category}>
            {category}
          </div>
        ))}

      <div className="container">
        {products.map((product) => (
          <div key={product.name}>
            <div product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const category = query.category || '';
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const categories = await Product.find().distinct('category');
  const productDocs = await Product.find({
    ...categoryFilter,
  }).lean();

  await db.disconnect();
  const products = productDocs.map(db.convertDocToObj);
  return {
    props: {
      categories,
      products,
    },
  };
}
