import React, { useState } from "react";
import DonutChart from "./donutProgress";

const Card = ({ files }) => {
  const [percentage, setPercentage] = useState(0);

  const deleteCard = () => {
    // Implement delete card functionality here
  };

  return (
    <div className="card text-center border rounded-lg shadow-lg mx-2 my-4 md:my-0 md:w-80 lg:w-96">
      <div className="card-body">
        <div className="close-inUpload flex justify-between">
          <div></div>
          <h5 className="card-title">{files.name}</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={deleteCard}
          ></button>
        </div>
        <div className="folder-icon-div">
          <div className="my-computer flex items-center justify-center gap-2 bg-white rounded-lg px-2 py-1 text-[#7E61FF]">
            <i className="fas fa-folder"></i>
            My Computer
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <DonutChart percentage={percentage} setPercentage={setPercentage} />
        </div>
        <div className="flex justify-center mt-3">
          {percentage !== 100 ? (
            <button
              type="button"
              className=" bg-[#7E61FF] w-36 text-white py-2 rounded-md"
            >
              ...Uploading
            </button>
          ) : (
            <button
              type="button"
              className=" bg-[#3ED299] w-36 text-white py-2 rounded-md"
            >
              VERIF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
