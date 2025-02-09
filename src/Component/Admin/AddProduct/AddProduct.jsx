import { useState } from "react";
import TextField from "../../InputComponent/TextField";
import CategorySelector from "../../InputComponent/CategorySelect";
import BrandSelect from "../../InputComponent/BrandSelect";
import TextAreaInput from "../../InputComponent/TextAreaInput";
import ColorPicker from "../../InputComponent/ColorPicker";
import FileUpload from "../../InputComponent/FileUpload";
import SizeOptionSelect from "../../InputComponent/SizeOptionSelect";
import { customFetch } from "../../../api/AxiosFetch";

const AddProduct = () => {
  const [product, setProduct] = useState({
    about: "",
    careInstructions: "",
    desc: "",
    name: "",
    salePrice: 0,
    images: [],
    brandId: 0,
    categoryId: 0,
    colorVariations: [],
  });

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e, index) => {
    const newColorVariation = [...product.colorVariations];
    newColorVariation[index].colorId = e.target.value;
    setProduct({ ...product, colorVariations: newColorVariation });
  };

  const handleSizeChange = (e, colorIndex, sizeIndex, name) => {
    const newColorVariation = [...product.colorVariations];
    newColorVariation[colorIndex].sizeVariations[sizeIndex][name] =
      e.target.value;
    setProduct({ ...product, colorVariations: newColorVariation });
  };

  const handleFileUpload = (uploadedFile, colorIndex) => {
    const newColorVariation = [...product.colorVariations];
    newColorVariation[colorIndex].images = [...uploadedFile];
    setProduct({ ...product, colorVariations: newColorVariation });
  };

  const handleFileDelete = (colorIndex, fileIndex) => {
    const newColorVariation = [...product.colorVariations];
    newColorVariation[colorIndex].images = newColorVariation[
      colorIndex
    ].images.filter((_, i) => i !== fileIndex);
    setProduct({ ...product, colorVariations: newColorVariation });
  };

  const addColorVariation = () => {
    setProduct({
      ...product,
      colorVariations: [
        ...product.colorVariations,
        {
          colorId: 0,
          images: [],
          sizeVariations: [],
        },
      ],
    });
  };

  const deleteColorVariation = (index) => {
    const newColorVariation = product.colorVariations.filter(
      (_, i) => i !== index
    );
    setProduct({ ...product, colorVariations: newColorVariation });
  };

  const addSizeVariation = (colorIndex) => {
    const newColorVariation = [...product.colorVariations];
    newColorVariation[colorIndex].sizeVariations = [
      ...newColorVariation[colorIndex].sizeVariations,
      {
        code: 0,
        quantityInStock: 0,
        sizeOptionId: 0,
      },
    ];
    setProduct({ ...product, colorVariations: newColorVariation });
  };

  const deleteSizeVariation = (colorIndex, sizeIndex) => {
    const newColorVariation = [...product.colorVariations];
    newColorVariation[colorIndex].sizeVariations = newColorVariation[
      colorIndex
    ].sizeVariations.filter((_, i) => i !== sizeIndex);
    setProduct({ ...product, colorVariations: newColorVariation });
  };
  const handleSubmit = async () => {
    try {
      const res = await customFetch.post("/admin/products", product);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-6">
      <div className="shadow-md p-8 rounded-md bg-white">
        <h2 className="text-xl font-semibold text-center mb-6">
          Add a Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <TextField
              name="name"
              type="text"
              value={product.name}
              onChange={handleProductChange}
              label="Product Name"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <TextField
              name="salePrice"
              type="number"
              value={product.salePrice}
              onChange={handleProductChange}
              label="Price"
              placeholder="Enter salePrice"
            />
          </div>

          <div>
            <CategorySelector
              name="categoryId"
              value={product.categoryId}
              onChange={handleProductChange}
              parentCategory="men"
            />
          </div>

          <div>
            <BrandSelect
              name="brandId"
              value={product.brandId}
              onChange={handleProductChange}
            />
          </div>

          <div className="col-span-2">
            <TextAreaInput
              name="careInstructions"
              value={product.careInstructions}
              onChange={handleProductChange}
              label="Instructions"
              placeholder="Enter product Instructions"
            />
          </div>

          <div className="col-span-2">
            <TextAreaInput
              name="about"
              value={product.about}
              onChange={handleProductChange}
              label="About"
              placeholder="Enter about the product"
            />
          </div>

          <div className="col-span-2">
            <TextAreaInput
              name="desc"
              value={product.desc}
              onChange={handleProductChange}
              label="Description"
              placeholder="Enter product description"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4">Color Variations</h3>

        <button onClick={addColorVariation} className="btn btn-primary  mb-4">
          Add Color Variation
        </button>

        {product.colorVariations.map((color, colorIndex) => (
          <div className="mb-6" key={colorIndex}>
            <div className="grid gap-4">
              <ColorPicker
                name="colorId"
                value={color.colorId}
                onChange={(e) => handleColorChange(e, colorIndex)}
              />

              <FileUpload
                onFilesUploaded={(files) => handleFileUpload(files, colorIndex)}
                handleFileDelete={(fileIndex) =>
                  handleFileDelete(colorIndex, fileIndex)
                }
              />

              <div className="flex gap-4">
                <button
                  onClick={() => deleteColorVariation(colorIndex)}
                  className="btn btn-danger"
                >
                  Delete Color Variation
                </button>

                <button
                  onClick={() => addSizeVariation(colorIndex)}
                  className="btn btn-secondary"
                >
                  Add Size Variation
                </button>
              </div>

              {color.sizeVariations.map((size, sizeIndex) => (
                <div key={sizeIndex} className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      value={size.code}
                      label="Size Code"
                      onChange={(e) =>
                        handleSizeChange(e, colorIndex, sizeIndex, "code")
                      }
                      type="number"
                    />
                    <TextField
                      value={size.quantityInStock}
                      label="Quantity"
                      onChange={(e) =>
                        handleSizeChange(e, colorIndex, sizeIndex, "quantityInStock")
                      }
                      type="number"
                    />
                    <SizeOptionSelect
                      value={size.sizeOptionId}
                      label="Size"
                      parentCategory={product.categoryId}
                      onChange={(e) =>
                        handleSizeChange(e, colorIndex, sizeIndex, "sizeOptionId")
                      }
                    />
                  </div>
                  <button
                    onClick={() => deleteSizeVariation(colorIndex, sizeIndex)}
                    className="btn btn-danger mt-2"
                  >
                    Delete Size Variation
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
