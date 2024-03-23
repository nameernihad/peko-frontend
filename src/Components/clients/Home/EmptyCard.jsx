import React from "react";

export const EmptyCard = ({openModal}) => {
  return (
    <div className=" flex justify-center">
      <div className="w-1/2 ">
        <div className="single-card">
          <div className="card text-center">
            <div className="card-body flex flex-col items-center gap-3 py-3">
              <div className="file-icon-container flex justify-center items-center w-12 h-12 bg-[#7E61FF] rounded-full">
                <div className="file-icon text-white">
                  <i className="fas fa-file-upload"></i>
                </div>
              </div>

              <h5 className="text-xl ">Click here to upload files</h5>
              <button
                type="button"
                className="btn btn-primary  bg-[#7E61FF] rounded-xl "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={openModal}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
