import userAxios from "../Axios/userAxios.js";

const getAllData = async (API_URL) => {
  try {
    const response = await userAxios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

const getDataById = async (API_URL) => {
  try {
    const response = await userAxios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(`Error fetching :`, error);
    return null;
  }
};

const deleteData = async (API_URL) => {
  try {
    const response = await userAxios.delete(API_URL);
    return response.data;
  } catch (error) {
    console.error(`Error deleting:`, error);
    return null;
  }
};

const editData = async (API_URL, newData) => {
  try {
    const response = await userAxios.put(API_URL, newData);
    return response.data;
  } catch (error) {
    console.error(`Error updating :`, error);
    return null;
  }
};

const addData = async (API_URL, formData) => {
  try {
    const response = await userAxios.post(API_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};



export {
  getAllData,
  getDataById,
  deleteData,
  editData,
  addData

};
