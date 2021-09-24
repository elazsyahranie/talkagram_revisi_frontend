import axiosApiIntances from "../../utils/axios";

export const getRooms = (id) => {
  return {
    type: "GET_ROOMS",
    payload: axiosApiIntances.get(`user/get-room-list/${id}`),
  };
};

export const insertChat = (data) => {
  return {
    type: "INSERT_MESSAGE",
    payload: axiosApiIntances.post("chat/insert-message", data),
  };
};

export const chatHistory = (data) => {
  return {
    type: "CHAT_HISTORY",
    payload: axiosApiIntances.get(`chat/get-message/${data}`),
  };
};
