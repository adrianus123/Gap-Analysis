import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const GetJobs = async (page, dataSize, keyword, type, location, tag) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/jobs/?page=${page}&per_page=${dataSize}&keyword=${keyword}&job_type=${type}&location=${location}&tag=${tag}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const AddJob = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/jobs/add`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const EditJob = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/jobs/${id}`, data);
    return response;
  } catch (error) {
    return error;
  }
};

export const GenerateData = async (tag) => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/generate/${tag}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetLocation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/location`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetJobType = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/type`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags/`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetClassification = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/classification`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetSubClassification = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/jobs/sub-classification`);
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteJob = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/jobs/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const DownloadExcel = async (keyword, type, location, tag) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/jobs/download?keyword=${keyword}&job_type=${type}&location=${location}&tag=${tag}`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
