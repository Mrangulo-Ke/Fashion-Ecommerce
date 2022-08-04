import Product from '../../../models/Product';
import db from '../../../utils/db';

export default async function handler(req, res) {
  const { method } = req;
  await db.connect();
  if (method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    const { name, category, price, brand, description, countInStock } =
      req.body;

    const newProduct = new Product({
      name,
      category,
      price,
      brand,
      description,
      countInStock,
    });
    // try {
    //   const product = await Product.create(req.body);
    //   res.status(200).json(product);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  }
}
