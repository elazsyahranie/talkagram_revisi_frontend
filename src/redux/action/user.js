import axiosApiIntances from "../../utils/axios";

export const getUserbyId = (id) => {
  return {
    type: "GET_USER_BY_ID",
    payload: axiosApiIntances.get(`user/${id}`),
  };
};

export const changeUserImage = (image, id) => {
  return {
    type: "UPLOAD_USER_IMAGE",
    payload: axiosApiIntances.patch(`user/update-image/${id}`, image),
  };
};

export const changeUserData = (data, id) => {
  return {
    type: "CHANGE_USER_DATA",
    payload: axiosApiIntances.patch(`user/${id}`, data),
  };
};

export const changeUserPassword = (data, id) => {
  return {
    type: "CHANGE_USER_PASSWORD",
    payload: axiosApiIntances.patch(`user/update-password/${id}`, data),
  };
};

export const getRooms = (id) => {
  return {
    type: "GET_ROOMS",
    payload: axiosApiIntances.get(`user/get-room-list/${id}`),
  };
};

export const getRoomsByUserId = (id) => {
  return {
    type: "GET_ROOMS_BY_USER_ID", 
    payload: axiosApiIntances.get(`user/get-rooms-by-user-id/${id}`)
  }
}

export const getContactsDataOnly = (id) => {
  return {
    type: "GET_CONTACTS_DATA_ONLY",
    payload: axiosApiIntances.get(`user/contact-data-only/${id}`),
  };
};

export const getContactsKeyword = (keyword) => {
  return {
    type: "GET_CONTACTS_KEYWORD",
    payload: axiosApiIntances.get(`user/keyword?keyword=${keyword}`),
  };
};

export const getFriendRequest = (id) => {
  return {
    type: "GET_FRIEND_REQUEST",
    payload: axiosApiIntances.get(`user/friend-request/${id}`),
  };
};

export const getPendingRequest = (id) => {
  return {
    type: "GET_PENDING_REQUEST",
    payload: axiosApiIntances.get(`user/pending-request/${id}`),
  };
};

export const sendInvitation = (setData) => {
  return {
    type: "SEND_INVITATION",
    payload: axiosApiIntances.post(`user/send-friend-request`, setData),
  };
};

export const confirmRequest = (setData) => {
  return {
    type: "CONFIRM_REQUEST",
    payload: axiosApiIntances.post(`user/confirm-friend-request`, setData),
  };
};

export const getContactPagination = (id, page, sort, search) => {
  return {
    type: "GET_CONTACT_PAGINATION",
    payload: axiosApiIntances.get(
      `user/contact-pagination/${id}?page=${page}&limit=5&sort=${sort}&search=${search}`
    ),
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
