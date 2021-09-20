import axiosApiIntances from "../../utils/axios";

export const getContacts = (id) => {
  return {
    type: "GET_CONTACTS",
    payload: axiosApiIntances.get(`user/contacts/${id}`),
  };
};
