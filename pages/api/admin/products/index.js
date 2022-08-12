// import Product from '../../../models/Product';
// import db from '../../../utils/db';

// export default async function handler(req, res) {
//   const { method } = req;
//   await db.connect();
//   if (method === 'GET') {
//     try {
//       const products = await Product.find({});
//       res.status(200).json(products);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   if (method === 'POST') {
//     const newProduct = new Product({
//       name: 'sample name',
//       slug: 'sample-slug-' + Math.random(),
//       image: '/images/shirt1.jpg',
//       price: 0,
//       category: 'sample category',
//       brand: 'sample brand',
//       countInStock: 0,
//       description: 'sample description',
//       rating: 0,
//       numReviews: 0,
//     });
//     try {
//       const product = await newProduct.save();
//       res.send({ message: 'Product Created', product });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
//   await db.disconnect();
// }
