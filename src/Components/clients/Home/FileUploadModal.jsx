import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';

const FileUploadModal = ({ closeModal, setFiles }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setFiles((prevFiles) => [...prevFiles, selectedFile]);
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]); 

  const handleDivClick = () => {
    fileInputRef.current.click(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md" >
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/4 w-96 h-96">
        <div className='flex justify-between' >
          <h2 className="text-xl font-bold mb-4">Select a source</h2>
          <i className="fas fa-times text-2xl text-slate-300" onClick={closeModal}></i>
        </div>
        <div className='flex justify-around'>
          <button className="flex items-center text-[#7E61FF] space-x-2 mb-4" >
            <i className="fas fa-folder"></i>
            <span>My computer</span>
          </button>
          <button className="flex items-center text-[#7E61FF] space-x-2 mb-4">
            <i className="fas fa-folder"></i>
            <span>Copy & Paste</span>
          </button>
        </div>
        
        <div
          className="flex flex-col gap-2 items-center justify-center border-dashed border-2  border-purple-500 p-4 mb-4 h-60 cursor-pointer"
          onClick={handleDivClick}
        >
          <i className="fas fa-cloud-upload-alt text-3xl text-[#7E61FF]"></i>
          <p className="text-center text-gray-600">
            Drag and drop anywhere on this page, or click to upload files.
          </p>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
