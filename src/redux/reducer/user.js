const initialState = {
  data: {},
  login: false, // false : tampilan navbar sebelum login || true: tampilan navbar setalah login
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_BY_ID_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_USER_BY_ID_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_USER_BY_ID_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "CHANGE_USER_NAME_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "CHANGE_USER_NAME_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "CHANGE_USER_NAME_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "GET_ROOMS_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_ROOMS_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "GET_ROOMS_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "INSERT_MESSAGE_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "INSERT_MESSAGE_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "INSERT_MESSAGE_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    case "CHAT_HISTORY_PENDING": // prosesnya sedang berjalan
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "CHAT_HISTORY_FULFILLED": // ketika sukses
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };
    case "CHAT_HISTORY_REJECTED": // ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default user;
