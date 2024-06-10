import axios from "axios";

export const get = async (url, token = null) => {
  try {
    const config = {};
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    const response = await axios.get(url, config);
    return response;
  } catch (error) {
    return error;
  }
};

export const post = async (url, token = null, body) => {
  try {
    const config = {};
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    const response = await axios.post(url, body, config);
    return response;
  } catch (error) {
    return error;
  }
};

export const put = async (url, token = null, body) => {
  try {
    const config = {};
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    const response = await axios.put(url, body, config);
    return response;
  } catch (error) {
    return error;
  }
};

export const del = async (url, token = null) => {
  try {
    const config = {};
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    const response = await axios.delete(url, config);
    return response;
  } catch (error) {
    return error;
  }
};
