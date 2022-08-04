import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AddCard from '../../components/AddCard';
import AddProduct from '../../components/AddProduct';
import Layout from '../../components/Layout';
// import Order from '../../models/Order';
import Product from '../../models/Product';
import db from '../../utils/db';
import { useRouter } from 'next/router';

function AdminIndex({ products }) {
  const { status, data: session } = useSession();
  const [product, setProduct] = useState(products);
  const router = useRouter();
  const { message } = router.query;

  const deleteHandler = async (product) => {
    try {
      const res = await axios.delete(`/api/products/${product._id}`);
      setProduct(product.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const [close, setClose] = useState(true);
  return (
    <Layout title="Admin">
      {status === 'loading' ? (
        'loading'
      ) : session?.user.isAdmin ? (
        <div className="mt-16 container">
          {<AddCard setClose={setClose} />}
          {!close && <AddProduct setClose={setClose} />}
          <h1 className="mb-4 text-xl">Products</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">IMAGE</th>
                  <th className="px-5 text-left">NAME</th>
                  <th className="px-5 text-left">ID</th>
                  <th className="px-5 text-left">CATEGORY</th>
                  <th className="px-5 text-left">BRAND</th>
                  <th className="px-5 text-left">DESCRIPTION</th>
                  <th className="px-5 text-left">PRICE</th>
                  <th className="px-5 text-left">ACTION</th>
                </tr>
              </thead>
              {products.map((product) => (
                <tbody key={product._id}>
                  <td className="p-5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                    ></Image>
                  </td>
                  <td className="p-5">{product.name}</td>
                  <td className="p-5">{product._id.substring(19, 24)} </td>
                  <td className="p-5">{product.category}</td>
                  <td className="p-5">{product.brand}</td>
                  <td className="p-5">{product.description}</td>
                  <td className="p-5">KSh {product.price}</td>
                  <td className="p-5">
                    <button className="primary-button">Edit</button>
                    <Link href="/admin/">
                      <button
                        className="primary-button mr-1"
                        onClick={() => deleteHandler(product)}
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tbody>
              ))}
            </table>
          </div>
          <h1 className="mt-16 text-xl">Orders</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="px-5 text-left">CUSTOMER</th>
                  <th className="px-5 text-left">TOTAL</th>
                  <th className="px-5 text-left">PAYMENT</th>
                  <th className="px-5 text-left">STATUS</th>
                  <th className="px-5 text-left">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <td className="p-5">5465890</td>
                <td className="p-5">John Doe</td>
                <td className="p-5">Khs 90</td>
                <td className="p-5">paid</td>
                <td className="p-5">preparing</td>
                <td className="p-5">
                  <button className="primary-button">Next stage</button>
                </td>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className=" mt-16 container">
          <h1 className="text-xl">Access Denied Only Admin Allowed</h1>
          {message && <div className="mb-4 text-red-500">{message}</div>}
          <div className="pt-4">
            <Link href="/">
              <button className="primary-button">Shop here</button>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  // const orders = await Order.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
      // orders: JSON.stringify(orders.map),
    },
  };
}
export default dynamic(() => Promise.resolve(AdminIndex), { ssr: false });
