import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Add.module.css';

const AddProduct = ({ setClose }) => {
  const router = useRouter();
  const createHandler = async () => {
    try {
      const { data } = await axios.post('api/admin/products');
      router.push(`admin/product/${data.product._id}`);
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="container flex justify-center items-center
     h-[100vh] fixed top-0 z-999 w-[100vw]"
    >
      <div
        className="bg-veryDarkBlue p-6 rounded-md relative 
      justify-between flex flex-col"
      >
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>

        <h1 className="text-xl text-center pb-4 text-white">
          Add a new Product
        </h1>
        <div className="p-2">
          <input
            className="w-full rounded-md"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-2">
          <input
            className="w-full rounded-md"
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="p-2">
          <input
            className="w-full rounded-md"
            type="text"
            placeholder="Brand"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="p-2">
          <input
            className="w-full rounded-md"
            type="text"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="p-2">
          <input
            className="w-[1/2] rounded-md"
            placeholder="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="w-[1/2] rounded-md"
            type="number"
            placeholder="Stock Count"
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
        {/* <div className="p-2">
          <label className="text-base">Choose a photo</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div> */}
        <div className="flex justify-center pt-4">
          <button
            className="w-[25%] rounded-md  bg-veryDarkViolet  text-white py-2 px-2 md:px-4 shadow outline-none hover:bg-veryDarkBlue 
                     text-xs md:text-sm focus:outline-none active:bg-veryDarkBlue focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            onClick={createHandler}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
