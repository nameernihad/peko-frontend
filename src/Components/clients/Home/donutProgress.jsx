import React, { useEffect } from "react";

const DonutChart = ({ percentage, setPercentage }) => {
  const circumference = 2 * Math.PI * 15.9154943092;
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      if (percentage < 100) {
        setPercentage((prevPercentage) => prevPercentage + 10);
      } else {
        clearInterval(interval);
      }
    }, 100); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="donut-chart mb-3 relative">
      <svg className="donut-svg" viewBox="0 0 36 36" width="120" height="120">
        <circle
          className="donut-circle bg-white"
          cx="18"
          cy="18"
          r="15.9154943092"
          fill="transparent"
          strokeWidth="3"
        />
        {percentage !== 100 ? (
          <circle
            className="donut-circle"
            cx="18"
            cy="18"
            r="15.9154943092"
            fill="transparent"
            stroke="#7E61FF"
            strokeWidth="3"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90 18 18)"
          />
        ) : (
          <circle
            className="donut-circle"
            cx="18"
            cy="18"
            r="15.9154943092"
            fill="transparent"
            stroke="#3ED299"
            strokeWidth="3"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90 18 18)"
          />
        )}

        {percentage === 100 ? (
          <text
            className=" font-thin text-sm"
            x="18"
            y="23" // Adjusted y position to center vertically
            textAnchor="middle"
            fill="#8077B4"
          >
            3
          </text>
        ) : (
          <text
            className="donut-text"
            x="18"
            y="23"
            textAnchor="middle"
            fontSize="12px" // Adjusted font size to make it smaller
            fill="#7E61FF"
          >
            {percentage}%
          </text>
        )}
      </svg>
    </div>
  );
};

export default DonutChart;
