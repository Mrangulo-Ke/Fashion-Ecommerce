// import Product from '../../../models/Product';
// import db from '../../../utils/db';

// const handler = async (req, res) => {
//   const { method } = req;

//   await db.connect();
//   if (method === 'GET') {
//     try {
//       const product = await Product.findById(req.query.id);
//       res.send(product);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }

//   if (method === 'PUT') {
//     try {
//       const product = await Product.findByIdAndUpdate(req.query.id, {
//         new: true,
//       });
//       res.send(product);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
//   if (method === 'DELETE') {
//     try {
//       await Product.findByIdAndDelete(req.query.id);
//       res.status(200).json('The product has been deleted.');
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
//   await db.disconnect();
// };

// export default handler;
