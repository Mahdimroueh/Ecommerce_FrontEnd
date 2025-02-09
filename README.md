# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ProductForm = () => {
//   const [product, setProduct] = useState({ name: "", description: "" });
//   const [colorVariants, setColorVariants] = useState([]);

//   const handleProductChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const addColorVariant = () => {
//     setColorVariants([
//       ...colorVariants,
//       { color_name: "", hex_code: "", sizeVariants: [] },
//     ]);
//   };
//   const addSizeVariant = (colorIndex) => {
//     const updatedColorVariants = [...colorVariants];
//     updatedColorVariants[colorIndex].sizeVariants.push({
//       size: "",
//       price: "",
//       quantity: "",
//     });
//     setColorVariants(updatedColorVariants);
//   };

//   const removeColorVariant = (colorIndex) => {
//     const updatedColorVariants = colorVariants.filter(
//       (_, index) => index !== colorIndex
//     );
//     setColorVariants(updatedColorVariants);
//   };

//   const removeSizeVariant = (colorIndex, sizeIndex) => {
//     const updatedColorVariants = [...colorVariants];
//     updatedColorVariants[colorIndex].sizeVariants = updatedColorVariants[
//       colorIndex
//     ].sizeVariants.filter((_, index) => index !== sizeIndex);
//     setColorVariants(updatedColorVariants);
//   };

//   const handleColorChange = (index, field, value) => {
//     const updatedColors = [...colorVariants];
//     updatedColors[index][field] = value;
//     setColorVariants(updatedColors);
//   };

//   const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
//     const updatedColors = [...colorVariants];
//     updatedColors[colorIndex].sizeVariants[sizeIndex][field] = value;
//     setColorVariants(updatedColors);
//   };

//   return (
//     <div className="w-full bg-white p-6 shadow-md rounded-lg ">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         Create New Product
//       </h2>

//       {/* Product Details */}
//       <div className="mb-6">
//         <TextField
//           fullWidth
//           label="Product Name"
//           name="name"
//           value={product.name}
//           onChange={handleProductChange}
//           variant="outlined"
//           className="mb-4"
//         />
//         <TextField
//           fullWidth
//           label="Description"
//           name="description"
//           value={product.description}
//           onChange={handleProductChange}
//           variant="outlined"
//           multiline
//           rows={4}
//           className="mb-4"
//         />
//       </div>

//       {/* Color Variants Table */}
//       <div className="mb-6">
//         <h3 className="text-xl font-medium text-gray-700 mb-4">
//           Color Variants
//         </h3>
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 border">Color Name</th>
//               <th className="px-4 py-2 border">Hex Code</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {colorVariants.map((color, colorIndex) => (
//               <React.Fragment key={colorIndex}>
//                 <tr>
//                   <td className="px-4 py-2 border">
//                     <TextField
//                       fullWidth
//                       value={color.color_name}
//                       onChange={(e) =>
//                         handleColorChange(
//                           colorIndex,
//                           "color_name",
//                           e.target.value
//                         )
//                       }
//                       variant="outlined"
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <TextField
//                       fullWidth
//                       type="color"
//                       value={color.hex_code}
//                       onChange={(e) =>
//                         handleColorChange(
//                           colorIndex,
//                           "hex_code",
//                           e.target.value
//                         )
//                       }
//                       variant="outlined"
//                     />
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <IconButton
//                       color="secondary"
//                       onClick={() => removeColorVariant(colorIndex)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                     <Button
//                       variant="outlined"
//                       startIcon={<AddIcon />}
//                       onClick={() => addSizeVariant(colorIndex)}
//                     >
//                       Add Size
//                     </Button>
//                   </td>
//                 </tr>

//                 {/* Size Variants Table */}
//                 {color.sizeVariants.length > 0 && (
//                   <tr>
//                     <td colSpan="3">
//                       <table className="w-full bg-gray-50 border mt-2 mb-4">
//                         <thead>
//                           <tr>
//                             <th className="px-4 py-2 border">Size</th>
//                             <th className="px-4 py-2 border">Price</th>
//                             <th className="px-4 py-2 border">Quantity</th>
//                             <th className="px-4 py-2 border">Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {color.sizeVariants.map((size, sizeIndex) => (
//                             <tr key={sizeIndex}>
//                               <td className="px-4 py-2 border">
//                                 <TextField
//                                   fullWidth
//                                   value={size.size}
//                                   onChange={(e) =>
//                                     handleSizeChange(
//                                       colorIndex,
//                                       sizeIndex,
//                                       "size",
//                                       e.target.value
//                                     )
//                                   }
//                                   variant="outlined"
//                                 />
//                               </td>
//                               <td className="px-4 py-2 border">
//                                 <TextField
//                                   fullWidth
//                                   type="number"
//                                   value={size.price}
//                                   onChange={(e) =>
//                                     handleSizeChange(
//                                       colorIndex,
//                                       sizeIndex,
//                                       "price",
//                                       e.target.value
//                                     )
//                                   }
//                                   variant="outlined"
//                                 />
//                               </td>
//                               <td className="px-4 py-2 border">
//                                 <TextField
//                                   fullWidth
//                                   type="number"
//                                   value={size.quantity}
//                                   onChange={(e) =>
//                                     handleSizeChange(
//                                       colorIndex,
//                                       sizeIndex,
//                                       "quantity",
//                                       e.target.value
//                                     )
//                                   }
//                                   variant="outlined"
//                                 />
//                               </td>
//                               <td className="px-4 py-2 border">
//                                 <IconButton
//                                   color="secondary"
//                                   onClick={() =>
//                                     removeSizeVariant(colorIndex, sizeIndex)
//                                   }
//                                 >
//                                   <DeleteIcon />
//                                 </IconButton>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={addColorVariant}
//           startIcon={<AddIcon />}
//         >
//           Add Color Variant
//         </Button>
//       </div>

//       <Button
//         variant="contained"
//         color="success"
//         fullWidth
//         onClick={() => console.log({ product, colorVariants })}
//         className="mt-6"
//       >
//         Save Product
//       </Button>
//     </div>
//   );
// };

// export default ProductForm;