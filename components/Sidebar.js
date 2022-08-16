// import { Listbox, Menu } from '@headlessui/react';
// import React, { Fragment, useState } from 'react';

// export default function Sidebar() {
//   //   const [sidebarVisible, setSidebarVisible] = useState(false);

//   //   const sidebarOpenHandler = () => {
//   //     setSidebarVisible(true);
//   //   };
//   //   const sidebarCloseHandler = () => {
//   //     setSidebarVisible(false);
//   //   };

//   const [categories, setCategories] = useState([]);

//   const fetchCategories = async () => {
//     try {
//       const { data } = await axios.get(`/api/products/categories`);
//       setCategories(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const [query, setQuery] = useState('');
//   const queryChangeHandler = (e) => {
//     setQuery(e.target.value);
//   };
//   const submitHandler = (e) => {
//     e.preventDefault();
//     router.push(`/search?query=${query}`);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);
//   return (
//     <Menu as="div">
//       <Fragment>
//         <Menu.Button></Menu.Button>
//         <Menu.Items>
//           {categories.map((category) => (
//             <Menu.Item primary={category}></Menu.Item>
//           ))}
//         </Menu.Items>
//       </Fragment>
//     </Menu>
//   );
// }
