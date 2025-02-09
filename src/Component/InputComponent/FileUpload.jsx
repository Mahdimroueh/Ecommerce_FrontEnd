import { useState } from "react";

const FileUpload = ({ onFilesUploaded, handleFileDelete }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files) {
      const res = await Promise.all(
        [...files].map((file) => {
          return new Promise((res, rej) => {
            try {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                res(reader.result);
              };
            } catch (e) {
              rej(e);
            }
          });
        })
      );
      setSelectedFile((prev) => [...prev, ...res]);
      if (onFilesUploaded) onFilesUploaded(res);
    }
  };

  return (
    <div className="flex gap-8">
      {/* File Input Section */}
      <div className="w-20 h-20">
        {/* Hidden file input */}
        <input
          type="file"
          id="fileInput"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />

        {/* Custom label styled as a + sign */}
        <label
          htmlFor="fileInput"
          className="flex justify-center items-center w-full h-full bg-slate-200 rounded-md text-3xl font-bold cursor-pointer hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          +
        </label>
      </div>

      {/* Display selected file thumbnails */}
      <div className="flex gap-5">
        {selectedFile.map((file, index) => (
          <div className="relative w-20 h-20" key={index}>
            {/* Image preview */}
            <img
              src={file}
              alt=""
              className="object-cover w-full h-full rounded-md border border-slate-300"
            />
            {/* Optional Remove Button */}
            <button
              onClick={() => {
                setSelectedFile((prev) => prev.filter((_, i) => i !== index));
                handleFileDelete(index);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
