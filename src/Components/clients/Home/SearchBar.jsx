import React, { useEffect, useState } from "react";
import Card from "./Card";
import FileUploadModal from "./FileUploadModal";
import { EmptyCard } from "./EmptyCard";

const SearchBar = () => {
  const [files, setFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex w-full justify-center p-5">
        <div className="flex gap-3 items-center justify-around w-full ">
          <div className="flex items-center">
            <button
              type="submit"
              className="text-white flex gap-1 items-center  bg-[#7E61FF] hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 "
              onClick={openModal}
            >
              <i class="fas fa-plus"></i>NewList
            </button>
          </div>
          <form className="flex items-center w-full px-4 ">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full ms-2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
          </form>

          <div class="icon-container flex gap-2 text-lg ">
            <i class="fas fa-th-large icon-padding  text-black"></i>
            <i class="fas fa-bars icon-padding text-black"></i>
          </div>
        </div>
      </div>
      {files.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5">
        {files.map((file, index) => <Card key={index} files={file} />)}
      </div>
      ) : (
        <EmptyCard openModal={openModal} />
      )}
      {modalOpen && (
        <FileUploadModal setFiles={setFiles} closeModal={closeModal} />
      )}
    </>
  );
};

export default SearchBar;
