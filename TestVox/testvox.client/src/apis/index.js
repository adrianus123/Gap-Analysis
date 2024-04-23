import axios from "axios";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "https://localhost:7089/api";
const SECRET_KEY = "unfhJsNEL050DV845QfIXs6tjmQyEIqo";

export const GetToken = () => {
  const encryptedToken = localStorage.getItem("token");
  if (!encryptedToken) {
    return null;
  }

  const decryptedToken = CryptoJS.AES.decrypt(
    encryptedToken,
    SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  return decryptedToken;
};

export const SetToken = (token) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  localStorage.setItem("token", encryptedToken);
};

export const RemoveToken = () => {
  localStorage.removeItem("token");
};

export const SignIn = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/User/sign-in`, data);
    SetToken(response.data.token);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const SignOut = () => {
  RemoveToken();
};

export const SignUp = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/User/sign-up`, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const GetOrganizers = async (page = 1, size = 10) => {
  try {
    const token = GetToken();
    const response = await axios.get(
      `${BASE_URL}/Organizer?page=${page}&perPage=${size}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const GetOrganizer = async (id) => {
  try {
    const token = GetToken();
    const response = await axios.get(`${BASE_URL}/Organizer/` + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const CreateOrganizer = async (data) => {
  try {
    const token = GetToken();
    const response = await axios.post(`${BASE_URL}/Organizer`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const UpdateOrganizer = async (id, data) => {
  try {
    const token = GetToken();
    const response = await axios.put(`${BASE_URL}/Organizer/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const DeleteOrganizer = async (id) => {
  try {
    const token = GetToken();
    const response = await axios.delete(`${BASE_URL}/Organizer/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const GetUserId = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  } catch (error) {
    return error;
  }
};

export const GetUser = async () => {
  try {
    const token = GetToken();
    const userId = GetUserId(token);
    const response = await axios.get(`${BASE_URL}/User/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const ChangePassword = async (data) => {
  try {
    const token = GetToken();
    const userId = GetUserId(token);
    const response = await axios.put(
      `${BASE_URL}/User/${userId}/password`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const UpdateProfile = async (data) => {
  try {
    const token = GetToken();
    const userId = GetUserId(token);
    const response = await axios.put(`${BASE_URL}/User/${userId}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

export const DeleteAccount = async () => {
  try {
    const token = GetToken();
    const userId = GetUserId(token);
    const response = await axios.delete(`${BASE_URL}/User/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
