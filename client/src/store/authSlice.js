import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import apis from "../common/api";

const initialState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const loginUser = () => async (dispatch) => {
  try {
    const response = await axios.get(apis.loggedInUser.url, {
      withCredentials: true,
    });

    console.log(response);

    if (response) {
      dispatch(loginSuccess(response?.data?.data));
    }
    toast.success("Hey, Welcome back.");
  } catch (error) {
    toast.error(error);
  }
};

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
