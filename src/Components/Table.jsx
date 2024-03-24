import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Table = ({ headings, data,handleEdit,handleDelete, loading }) => {
  const skeletonRows = loading ? [1, 2, 3] : []; 
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            {headings.map((heading, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-center">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            skeletonRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={`text-center ${rowIndex % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                {headings.map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 animate-pulse">
                    <div className="bg-gray-300 dark:bg-gray-600 h-4 w-20 rounded-md"></div>
                  </td>
                ))}
                <td className="px-6 py-4 flex gap-3">
                  <div className="bg-gray-300 dark:bg-gray-600 h-4 w-8 rounded-md"></div>
                  <div className="bg-gray-300 dark:bg-gray-600 h-4 w-8 rounded-md"></div>
                </td>
              </tr>
            ))
          ) : (
            data.map((data, index) => (
              <tr key={index} className={`text-center ${index % 2 === 0 ? 'even:bg-gray-50 even:dark:bg-gray-800' : 'odd:bg-white odd:dark:bg-gray-900'} border-b dark:border-gray-700`}>
                {Object.values(data).map((value, idx) => (
                  <td key={idx} className="px-6 py-4">
                    {value}
                  </td>
                ))}
                <td className="px-6 py-4 flex gap-3">
                  <FontAwesomeIcon icon={faPen} className="text-green-500" onClick={()=>handleEdit(index)} />
                  <FontAwesomeIcon icon={faTrash} className="text-red-500" onClick={()=>handleDelete(index)} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
