import {apiClient} from "./apiClient"; 

export const getAllUsers = async () => {
  const response = await apiClient.get("user/viewUser");
  return response.data.users;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/user/${id}`);
  return response.data;
};


export const updateUserRole = async (id, role) => {
  const response = await apiClient.put(`/user/updateRole/${id}`, { role });
  return response.data;
};

//HOTEL

export const getHotels = async () => {
  const response = await apiClient.get("/hotel/viewHotel");
  return response.data.hotels;
};

export const createHotel = async (hotelData) => {
  const response = await apiClient.post("/hotel/registerHotel", hotelData);
  return response.data;
};

export const updateHotel = async (id, hotelData) => {
  const response = await apiClient.put(`/hotel/updateHotel/${id}`, hotelData);
  return response.data;
};

export const deleteHotel = async (id) => {
  const response = await apiClient.delete(`/hotel/deleteHt/${id}`);
  return response.data;
};

export const assignHotelToUser = async ({ userIdentifier, hotelToken }) => {
  const response = await apiClient.post("/hotel/assignHotelToUser", {
    userIdentifier,
    hotelToken,
  });
  return response.data;
};

